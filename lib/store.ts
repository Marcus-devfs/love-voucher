import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Voucher } from '@/types';

interface StoreState {
    vouchers: Voucher[];
    userRole: 'husband' | 'wife' | null;
    isLoading: boolean;
    setRole: (role: 'husband' | 'wife' | null) => void;
    fetchVouchers: () => Promise<void>;
    redeemVoucher: (id: string) => Promise<void>;
    deleteVoucher: (id: string) => Promise<void>;
    resetVouchers: () => Promise<void>;
    addVoucher: (voucher: Omit<Voucher, 'id' | 'isRedeemed'>) => Promise<void>;
}

export const useStore = create<StoreState>()(
    persist(
        (set, get) => ({
            vouchers: [],
            userRole: null,
            isLoading: false,

            setRole: (role) => set({ userRole: role }),

            fetchVouchers: async () => {
                set({ isLoading: true });
                try {
                    const res = await fetch('/api/vouchers');
                    const data = await res.json();
                    // Map _id and dates correctly
                    const formatted = data.map((v: any) => ({
                        ...v,
                        id: v._id || v.id,
                        redeemedAt: v.redeemedAt ? new Date(v.redeemedAt).toISOString() : undefined
                    }));
                    set({ vouchers: formatted });
                } catch (error) {
                    console.error("Failed to fetch vouchers", error);
                } finally {
                    set({ isLoading: false });
                }
            },

            redeemVoucher: async (id) => {
                // Optimistic update
                const currentVouchers = get().vouchers;
                const now = new Date();
                set({
                    vouchers: currentVouchers.map(v =>
                        v.id === id ? { ...v, isRedeemed: true, redeemedAt: now.toISOString() } : v
                    )
                });

                try {
                    await fetch(`/api/vouchers/${id}`, {
                        method: 'PATCH',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ isRedeemed: true, redeemedAt: now })
                    });
                } catch (error) {
                    console.error("Failed to redeem", error);
                    // Rollback if needed
                    set({ vouchers: currentVouchers });
                }
            },

            deleteVoucher: async (id) => {
                const currentVouchers = get().vouchers;
                set({
                    vouchers: currentVouchers.filter(v => v.id !== id)
                });
                try {
                    await fetch(`/api/vouchers/${id}`, { method: 'DELETE' });
                } catch (error) {
                    console.error("Failed to delete", error);
                    set({ vouchers: currentVouchers });
                }
            },

            resetVouchers: async () => {
                // Trigger Seed
                try {
                    set({ isLoading: true });
                    await fetch('/api/seed', { method: 'POST' });
                    await get().fetchVouchers();
                } catch (e) {
                    console.error("Failed to reset/seed", e);
                    set({ isLoading: false });
                }
            },

            addVoucher: async (newVoucher) => {
                try {
                    const res = await fetch('/api/vouchers', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(newVoucher)
                    });
                    const created = await res.json();

                    // Format the response to match Voucher type
                    const formattedVoucher = {
                        ...created,
                        id: created._id || created.id,
                        redeemedAt: created.redeemedAt ? new Date(created.redeemedAt).toISOString() : undefined
                    };

                    set((state) => ({
                        vouchers: [formattedVoucher, ...state.vouchers], // Add new to top
                    }));
                } catch (error) {
                    console.error("Failed to add voucher", error);
                }
            },
        }),
        {
            name: 'voucher-storage-role-only', // Changing name to avoid conflict, effectively only persisting Role now
            partialize: (state) => ({ userRole: state.userRole }), // Only persist role in localStorage
        }
    )
);
