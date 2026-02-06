export type VoucherType =
    | "time"      // Vales de Tempo Pessoal
    | "together"  // Vales de Momentos Juntos
    | "special"   // Um Vale Especial
    | "custom";   // Customizado

export interface Voucher {
    id: string;
    title: string;
    description: string;
    type: VoucherType;
    iconName: string; // We'll map string to Lucide icon
    isRedeemed: boolean;
    redeemedAt?: string; // ISO Date
    isCustom?: boolean; // If it's the "fill in the blank" one
}

export type Category = {
    id: VoucherType;
    label: string;
    description: string;
    color: string;
};

export const CATEGORIES: Category[] = [
    {
        id: "time",
        label: "Tempo Pessoal",
        description: "Para ela relaxar e curtir sua própria companhia",
        color: "bg-rose-100 text-rose-700 border-rose-200"
    },
    {
        id: "together",
        label: "Momentos Juntos",
        description: "Para reconectar e curtir a dois",
        color: "bg-purple-100 text-purple-700 border-purple-200"
    },
    {
        id: "special",
        label: "Especiais",
        description: "Vales únicos e surpresas",
        color: "bg-amber-100 text-amber-700 border-amber-200"
    },
];
