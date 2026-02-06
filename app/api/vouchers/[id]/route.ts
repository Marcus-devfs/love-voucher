import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Voucher from '@/models/Voucher';

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> } // in Next.js 15+ params should be awaited if accessing properties, but here we can just use the signature compatible with 14/15
) {
    const { id } = await params;
    await dbConnect();
    try {
        const body = await request.json();
        const voucher = await Voucher.findByIdAndUpdate(
            id,
            {
                $set: {
                    isRedeemed: body.isRedeemed,
                    redeemedAt: body.redeemedAt
                }
            },
            { new: true }
        );
        if (!voucher) {
            return NextResponse.json({ error: 'Voucher not found' }, { status: 404 });
        }
        return NextResponse.json(voucher);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update voucher' }, { status: 500 });
    }
}
export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    await dbConnect();
    try {
        const voucher = await Voucher.findByIdAndDelete(id);
        if (!voucher) {
            return NextResponse.json({ error: 'Voucher not found' }, { status: 404 });
        }
        return NextResponse.json({ message: 'Voucher deleted' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete voucher' }, { status: 500 });
    }
}
