import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// TÜM ÜRÜNLERİ LİSTELE 
export async function GET() {
  try {
    const items = await prisma.menuItem.findMany({
      include: {
        category: true,
      },
    });
    return NextResponse.json(items);
  } catch (error) {
    console.error('Menü ürünleri getirilirken hata oluştu:', error);
    return NextResponse.json(
      { error: 'Ürünler getirilemedi' },
      { status: 500 }
    );
  }
}

// YENİ ÜRÜN EKLE 
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, price, description, categoryId } = body;

    if (!name || !price || !categoryId) {
      return NextResponse.json(
        { error: 'Ad, fiyat ve kategori ID zorunludur' },
        { status: 400 }
      );
    }

    const newItem = await prisma.menuItem.create({
      data: {
        name,
        price: Number(price),
        description: description || null,
        categoryId,
      },
    });

    return NextResponse.json(newItem, { status: 201 });
  } catch (error) {
    console.error('Ürün eklenirken hata oluştu:', error);
    return NextResponse.json(
      { error: 'Ürün eklenemedi' },
      { status: 500 }
    );
  }
}