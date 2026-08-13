import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// PATCH - Belirli bir rezervasyonun durumunu güncelle 
export async function PATCH(
  request: Request,
  { params }: { params: { reservationId: string } }
) {
  try {
    const body = await request.json();
    const { status, tableId } = body;

    const updateData: any = {};
    if (status) updateData.status = status;
    if (tableId) updateData.tableId = tableId; 

    const updatedReservation = await prisma.reservation.update({
      where: { id: params.reservationId },
      data: updateData,
    });

    return NextResponse.json(updatedReservation, { status: 200 });
  } catch (error) {
    console.error('Rezervasyon güncellenirken hata:', error);
    return NextResponse.json(
      { error: 'Rezervasyon güncellenemedi' },
      { status: 500 }
    );
  }
}

// DELETE - Belirli bir rezervasyonu tamamen sil
export async function DELETE(
  request: Request,
  { params }: { params: { reservationId: string } }
) {
  try {
    await prisma.reservation.delete({
      where: { id: params.reservationId },
    });

    return NextResponse.json(
      { message: 'Rezervasyon başarıyla silindi' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Rezervasyon silinirken hata:', error);
    return NextResponse.json(
      { error: 'Rezervasyon silinemedi' },
      { status: 500 }
    );
  }
}