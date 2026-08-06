'use client';

import { usePathname, useRouter } from 'next/navigation';
import styles from './layout.module.css';

export default function WaiterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.container}>
      {/* Ana İçerik Alanı (Üst bar tamamen kaldırıldı) */}
      <main className={styles.mainContent}>
        {children}
      </main>
    </div>
  );
}