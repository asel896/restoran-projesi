import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET - Tüm siparişleri getir
export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      include: {
        table: true,
        items: {
          include: {
            menuItem: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    console.error('Siparişler getirilirken hata oluştu:', error);
    return NextResponse.json(
      { error: 'Siparişler alınamadı' },
      { status: 500 }
    );
  }
}

// POST - Yeni sipariş oluştur
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { tableId, items } = body;

    if (!tableId || !items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: 'Masa ID ve en az bir sipariş ürünü gereklidir.' },
        { status: 400 }
      );
    }

    const orderItemsData = items.map((item: { menuItemId: string; quantity: number }) => ({
      menuItemId: item.menuItemId,
      quantity: Number(item.quantity),
    }));

    const newOrder = await prisma.$transaction(async (tx) => {
      const order = await tx.order.create({
        data: {
          tableId,
          status: 'PENDING',
          items: {
            create: orderItemsData,
          },
        },
        include: {
          items: {
            include: {
              menuItem: true,
            },
          },
          table: true,
        },
      });

      // Masa durumunu FULL (Dolu) olarak güncelle
      await tx.table.update({
        where: { id: tableId },
        data: { status: 'FULL' },
      });

      return order;
    });

    return NextResponse.json(newOrder, { status: 201 });
  } catch (error) {
    console.error('Sipariş oluşturulurken hata oluştu:', error);
    return NextResponse.json(
      { error: 'Sipariş oluşturulamadı' },
      { status: 500 }
    );
  }
}