"use client";

import { useStore } from "@/lib/store";
import { VoucherCard } from "@/components/ui/VoucherCard";
import { RedemptionModal } from "@/components/ui/RedemptionModal";
import { VoucherDetailModal } from "@/components/ui/VoucherDetailModal";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Voucher } from "@/types";
import { cn } from "@/lib/utils";

export default function WifeDashboard() {
    const { vouchers, redeemVoucher, fetchVouchers } = useStore();
    const [selectedVoucher, setSelectedVoucher] = useState<Voucher | null>(null);
    const [confirmRedemptionVoucher, setConfirmRedemptionVoucher] = useState<Voucher | null>(null);

    useEffect(() => {
        fetchVouchers();
    }, [fetchVouchers]);

    const [filter, setFilter] = useState<"all" | "available" | "redeemed">("available");

    const filteredVouchers = vouchers.filter(v => {
        if (filter === "available") return !v.isRedeemed;
        if (filter === "redeemed") return v.isRedeemed;
        return true;
    });

    const handleCardClick = (voucher: Voucher) => {
        setSelectedVoucher(voucher);
    };

    const handleRedeemFromModal = (id: string) => {
        // Phase 1: Close detail, Open redemption celebration
        setSelectedVoucher(null);
        redeemVoucher(id);

        // Find proper voucher object to show celebration
        const voucher = vouchers.find(v => v.id === id); // Note: State update might lag, so this relies on optimistic update in modal? 
        // Actually, we just need to pass the current one but marked as done for the animation?
        // Let's simple render the celebration. Details modal handles the store action.
        if (voucher) {
            setConfirmRedemptionVoucher({ ...voucher, isRedeemed: true });
        }
    };

    return (
        <div className="min-h-screen pb-20 max-w-5xl mx-auto">
            <header className="mb-12 text-center space-y-4 pt-4">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1 className="text-4xl md:text-6xl font-serif font-bold italic text-rose-600 mb-4 drop-shadow-sm">
                        Meus Mimos
                    </h1>
                    <p className="text-lg text-gray-500 font-medium max-w-md mx-auto">
                        Toque em um cartão para ver os detalhes e usar seu presente.
                    </p>
                </motion.div>

                <div className="flex justify-center gap-2 mt-8">
                    <FilterButton active={filter === "available"} onClick={() => setFilter("available")}>
                        Disponíveis
                    </FilterButton>
                    <FilterButton active={filter === "redeemed"} onClick={() => setFilter("redeemed")}>
                        Usados
                    </FilterButton>
                    <FilterButton active={filter === "all"} onClick={() => setFilter("all")}>
                        Todos
                    </FilterButton>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 px-4">
                {filteredVouchers.map((voucher) => (
                    <VoucherCard
                        key={voucher.id}
                        voucher={voucher}
                        onClick={() => handleCardClick(voucher)}
                    />
                ))}
            </div>

            {filteredVouchers.length === 0 && (
                <div className="text-center py-20 text-gray-400">
                    <p>Nenhum vale encontrado nesta categoria.</p>
                </div>
            )}

            {/* Detail Modal (The "Flip" replacement) */}
            {selectedVoucher && (
                <VoucherDetailModal
                    isOpen={!!selectedVoucher}
                    onClose={() => setSelectedVoucher(null)}
                    voucher={selectedVoucher}
                    onRedeem={handleRedeemFromModal}
                />
            )}

            {/* Celebration Modal (Post-redemption) */}
            {confirmRedemptionVoucher && (
                <RedemptionModal
                    isOpen={true}
                    onClose={() => setConfirmRedemptionVoucher(null)}
                    voucher={confirmRedemptionVoucher}
                />
            )}
        </div>
    );
}

function FilterButton({ children, active, onClick }: { children: React.ReactNode, active: boolean, onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300",
                active
                    ? "bg-gray-900 text-white shadow-lg"
                    : "bg-white/80 text-gray-500 hover:bg-white hover:text-gray-900"
            )}
        >
            {children}
        </button>
    );
}
