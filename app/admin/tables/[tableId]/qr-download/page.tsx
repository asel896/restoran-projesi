'use client';

import { useParams, useRouter } from 'next/navigation';

export default function QRDownloadPage() {
  const params = useParams();
  const router = useRouter();
  const tableId = params.tableId as string;

  // Gerçek uygulamada domain dinamik alınır (örn: https://restoraniniz.com)
  const baseUrl = 'http://localhost:3000';
  const qrTargetUrl = `${baseUrl}/qr/${tableId}`;

  // Google Chart API kullanarak anlık hızlı bir QR görseli oluşturuyoruz
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(qrTargetUrl)}`;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{ padding: '30px', maxWidth: '600px', margin: '0 auto', fontFamily: 'sans-serif', textAlign: 'center' }}>
      {/* Ekran Görünümünde Kalacak Navigasyon */}
      <div className="no-print" style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button 
          onClick={() => router.push('/admin/tables')}
          style={{ padding: '6px 12px', cursor: 'pointer' }}
        >
          ← Masalara Dön
        </button>
        <button 
          onClick={handlePrint}
          style={{ padding: '8px 16px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          🛈 QR Kodu Yazdır / PDF İndir
        </button>
      </div>

      {/* Masaya Koyulacak Baskı Kartı Tasarımı */}
      <div style={{ 
        border: '3px dashed #333', 
        borderRadius: '12px', 
        padding: '40px 20px', 
        backgroundColor: '#fff',
        boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ margin: '0 0 10px 0', textTransform: 'uppercase', letterSpacing: '1px' }}>Restoran Menüsü</h2>
        <p style={{ color: '#666', marginTop: 0 }}>Masaya Hoş Geldiniz!</p>

        <div style={{ margin: '30px 0' }}>
          <img 
            src={qrImageUrl} 
            alt={`Masa ${tableId} QR Kod`} 
            style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '8px', backgroundColor: '#fff' }}
          />
        </div>

        <h1 style={{ fontSize: '28px', margin: '10px 0', color: '#0070f3' }}>MASA {tableId}</h1>
        <p style={{ fontSize: '14px', color: '#555', margin: '15px 0 0 0' }}>
          Menüyü incelemek ve sipariş vermek için <br />
          <strong>telefonunuzun kamerasını QR koda doğrultun.</strong>
        </p>
      </div>

      {/* Yazdırma Modu İçin CSS Stili (Sayfa yazdırılırken sadece kart gözükür) */}
      <style jsx global>{`
        @media print {
          .no-print {
            display: none !important;
          }
          body {
            background: white !important;
          }
        }
      `}</style>
    </div>
  );
}