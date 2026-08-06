'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function ReservationDetailPage() {
  const params = useParams();
  const router = useRouter();
  const reservationId = params.reservationId as string;

  // Şimdilik mockup rezervasyon detayı
  const [reservation, setReservation] = useState({
    id: reservationId,
    customerName: 'Caner Öztürk',
    phone: '0532 111 2233',
    email: 'caner@example.com',
    date: '2026-08-03',
    time: '19:30',
    guestCount: 4,
    tablePreference: 'Pencere Kenarı / Teras',
    status: 'Beklemede' as 'Beklemede' | 'Onaylandı' | 'İptal Edildi',
    note: 'Doğum günü kutlaması olacak, mum rica ediliyor.',
  });

  const handleStatusChange = (newStatus: 'Beklemede' | 'Onaylandı' | 'İptal Edildi') => {
    setReservation({ ...reservation, status: newStatus });
    alert(`Rezervasyon durumu "${newStatus}" olarak güncellendi.`);
  };

  return (
    <div style={{ padding: '30px', maxWidth: '700px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <button 
        onClick={() => router.push('/admin/reservations')}
        style={{ marginBottom: '20px', padding: '6px 12px', cursor: 'pointer' }}
      >
        ← Rezervasyon Listesine Dön
      </button>

      <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '25px', backgroundColor: '#fff' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '15px' }}>
          <div>
            <h2 style={{ margin: 0 }}>Rezervasyon #{reservationId}</h2>
            <p style={{ color: '#666', margin: '5px 0 0 0' }}>Müşteri Detayları ve Rezervasyon Durumu</p>
          </div>
          <span style={{
            padding: '6px 12px',
            borderRadius: '20px',
            fontSize: '13px',
            fontWeight: 'bold',
            color: '#fff',
            backgroundColor: reservation.status === 'Onaylandı' ? '#28a745' : reservation.status === 'İptal Edildi' ? '#dc3545' : '#ffc107'
          }}>
            {reservation.status}
          </span>
        </div>

        {/* Detay Bilgileri Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
          <div>
            <strong style={{ color: '#555', display: 'block', fontSize: '13px' }}>MÜŞTERİ ADI:</strong>
            <span style={{ fontSize: '16px' }}>{reservation.customerName}</span>
          </div>
          <div>
            <strong style={{ color: '#555', display: 'block', fontSize: '13px' }}>TELEFON:</strong>
            <span style={{ fontSize: '16px' }}>{reservation.phone}</span>
          </div>
          <div>
            <strong style={{ color: '#555', display: 'block', fontSize: '13px' }}>E-POSTA:</strong>
            <span style={{ fontSize: '16px' }}>{reservation.email}</span>
          </div>
          <div>
            <strong style={{ color: '#555', display: 'block', fontSize: '13px' }}>KİŞİ SAYISI:</strong>
            <span style={{ fontSize: '16px' }}>{reservation.guestCount} Kişi</span>
          </div>
          <div>
            <strong style={{ color: '#555', display: 'block', fontSize: '13px' }}>TARİH & SAAT:</strong>
            <span style={{ fontSize: '16px' }}>{reservation.date} - {reservation.time}</span>
          </div>
          <div>
            <strong style={{ color: '#555', display: 'block', fontSize: '13px' }}>MASA TERCİHİ:</strong>
            <span style={{ fontSize: '16px' }}>{reservation.tablePreference}</span>
          </div>
        </div>

        {/* Özel Not */}
        <div style={{ padding: '12px', backgroundColor: '#fff8e6', border: '1px solid #ffe8a1', borderRadius: '6px', marginBottom: '25px' }}>
          <strong style={{ color: '#856404', display: 'block', fontSize: '13px', marginBottom: '4px' }}>MÜŞTERİ NOTU:</strong>
          <span style={{ color: '#856404' }}>{reservation.note}</span>
        </div>

        {/* İşlem Butonları */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            onClick={() => handleStatusChange('Onaylandı')}
            style={{ flex: 1, padding: '10px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            ✓ Rezervasyonu Onayla
          </button>
          <button 
            onClick={() => handleStatusChange('İptal Edildi')}
            style={{ flex: 1, padding: '10px', backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            ✕ İptal Et
          </button>
        </div>
      </div>
    </div>
  );
}