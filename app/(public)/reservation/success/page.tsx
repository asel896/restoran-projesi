import Link from 'next/link';
import styles from './page.module.css';

interface PageProps {
  searchParams: {
    name?: string;
    date?: string;
    time?: string;
    guests?: string;
  };
}

export default function ReservationSuccessPage({ searchParams }: PageProps) {
  const { name, date, time, guests } = searchParams;

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.checkCircle}>✓</div>

        <h1 className={styles.title}>Rezervasyon Talebiniz Alındı</h1>

        <p className={styles.subtitle}>
          {name ? `Teşekkürler, ${name}. ` : ''}Ekibimiz talebinizi en kısa sürede onaylayacak.
        </p>

        {(date || time || guests) && (
          <div className={styles.summaryCard}>
            {date && (
              <div className={styles.summaryRow}>
                <span className={styles.summaryLabel}>Tarih</span>
                <span className={styles.summaryValue}>{date}</span>
              </div>
            )}
            {time && (
              <div className={styles.summaryRow}>
                <span className={styles.summaryLabel}>Saat</span>
                <span className={styles.summaryValue}>{time}</span>
              </div>
            )}
            {guests && (
              <div className={styles.summaryRow}>
                <span className={styles.summaryLabel}>Kişi Sayısı</span>
                <span className={styles.summaryValue}>{guests}</span>
              </div>
            )}
          </div>
        )}

        <Link href="/menu" className={styles.menuButton}>Menüye Dön</Link>
      </main>
    </div>
  );
}