"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Voucher } from "@/types";
import { IconMapper } from "./IconMapper";
import { X } from "lucide-react";

interface VoucherDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    voucher: Voucher;
    onRedeem?: (id: string) => void;
}

export function VoucherDetailModal({ isOpen, onClose, voucher, onRedeem }: VoucherDetailModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="relative bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden"
                    >
                        {/* Close button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 bg-white/20 glass rounded-full text-gray-800 hover:bg-white/40 transition-colors z-20"
                        >
                            <X size={20} />
                        </button>

                        {/* Header Image/Icon Area */}
                        <div className={`h-32 w-full flex items-center justify-center bg-gradient-to-br from-rose-100 to-purple-100`}>
                            <div className="p-4 bg-white/60 rounded-full shadow-sm backdrop-blur-sm">
                                <IconMapper name={voucher.iconName} className="w-10 h-10 text-rose-600" />
                            </div>
                        </div>

                        <div className="p-8 pt-6 text-center">
                            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-2">
                                {voucher.title}
                            </h2>

                            <div className="w-16 h-1 bg-rose-200 mx-auto rounded-full mb-6" />

                            <p className="text-gray-700 text-lg leading-relaxed mb-8">
                                {voucher.description}
                            </p>

                            {voucher.isRedeemed ? (
                                <div className="p-4 bg-gray-100 rounded-2xl border border-gray-200">
                                    <p className="text-gray-500 font-medium flex items-center justify-center gap-2">
                                        <IconMapper name="check" className="w-5 h-5" />
                                        Resgatado em {new Date(voucher.redeemedAt || "").toLocaleDateString()}
                                    </p>
                                </div>
                            ) : onRedeem ? (
                                <button
                                    onClick={() => onRedeem(voucher.id)}
                                    className="w-full py-4 bg-rose-600 text-white text-lg font-medium rounded-2xl hover:bg-rose-700 transition-colors shadow-lg active:scale-95"
                                >
                                    ❤️ Usar este Vale
                                </button>
                            ) : null}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
