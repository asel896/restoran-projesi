'use client';

import styles from './ReservationList.module.css';

interface Reservation {
  id: number;
  customer: string;
  phone: string;
  date: string;
  guests: number;
  note: string;
}

export default function ReservationList({ reservations, onApprove, onCancel }: { reservations: Reservation[]; onApprove: (id: number) => void; onCancel: (id: number) => void }) {
  return (
    <div className={styles.container}>
      {reservations.map((res) => (
        <div key={res.id} className={styles.card}>
          <div>
            <h3 className={styles.customerName}>
              {res.customer} <span className={styles.phone}>({res.phone})</span>
            </h3>
            <p className={styles.details}>
              Tarih / Saat: <strong className={styles.detailValue}>{res.date}</strong> — Kişi Sayısı: <strong className={styles.detailValue}>{res.guests}</strong>
            </p>
            <p className={styles.note}>
              Not: {res.note}
            </p>
          </div>
          <div className={styles.actions}>
            <button 
              onClick={() => onApprove(res.id)} 
              className={styles.approveButton}
            >
              Onayla
            </button>
            <button 
              onClick={() => onCancel(res.id)} 
              className={styles.cancelButton}
            >
              İptal Et
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}