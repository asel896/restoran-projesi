import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// TÜM KATEGORİLERİ LİSTELE 
export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      include: {
        items: true,
      },
    });
    return NextResponse.json(categories);
  } catch (error) {
    console.error('Kategoriler getirilirken hata oluştu:', error);
    return NextResponse.json(
      { error: 'Kategoriler getirilemedi' },
      { status: 500 }
    );
  }
}

// YENİ KATEGORİ EKLE
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name } = body;

    if (!name) {
      return NextResponse.json(
        { error: 'Kategori adı zorunludur' },
        { status: 400 }
      );
    }

    const newCategory = await prisma.category.create({
      data: {
        name,
      },
    });

    return NextResponse.json(newCategory, { status: 201 });
  } catch (error) {
    console.error('Kategori eklenirken hata oluştu:', error);
    return NextResponse.json(
      { error: 'Kategori eklenemedi' },
      { status: 500 }
    );
  }
}