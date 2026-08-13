import { NextResponse } from 'next/server';

export async function POST() {
  try {
    
    return NextResponse.json(
      { message: 'Başarıyla çıkış yapıldı' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Çıkış hatası:', error);
    return NextResponse.json(
      { error: 'Çıkış yapılırken bir hata oluştu' },
      { status: 500 }
    );
  }
}