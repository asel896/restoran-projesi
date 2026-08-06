'use client';

import { useState } from 'react';
import ReservationList from '@/components/admin/ReservationList/ReservationList';
import styles from './page.module.css';

export default function ReservationsPage() {
  const [reservations, setReservations] = useState([
    { id: 1, customer: 'Caner Çelik', phone: '0532 111 2233', date: '03.06.2026 - 19:30', guests: 4, note: 'Pencere kenarı masa istiyor.' },
    { id: 2, customer: 'Selin Erdem', phone: '0543 444 5566', date: '03.06.2026 - 20:15', guests: 2, note: 'Doğum günü kutlaması.' },
  ]);

  const handleApprove = (id: number) => {
    alert(`Rezervasyon #${id} onaylandı.`);
  };

  const handleCancel = (id: number) => {
    setReservations(reservations.filter((res) => res.id !== id));
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.eyebrow}>Kor Ocakbaşı — Yönetim Paneli</span>
        <h2 className={styles.title}>
          Rezervasyon <span className={styles.titleHighlight}>Yönetimi</span>
        </h2>
      </div>
      
      {/* Modüler ReservationList Bileşeni */}
      <ReservationList 
        reservations={reservations} 
        onApprove={handleApprove} 
        onCancel={handleCancel} 
      />
    </div>
  );
}