"use client";

import { useStore } from "@/lib/store";
import { VoucherCard } from "@/components/ui/VoucherCard";
import { useEffect, useState } from "react";
import { Printer } from "lucide-react";

export default function PrintPage() {
    const { vouchers } = useStore();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="bg-white min-h-screen">
            {/* No-print controls */}
            <div className="print:hidden p-4 bg-gray-100 border-b flex justify-between items-center sticky top-0 z-10">
                <div>
                    <h1 className="font-bold text-gray-900">Modo de Impressão</h1>
                    <p className="text-sm text-gray-500">Corte os vales após imprimir.</p>
                </div>
                <button
                    onClick={() => window.print()}
                    className="flex items-center gap-2 px-6 py-2 bg-rose-600 text-white rounded-full hover:bg-rose-700 font-medium"
                >
                    <Printer size={18} />
                    Imprimir Agora
                </button>
            </div>

            {/* Printable Grid */}
            <div className="p-8 max-w-[210mm] mx-auto bg-white">
                <div className="grid grid-cols-2 gap-4">
                    {vouchers.map((voucher) => (
                        <VoucherCard
                            key={voucher.id}
                            voucher={voucher}
                            variant="print"
                        />
                    ))}
                </div>
            </div>

            <style jsx global>{`
        @media print {
          @page {
            margin: 1cm;
            size: A4;
          }
          body {
            background: white;
            color: black;
          }
        }
      `}</style>
        </div>
    );
}
