import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'E-posta ve şifre zorunludur' },
        { status: 400 }
      );
    }

    
    const user = await prisma.user.findUnique({
      where: { email },
    });

    
    if (!user || user.password !== password) {
      return NextResponse.json(
        { error: 'Geçersiz e-posta veya şifre' },
        { status: 401 }
      );
    }

    
    if (user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Bu alana sadece yöneticiler giriş yapabilir' },
        { status: 403 }
      );
    }

   
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json(
      { message: 'Giriş başarılı', user: userWithoutPassword },
      { status: 200 }
    );
  } catch (error) {
    console.error('Admin giriş hatası:', error);
    return NextResponse.json(
      { error: 'Giriş yapılırken bir hata oluştu' },
      { status: 500 }
    );
  }
}