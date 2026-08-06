import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// get-aktif garson çağrılarını getir 
export async function GET() {
  try {
    const calls = await prisma.waiterCall.findMany({
      where: {
        status: 'PENDING',
      },
      include: {
        table: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    return NextResponse.json(calls, { status: 200 });
  } catch (error) {
    console.error('Garson çağrıları alınırken hata oluştu:', error);
    return NextResponse.json(
      { error: 'Garson çağrıları alınamadı' },
      { status: 500 }
    );
  }
}

// post-masadan yeni garson çağrısı oluştur 
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { tableId } = body;

    if (!tableId) {
      return NextResponse.json(
        { error: 'Masa ID gereklidir.' },
        { status: 400 }
      );
    }

    // masa var mı
    const table = await prisma.table.findUnique({
      where: { id: tableId },
    });

    if (!table) {
      return NextResponse.json(
        { error: 'Masa bulunamadı.' },
        { status: 404 }
      );
    }

    // bekleyen cagri var mi
    const existingCall = await prisma.waiterCall.findFirst({
      where: {
        tableId,
        status: 'PENDING',
      },
    });

    if (existingCall) {
      return NextResponse.json(
        { message: 'Bu masa için zaten bekleyen bir garson çağrısı var.' },
        { status: 200 }
      );
    }

    // yeni cagri
    const newCall = await prisma.waiterCall.create({
      data: {
        tableId,
        status: 'PENDING',
      },
      include: {
        table: true,
      },
    });

    return NextResponse.json(newCall, { status: 201 });
  } catch (error) {
    console.error('Garson çağrısı oluşturulurken hata oluştu:', error);
    return NextResponse.json(
      { error: 'Garson çağrısı oluşturulamadı' },
      { status: 500 }
    );
  }
}