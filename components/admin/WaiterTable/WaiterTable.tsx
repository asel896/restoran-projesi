'use client';

import styles from './WaiterTable.module.css';

interface Staff {
  id: number;
  name: string;
  role: string; // Rol alanı eklendi
  shift: string;
  status: string;
}

export default function WaiterTable({ waiters }: { waiters: Staff[] }) {
  return (
    <div className={styles.card}>
      <table className={styles.table}>
        <thead>
          <tr className={styles.theadRow}>
            <th className={styles.th}>Personel Adı</th>
            <th className={styles.th}>Rol / Unvan</th>
            <th className={styles.th}>Vardiya</th>
            <th className={styles.th}>Durum</th>
          </tr>
        </thead>
        <tbody>
          {waiters.map((w) => {
            const isActive = w.status === 'Aktif';
            return (
              <tr key={w.id} className={styles.tbodyRow}>
                <td className={styles.tdName}>{w.name}</td>
                <td className={styles.tdRole}>
                  <span style={{ fontWeight: '600', color: w.role === 'Şef' ? '#B9863F' : 'inherit' }}>
                    {w.role === 'Şef' ? '🍳 Şef' : '🍽️ Garson'}
                  </span>
                </td>
                <td className={styles.tdShift}>{w.shift}</td>
                <td className={styles.tdStatus}>
                  <span className={`${styles.badge} ${isActive ? styles.badgeActive : styles.badgeInactive}`}>
                    {w.status}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}