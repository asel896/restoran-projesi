'use client';

import styles from './StatChart.module.css';

export default function StatChart() {
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>📈 Haftalık Ciro Dağılımı</h3>
      <div className={styles.chartArea}>
        {['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'].map((day, idx) => {
          const heights = ['40%', '65%', '50%', '80%', '95%', '100%', '85%'];
          return (
            <div key={day} className={styles.column}>
              <div className={styles.bar} style={{ height: heights[idx] }} />
              <span className={styles.dayLabel}>{day}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}