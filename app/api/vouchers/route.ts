import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Voucher from '@/models/Voucher';

export async function GET() {
    await dbConnect();
    try {
        const vouchers = await Voucher.find({}).sort({ createdAt: -1 });
        return NextResponse.json(vouchers);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch vouchers' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    await dbConnect();
    try {
        const body = await request.json();
        const voucher = await Voucher.create(body);
        return NextResponse.json(voucher, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create voucher' }, { status: 500 });
    }
}
