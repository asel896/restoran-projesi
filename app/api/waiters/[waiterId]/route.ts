import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// PATCH - Belirli bir garsonun bilgilerini güncelle
export async function PATCH(
  request: Request,
  { params }: { params: { waiterId: string } }
) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    const updateData: any = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (password) updateData.password = password; 

    const updatedWaiter = await prisma.user.update({
      where: { id: params.waiterId },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      } 
    });

    return NextResponse.json(updatedWaiter, { status: 200 });
  } catch (error) {
    console.error('Garson güncellenirken hata:', error);
    return NextResponse.json(
      { error: 'Garson güncellenemedi' },
      { status: 500 }
    );
  }
}

// DELETE - Belirli bir garsonu sil
export async function DELETE(
  request: Request,
  { params }: { params: { waiterId: string } }
) {
  try {
    await prisma.user.delete({
      where: { id: params.waiterId },
    });

    return NextResponse.json(
      { message: 'Garson sistemden başarıyla silindi' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Garson silinirken hata:', error);
    return NextResponse.json(
      { error: 'Garson silinemedi' },
      { status: 500 }
    );
  }
}