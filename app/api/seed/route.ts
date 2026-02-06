import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Voucher from '@/models/Voucher';

const INITIAL_VOUCHERS = [
    // Tempo Pessoal
    { title: 'Uma Tarde Livre', description: 'Ela pode passar uma tarde fazendo o que quiser, sozinha. Você cuida das crianças e da casa.', type: 'time', iconName: 'cloud-sun' },
    { title: 'Momento Spa em Casa', description: '1 hora de tranquilidade para um banho relaxante, cuidados com a pele ou apenas um tempo de descanso.', type: 'time', iconName: 'sparkles' },
    { title: 'Para gastar consigo mesma', description: 'Um valor para ela comprar algo que goste, seja uma peça de roupa, um livro ou um item de maquiagem.', type: 'time', iconName: 'shopping-bag' },
    { title: 'Manhã de Sono', description: 'No fim de semana, você se encarrega das crianças pela manhã para que ela possa dormir até mais tarde.', type: 'time', iconName: 'moon' },
    { title: 'Folga da Cozinha', description: 'Um dia em que você prepara todas as refeições ou pedem algo para comer.', type: 'time', iconName: 'utensils' },

    // Momentos Juntos
    { title: 'Noite Especial', description: 'Você planeja um encontro surpresa, cuidando de todos os detalhes.', type: 'together', iconName: 'heart' },
    { title: 'Massagem Relaxante', description: 'Um momento a dois para relaxar e esquecer o stress do dia a dia.', type: 'together', iconName: 'hand' },
    { title: 'Sessão Cinema em Casa', description: 'Escolha um filme ou série e preparem snacks e bebidas.', type: 'together', iconName: 'film' },
    { title: 'Noite Desconectada', description: 'Uma noite sem celulares, apenas para conversarem e estarem juntos.', type: 'together', iconName: 'smartphone-off' },
    { title: 'Um Gesto de Carinho', description: 'Um momento simples para reafirmar a conexão e o afeto.', type: 'together', iconName: 'gift' },

    // Especial
    { title: 'À Sua Escolha', description: 'Escolha o que mais gostaria de receber ou fazer.', type: 'special', iconName: 'star', isCustom: true },
];

export async function POST() {
    await dbConnect();
    try {
        // Clear existing to avoid duplicates on seed
        await Voucher.deleteMany({ isCustom: false }); // Optional: keep custom ones? Or just wipe all for clean slate? Let's wipe non-custom to be safe, or just check count.
        // Better strategy: Only insert if empty
        const count = await Voucher.countDocuments();
        if (count === 0) {
            await Voucher.insertMany(INITIAL_VOUCHERS);
            return NextResponse.json({ message: 'Seeded successfully' });
        }
        return NextResponse.json({ message: 'Database already has data. automated seeding skipped.' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to seed' }, { status: 500 });
    }
}
