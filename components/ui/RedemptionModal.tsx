"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Voucher } from "@/types";
import { IconMapper } from "./IconMapper";

interface RedemptionModalProps {
    isOpen: boolean;
    onClose: () => void;
    voucher: Voucher;
}

export function RedemptionModal({ isOpen, onClose, voucher }: RedemptionModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                    />
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0, y: 100 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="relative bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl overflow-hidden text-center"
                    >
                        {/* Background decoration */}
                        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-rose-100 to-rose-50 -z-10 rounded-b-[50%]" />

                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                            className="w-20 h-20 bg-white rounded-full mx-auto shadow-lg flex items-center justify-center mb-6"
                        >
                            <IconMapper name="check" className="w-10 h-10 text-rose-600" />
                        </motion.div>

                        <h2 className="text-2xl font-serif font-bold text-gray-800 mb-2">
                            Aproveite!
                        </h2>
                        <p className="text-gray-600 mb-6">
                            Você acabou de usar o vale:
                            <br />
                            <strong className="text-rose-600">{voucher.title}</strong>
                        </p>

                        <div className="p-4 bg-gray-50 rounded-xl text-sm text-gray-500 italic mb-8">
                            "Um momento especial preparado com carinho para você."
                        </div>

                        <button
                            onClick={onClose}
                            className="w-full py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-black transition-colors"
                        >
                            Fechar
                        </button>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
