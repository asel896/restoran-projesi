import { NextResponse } from 'next/server';


export async function GET() {
  return NextResponse.json(
    { 
      status: 'active',
      message: 'Socket servisi aktif ve dinlemede' 
    }, 
    { status: 200 }
  );
}
// Frontend'den gelen canlı bildirim tetiklemeleri için (Örn: Manuel olay yayınlama)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { event, data } = body;

    if (!event) {
      return NextResponse.json(
        { error: 'Event (olay adı) belirtilmelidir' },
        { status: 400 }
      );
    }

    
    console.log(`[SOCKET EVENT] Event: ${event}`, data);

    return NextResponse.json(
      { success: true, message: `Event '${event}' başarıyla yayınlandı` },
      { status: 200 }
    );
  } catch (error) {
    console.error('Socket mesajı işlenirken hata:', error);
    return NextResponse.json(
      { error: 'Socket mesajı iletilemedi' },
      { status: 500 }
    );
  }
}