"use client";

import { motion } from "framer-motion";
import { Voucher, CATEGORIES } from "@/types";
import { IconMapper } from "./IconMapper";
import { cn } from "@/lib/utils";
import { Trash2 } from "lucide-react";

interface VoucherCardProps {
    voucher: Voucher;
    onClick?: () => void;
    variant?: "digital" | "print";
    onDelete?: (id: string) => void;
}

export function VoucherCard({ voucher, onClick, variant = "digital", onDelete }: VoucherCardProps) {
    const category = CATEGORIES.find(c => c.id === voucher.type) || CATEGORIES[2];

    if (variant === "print") {
        return (
            <div className={cn(
                "relative w-full aspect-[1.8/1] rounded-xl overflow-hidden border-2 print:border print:break-inside-avoid",
                "bg-white text-black"
            )}>
                <div className="absolute inset-0 opacity-10 bg-[url('/pattern.svg')]"></div>
                <div className="relative h-full flex flex-col items-center justify-center p-6 text-center border-4 border-double border-gray-100 m-1 rounded-lg">
                    <div className="flex items-center justify-center mb-3">
                        <IconMapper name={voucher.iconName} className="w-6 h-6 opacity-60 text-gray-800" />
                    </div>
                    <h3 className="font-serif text-xl font-bold mb-2 text-gray-900">{voucher.title}</h3>
                    <p className="text-sm opacity-80 leading-tight text-gray-600 px-4">{voucher.description}</p>
                    <div className="mt-4 text-[10px] font-bold uppercase tracking-[0.2em] opacity-40">
                        {category.label}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <motion.div
            onClick={onClick}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
                "relative w-full aspect-[0.85/1] text-left group overflow-hidden rounded-3xl transition-all duration-300 cursor-pointer",
                "border border-white/50 shadow-xl hover:shadow-2xl",
                voucher.isRedeemed ? "bg-gray-100 grayscale opacity-80" : "bg-white/95 backdrop-blur-md"
            )}
        >
            {/* Color stripe at top */}
            <div className={cn("h-3 w-full absolute top-0 left-0", category.color.replace('text-', 'bg-').split(' ')[0])} />

            {/* Delete Button (Only if onDelete provided and not redeemed) */}
            {onDelete && !voucher.isRedeemed && (
                <div
                    onClick={(e) => {
                        e.stopPropagation();
                        if (confirm("Tem certeza que deseja excluir este vale?")) {
                            onDelete(voucher.id);
                        }
                    }}
                    className="absolute top-4 right-4 z-20 p-2.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-all opacity-0 group-hover:opacity-100"
                    title="Excluir Vale"
                >
                    <Trash2 size={18} />
                </div>
            )}

            <div className="p-6 h-full flex flex-col items-center text-center relative z-10">

                {/* Title First (Prominent) */}
                <div className="flex-1 flex flex-col items-center justify-center w-full">
                    <div className={cn(
                        "mb-6 p-4 rounded-full shadow-sm transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3",
                        voucher.isRedeemed ? "bg-gray-200" : "bg-gray-50",
                        category.color.replace('text-', 'text-opacity-80 text-')
                    )}>
                        <IconMapper name={voucher.iconName} className="w-8 h-8" />
                    </div>

                    <h3 className="font-serif text-2xl md:text-3xl font-bold text-gray-900 leading-tight mb-3 line-clamp-3">
                        {voucher.title}
                    </h3>
                </div>

                {/* Icon + Category Tag */}
                <div className="mt-auto pt-4 flex flex-col items-center w-full border-t border-gray-100">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-2">
                        {category.label}
                    </span>

                    {voucher.isRedeemed ? (
                        <span className="px-4 py-1.5 bg-gray-200 text-gray-600 text-[10px] font-bold uppercase tracking-wider rounded-full">
                            Usado
                        </span>
                    ) : (
                        <span className="text-xs font-semibold text-rose-600 opacity-0 group-hover:opacity-100 transition-opacity translate-y-1 group-hover:translate-y-0">
                            Ver Detalhes
                        </span>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
