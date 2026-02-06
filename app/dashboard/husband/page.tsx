"use client";

import { useStore } from "@/lib/store";
import { VoucherCard } from "@/components/ui/VoucherCard";
import { Voucher, CATEGORIES, VoucherType } from "@/types";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconMapper } from "@/components/ui/IconMapper";
import Link from "next/link";
import { Plus, Printer } from "lucide-react";
import { VoucherDetailModal } from "@/components/ui/VoucherDetailModal";

export default function HusbandDashboard() {
    const { vouchers, addVoucher, resetVouchers, fetchVouchers, deleteVoucher } = useStore();
    const [isCreating, setIsCreating] = useState(false);
    const [selectedVoucher, setSelectedVoucher] = useState<Voucher | null>(null);

    useEffect(() => {
        fetchVouchers();
    }, [fetchVouchers]);

    // Form State
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState<VoucherType>("time");
    const [icon, setIcon] = useState("star");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !description) return;

        addVoucher({
            title,
            description,
            type,
            iconName: icon,
        });

        setTitle("");
        setDescription("");
        setIsCreating(false);
    };

    return (
        <div className="min-h-screen pb-20 px-4 pt-8 max-w-5xl mx-auto">
            <header className="mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl md:text-5xl font-serif font-bold italic text-rose-600 mb-2 drop-shadow-sm">
                        Painel do Criador
                    </h1>
                    <p className="text-gray-500 font-medium">
                        Gerencie os vales e crie novos presentes.
                    </p>
                </div>
                <div className="flex gap-3">
                    <Link
                        href="/print"
                        className="flex items-center gap-2 px-6 py-3 bg-white text-gray-700 rounded-full font-medium hover:bg-gray-50 shadow-sm border"
                    >
                        <Printer size={20} />
                        Imprimir
                    </Link>
                    <button
                        onClick={() => setIsCreating(true)}
                        className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-full font-medium hover:bg-black shadow-lg"
                    >
                        <Plus size={20} />
                        Novo Vale
                    </button>
                </div>
            </header>

            {/* Creation Modal */}
            <AnimatePresence>
                {isCreating && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/40 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="bg-white rounded-3xl p-8 w-full max-w-lg shadow-2xl"
                        >
                            <h2 className="text-2xl font-serif font-bold mb-6 text-rose-950">Criar Novo Vale</h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
                                    <input
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-500 text-gray-900 placeholder:text-gray-400"
                                        placeholder="Ex: Jantar Romântico"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
                                    <textarea
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-500 text-gray-900 placeholder:text-gray-400"
                                        placeholder="Detalhes do presente..."
                                        rows={3}
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
                                        <select
                                            value={type}
                                            onChange={(e) => setType(e.target.value as VoucherType)}
                                            className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-500 text-gray-900"
                                        >
                                            {CATEGORIES.map(cat => (
                                                <option key={cat.id} value={cat.id}>{cat.label}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Ícone</label>
                                        <select
                                            value={icon}
                                            onChange={(e) => setIcon(e.target.value)}
                                            className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-500 text-gray-900"
                                        >
                                            <option value="star">Estrela</option>
                                            <option value="heart">Coração</option>
                                            <option value="gift">Presente</option>
                                            <option value="sparkles">Brilho</option>
                                            <option value="coffee">Café</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
                                    <button
                                        type="button"
                                        onClick={() => setIsCreating(false)}
                                        className="px-6 py-2 text-gray-500 font-medium hover:text-gray-800"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-6 py-2 bg-rose-600 text-white rounded-full font-medium hover:bg-rose-700"
                                    >
                                        Criar Vale
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <div className="space-y-8">
                <h3 className="text-lg font-medium text-gray-500 uppercase tracking-widest border-b pb-2">Vales Atuais</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 opacity-80 hover:opacity-100 transition-opacity">
                    {vouchers.map((voucher) => (
                        <VoucherCard
                            key={voucher.id}
                            voucher={voucher}
                            variant="digital"
                            onClick={() => setSelectedVoucher(voucher)}
                            onDelete={deleteVoucher}
                        />
                    ))}
                </div>
            </div>

            <div className="mt-20 pt-10 border-t text-center">
                <button
                    onClick={resetVouchers}
                    className="text-sm text-red-400 hover:text-red-600 underline"
                >
                    Resetar para padrão
                </button>
            </div>

            {/* View Details Modal for Husband (Read Only) */}
            {selectedVoucher && (
                <VoucherDetailModal
                    isOpen={!!selectedVoucher}
                    onClose={() => setSelectedVoucher(null)}
                    voucher={selectedVoucher}
                // No onRedeem passed, simpler view
                />
            )}
        </div>
    );
}
