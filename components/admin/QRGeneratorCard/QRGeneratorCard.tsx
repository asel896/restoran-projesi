'use client';

import styles from './QRGeneratorCard.module.css';

export default function QRGeneratorCard({ tableNumber }: { tableNumber: number }) {
  const qrUrl = `http://localhost:3000/qr/${tableNumber}`;

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>Masa #{tableNumber} QR Kod</h3>
      <div className={styles.qrContainer}>
        {/* Görsel temsil için QR alanı */}
        <div className={styles.qrPlaceholder}>
          QR: {tableNumber}
        </div>
      </div>
      <p className={styles.urlText}>{qrUrl}</p>
      <button
        onClick={() => alert(`Masa ${tableNumber} QR kodu indirildi!`)}
        className={styles.button}
      >
        QR İndir / Yazdır
      </button>
    </div>
  );
}