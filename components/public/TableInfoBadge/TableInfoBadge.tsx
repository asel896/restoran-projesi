'use client';

import { useParams } from 'next/navigation';
import styles from './TableInfoBadge.module.css';

interface TableInfoBadgeProps {
  tableNumber?: string;
  tableId?: string;
}

export default function TableInfoBadge({ tableNumber, tableId }: TableInfoBadgeProps) {
  const params = useParams();
  
  // Öncelik sırası: Prop olarak gelenler -> URL parametresi -> Varsayılan '1'
  const currentTable = tableNumber || tableId || (params?.tableId as string) || '1';

  return (
    <div className={styles.badge}>
      <span className={styles.dot}></span>
      Aktif Masa: <strong className={styles.tableNumber}>{currentTable}</strong>
    </div>
  );
}