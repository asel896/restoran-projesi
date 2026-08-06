import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET: Kategorileri ve ürünleri veritabanından getir
export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      include: {
        items: true, // Her kategorinin altındaki ürünleri de getir
      },
    });

    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Veriler çekilirken hata oluştu.' }, { status: 500 });
  }
}