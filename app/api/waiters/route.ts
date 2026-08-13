import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET - Tüm garsonları listele
export async function GET() {
  try {
    const waiters = await prisma.user.findMany({
      where: {
        role: 'WAITER', 
      },
      select: {
        
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(waiters, { status: 200 });
  } catch (error) {
    console.error('Garsonlar getirilirken hata oluştu:', error);
    return NextResponse.json(
      { error: 'Garsonlar getirilemedi' },
      { status: 500 }
    );
  }
}

// POST - Yeni garson ekle 
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'İsim, e-posta ve şifre zorunludur' },
        { status: 400 }
      );
    }

    // Bu e-posta ile kayıtlı başka biri var mı kontrol et
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'Bu e-posta adresi zaten kullanılıyor' },
        { status: 400 }
      );
    }

    const newWaiter = await prisma.user.create({
      data: {
        name,
        email,
        password, 
        role: 'WAITER', 
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      }
    });

    return NextResponse.json(newWaiter, { status: 201 });
  } catch (error) {
    console.error('Garson eklenirken hata:', error);
    return NextResponse.json(
      { error: 'Garson eklenemedi' },
      { status: 500 }
    );
  }
}