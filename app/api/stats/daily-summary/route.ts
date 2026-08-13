import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const todaysOrders = await prisma.order.findMany({
      where: {
        createdAt: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
      include: {
        items: {
          include: {
            menuItem: true, 
          },
        },
      },
    });

    // Toplam ciro ve sipariş sayisi
    let totalRevenue = 0;
    
    todaysOrders.forEach((order) => {
      order.items.forEach((item) => {
        totalRevenue += item.quantity * item.menuItem.price;
      });
    });

    const summary = {
      date: startOfDay.toISOString().split('T')[0],
      totalOrders: todaysOrders.length,
      totalRevenue: totalRevenue,
    };

    return NextResponse.json(summary, { status: 200 });
  } catch (error) {
    console.error('Günlük özet hesaplanırken hata:', error);
    return NextResponse.json(
      { error: 'Günlük özet alınamadı' },
      { status: 500 }
    );
  }
}