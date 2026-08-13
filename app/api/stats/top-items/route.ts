import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    
    const orderItems = await prisma.orderItem.findMany({
      include: {
        menuItem: true,
      },
    });

    
    const itemStats: Record<string, { name: string; quantity: number; revenue: number }> = {};

    orderItems.forEach((item) => {
      const id = item.menuItemId;
      
      if (!itemStats[id]) {
        itemStats[id] = {
          name: item.menuItem.name,
          quantity: 0,
          revenue: 0,
        };
      }
      
      itemStats[id].quantity += item.quantity;
      itemStats[id].revenue += item.quantity * item.menuItem.price;
    });


    const sortedTopItems = Object.values(itemStats)
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 10); 

    return NextResponse.json(sortedTopItems, { status: 200 });
  } catch (error) {
    console.error('Popüler ürünler hesaplanırken hata:', error);
    return NextResponse.json(
      { error: 'Popüler ürünler alınamadı' },
      { status: 500 }
    );
  }
}