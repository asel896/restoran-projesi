'use client';

import { useState } from 'react';
import TableList from '@/components/admin/TableList/TableList';
import styles from './page.module.css';

export default function TablesPage() {
  const [tables, setTables] = useState([
    { id: 1, name: 'Masa 1', status: 'Dolu', capacity: 4, total: '₺420' },
    { id: 2, name: 'Masa 2', status: 'Boş', capacity: 2, total: '₺0' },
    { id: 3, name: 'Masa 3', status: 'Dolu', capacity: 6, total: '₺1,150' },
    { id: 4, name: 'Masa 4', status: 'Rezerve', capacity: 4, total: '₺0' },
    { id: 5, name: 'Masa 5', status: 'Boş', capacity: 4, total: '₺0' },
  ]);

  const toggleStatus = (id: number) => {
    setTables(
      tables.map((t) => {
        if (t.id === id) {
          const nextStatus = t.status === 'Boş' ? 'Dolu' : t.status === 'Dolu' ? 'Rezerve' : 'Boş';
          return { ...t, status: nextStatus };
        }
        return t;
      })
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.eyebrow}>Kor Ocakbaşı — Yönetim Paneli</span>
        <h2 className={styles.title}>
          Salon ve Masa <span className={styles.titleHighlight}>Yönetimi</span>
        </h2>
      </div>
      
      {/* Modüler TableList Bileşeni */}
      <TableList tables={tables} onToggle={toggleStatus} />
    </div>
  );
}