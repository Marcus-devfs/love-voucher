import mongoose, { Schema, Document } from 'mongoose';
import { VoucherType } from '@/types';

export interface IVoucher extends Document {
    title: string;
    description: string;
    type: VoucherType;
    iconName: string;
    isRedeemed: boolean;
    redeemedAt?: Date;
    isCustom?: boolean;
}

const VoucherSchema: Schema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, required: true }, // 'time' | 'together' | 'special' | 'custom'
    iconName: { type: String, required: true },
    isRedeemed: { type: Boolean, default: false },
    redeemedAt: { type: Date },
    isCustom: { type: Boolean, default: false },
}, {
    timestamps: true,
});

// Prevent overwrite model warning in dev mode
export default mongoose.models.Voucher || mongoose.model<IVoucher>('Voucher', VoucherSchema);
