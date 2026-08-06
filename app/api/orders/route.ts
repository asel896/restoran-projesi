import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// get-tüm siparişleri getir
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

// post-yeni sipariş oluştur 
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { tableId, items, notes } = body;

    
    if (!tableId || !items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: 'Masa ID ve en az bir sipariş ürünü gereklidir.' },
        { status: 400 }
      );
    }

    
    let totalPrice = 0;
    const orderItemsData: { menuItemId: string; quantity: number }[] = [];

    for (const item of items) {
      const menuItem = await prisma.menuItem.findUnique({
        where: { id: item.menuItemId },
      });

      if (!menuItem) {
        return NextResponse.json(
          { error: `Ürün bulunamadı: ${item.menuItemId}` },
          { status: 404 }
        );
      }

      const itemTotalPrice = menuItem.price * item.quantity;
      totalPrice += itemTotalPrice;

      orderItemsData.push({
        menuItemId: item.menuItemId,
        quantity: item.quantity,
      });
    }

    
    const newOrder = await prisma.$transaction(async (tx) => {
      const order = await tx.order.create({
        data: {
          tableId,
          totalPrice,
          notes,
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

      
      await tx.table.update({
        where: { id: tableId },
        data: { status: 'OCCUPIED' },
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