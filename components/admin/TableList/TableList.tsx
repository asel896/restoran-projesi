'use client';

import styles from './TableList.module.css';

interface Table {
  id: number;
  name: string;
  status: string;
  capacity: number;
  total: string;
}

export default function TableList({ tables, onToggle }: { tables: Table[]; onToggle: (id: number) => void }) {
  return (
    <div className={styles.grid}>
      {tables.map((table) => {
        const isFull = table.status === 'Dolu';
        const isReserved = table.status === 'Rezerve';
        
        const statusClass = isFull 
          ? styles.statusFull 
          : isReserved 
            ? styles.statusReserved 
            : styles.statusAvailable;

        return (
          <div key={table.id} className={styles.card}>
            <div>
              <div className={styles.header}>
                <h3 className={styles.tableName}>{table.name}</h3>
                <span className={`${styles.statusBadge} ${statusClass}`}>{table.status}</span>
              </div>
              <p className={styles.capacity}>Kapasite: {table.capacity} Kişilik</p>
              <p className={styles.total}>Hesap: {table.total}</p>
            </div>
            <button onClick={() => onToggle(table.id)} className={styles.toggleButton}>
              Durumu Değiştir
            </button>
          </div>
        );
      })}
    </div>
  );
}