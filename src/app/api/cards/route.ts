import { NextResponse } from 'next/server';
import cards from '@/data/cards.json';

export async function GET() {
    return NextResponse.json(cards);
}
