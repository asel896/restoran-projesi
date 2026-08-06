'use client';

import StatChart from '@/components/admin/StatChart/StatChart';
import styles from './page.module.css';

export default function StatisticsPage() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.eyebrow}>Kor Ocakbaşı — Yönetim Paneli</span>
        <h2 className={styles.title}>
          Finansal ve İşletme <span className={styles.titleHighlight}>İstatistikleri</span>
        </h2>
      </div>
      
      {/* Üst Metrik Kartları */}
      <div className={styles.metricsGrid}>
        <div className={styles.metricCard}>
          <h3 className={styles.metricTitle}>Aylık Toplam Ciro</h3>
          <p className={styles.metricValue}>₺384,500</p>
          <span className={styles.metricSubtitlePositive}>📈 Geçen aya göre +%18 artış</span>
        </div>
        <div className={styles.metricCard}>
          <h3 className={styles.metricTitle}>En Çok Satan Ürün</h3>
          <p className={styles.metricValue}>Adana Kebap</p>
          <span className={styles.metricSubtitleNeutral}>1,420 porsiyon satıldı</span>
        </div>
        <div className={styles.metricCard}>
          <h3 className={styles.metricTitle}>Ortalama Masa Süresi</h3>
          <p className={styles.metricValue}>48 Dakika</p>
          <span className={styles.metricSubtitlePositive}>Masa devir hızı oldukça verimli</span>
        </div>
      </div>

      {/* Modüler StatChart Grafik Bileşeni */}
      <StatChart />
    </div>
  );
}