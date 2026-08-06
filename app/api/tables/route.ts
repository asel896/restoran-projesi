import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// TÜM MASALARI LİSTELE 
export async function GET() {
  try {
    const tables = await prisma.table.findMany({
      orderBy: {
        number: 'asc',
      },
    });
    return NextResponse.json(tables);
  } catch (error) {
    console.error('Masalar getirilirken hata oluştu:', error);
    return NextResponse.json(
      { error: 'Masalar getirilemedi' },
      { status: 500 }
    );
  }
}

// YENİ MASA EKLE 
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { number, capacity } = body;

    if (!number || !capacity) {
      return NextResponse.json(
        { error: 'Masa numarası ve kapasite zorunludur' },
        { status: 400 }
      );
    }

    const newTable = await prisma.table.create({
      data: {
        number: Number(number),
        capacity: Number(capacity),
        status: 'EMPTY',
      },
    });

    return NextResponse.json(newTable, { status: 201 });
  } catch (error) {
    console.error('Masa eklenirken hata oluştu:', error);
    return NextResponse.json(
      { error: 'Masa eklenemedi' },
      { status: 500 }
    );
  }
}