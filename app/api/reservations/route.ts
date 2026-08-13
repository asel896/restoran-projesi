import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET - Tüm rezervasyonları listele
export async function GET() {
  try {
    const reservations = await prisma.reservation.findMany({
      include: {
        table: true, 
      },
      orderBy: {
        date: 'asc', 
      },
    });

    return NextResponse.json(reservations, { status: 200 });
  } catch (error) {
    console.error('Rezervasyonlar getirilirken hata oluştu:', error);
    return NextResponse.json(
      { error: 'Rezervasyonlar getirilemedi' },
      { status: 500 }
    );
  }
}

// POST - Yeni rezervasyon oluştur
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    
    const { customerName, phone, date, guestCount, tableId } = body;

    
    if (!customerName || !phone || !date || !guestCount || !tableId) {
      return NextResponse.json(
        { error: 'Müşteri adı, telefon, tarih, kişi sayısı ve masa ID zorunludur' },
        { status: 400 }
      );
    }

    const newReservation = await prisma.reservation.create({
      data: {
        customerName,
        phone,
        date: new Date(date), 
        guestCount: Number(guestCount),
        tableId,
        
      },
      include: {
        table: true, 
      }
    });

    return NextResponse.json(newReservation, { status: 201 });
  } catch (error) {
    console.error('Rezervasyon eklenirken hata:', error);
    return NextResponse.json(
      { error: 'Rezervasyon oluşturulamadı' },
      { status: 500 }
    );
  }
}