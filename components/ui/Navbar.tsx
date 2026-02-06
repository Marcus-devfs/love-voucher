"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useStore } from "@/lib/store";
import { LogOut, Home, Gift, PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navbar() {
    const pathname = usePathname();
    const router = useRouter();
    const { userRole, setRole } = useStore();

    const handleLogout = () => {
        setRole(null);
        router.push("/");
    };

    if (pathname === "/" || pathname === "/print") return null;

    const isHusband = pathname.includes("/husband");
    const isWife = pathname.includes("/wife");

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="fixed top-0 left-0 right-0 z-40 px-4 py-3 pointer-events-none"
        >
            <div className="max-w-5xl mx-auto flex items-center justify-between pointer-events-auto">
                <Link
                    href="/"
                    className="flex items-center gap-2 px-4 py-2 rounded-full glass bg-white/40 hover:bg-white/60 transition-colors shadow-sm backdrop-blur-md"
                >
                    <Home size={18} className="text-gray-700" />
                    <span className="font-serif font-bold text-gray-800 hidden sm:inline">Love Vouchers</span>
                </Link>

                <div className="flex items-center gap-3">
                    {isHusband && (
                        <div className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-full bg-purple-100/50 border border-purple-200/50 text-xs font-medium text-purple-800">
                            <span>Modo Criador</span>
                        </div>
                    )}
                    {isWife && (
                        <div className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-full bg-rose-100/50 border border-rose-200/50 text-xs font-medium text-rose-800">
                            <span>Modo Destinatário</span>
                        </div>
                    )}

                    <button
                        onClick={handleLogout}
                        className="p-2.5 rounded-full bg-white/40 glass hover:bg-red-50 text-gray-700 hover:text-red-500 transition-colors shadow-sm"
                        title="Sair / Trocar Perfil"
                    >
                        <LogOut size={18} />
                    </button>
                </div>
            </div>
        </motion.nav>
    );
}
