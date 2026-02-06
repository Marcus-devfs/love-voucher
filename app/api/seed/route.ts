import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Voucher from '@/models/Voucher';

const INITIAL_VOUCHERS = [
    // TEMPO PARA ELA (Focados em auto-cuidado e hobbies)
    {
        title: 'Tarde de Compras',
        description: 'Vá bater perna no shopping, provar roupas com calma e ver vitrines. Eu fico com o pequeno.',
        type: 'time',
        iconName: 'shopping-bag'
    },
    {
        title: 'Dia de Beleza',
        description: 'Tire o dia para cuidar de você: ir ao cabeleireiro, fazer as unhas e se sentir renovada.',
        type: 'time',
        iconName: 'scissors'
    },
    {
        title: 'Tour de Cafeterias',
        description: 'Vamos naquele café que você quer conhecer. Eu dirijo e cuido do bebê enquanto você aproveita.',
        type: 'together',
        iconName: 'coffee'
    },
    {
        title: 'Sono Restaurador',
        description: 'Eu assumo o turno da manhã com nosso filho(a). Durma por você e pelo bebê na barriga!',
        type: 'time',
        iconName: 'moon'
    },

    // ALÍVIO & CONFORTO (Focados na gravidez)
    {
        title: 'Massagem Relaxante',
        description: 'Massagem especial nos pés inchados ou nas costas para aliviar o peso da gravidez.',
        type: 'together',
        iconName: 'hand'
    },
    {
        title: 'Banho de Rainha',
        description: 'Preparei um banho morno e relaxante. Deixe a porta fechada e esqueça do mundo.',
        type: 'time',
        iconName: 'bath'
    },
    {
        title: 'Desejo de Grávida',
        description: 'Vale qualquer comida que você esteja com vontade agora. Eu busco ou faço, sem julgar!',
        type: 'special',
        iconName: 'cake-slice'
    },
    {
        title: 'Pés pro Ar',
        description: 'Hoje você não levanta do sofá pra nada. Eu levo água, comida e controle remoto pra você.',
        type: 'time',
        iconName: 'armchair'
    },

    // SUPORTE MATERNO (Focados na criança de 2 anos)
    {
        title: 'Mamãe de Folga',
        description: 'Troca de fraldas, banho e brincadeiras da criança são 100% comigo hoje.',
        type: 'time',
        iconName: 'baby'
    },
    {
        title: 'Motorista Particular',
        description: 'Para te levar onde precisar (lojas ou médico) com todo conforto e ar condicionado.',
        type: 'together',
        iconName: 'car'
    },

    // MOMENTOS JUNTOS
    {
        title: 'Jantar sem "Manhê!"',
        description: 'Eu cuido da alimentação do pequeno antes, para jantarmos nós dois com calma e conversa.',
        type: 'together',
        iconName: 'utensils'
    },
    {
        title: 'Sessão Cinema',
        description: 'Filme no sofá com snacks. Se você dormir no meio (cansada!), eu não reclamo.',
        type: 'together',
        iconName: 'film'
    },

    // CORINGA
    {
        title: 'Vale CORINGA',
        description: 'Vale qualquer coisa! Use sua imaginação.',
        type: 'special',
        iconName: 'star',
        isCustom: true
    },
];

export async function POST() {
    await dbConnect();
    try {
        // Clear existing non-custom vouchers to avoid duplicates and ensure freshness
        await Voucher.deleteMany({ isCustom: false });

        // Also check if we should clear custom ones? No, usually not.

        // Insert the new set
        await Voucher.insertMany(INITIAL_VOUCHERS);

        return NextResponse.json({
            message: 'Seeded successfully',
            count: INITIAL_VOUCHERS.length
        });
    } catch (error) {
        console.error("Seed error:", error);
        return NextResponse.json({ error: 'Failed to seed' }, { status: 500 });
    }
}
