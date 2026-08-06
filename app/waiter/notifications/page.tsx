'use client';

import { useState } from 'react';
import CallNotificationCard from '@/components/waiter/CallNotificationCard/CallNotificationCard';
import CallHistoryList from '@/components/waiter/CallHistoryList/CallHistoryList';
import CallSound from '@/components/waiter/CallSound/CallSound';
import styles from './page.module.css';

export default function WaiterNotificationsPage() {
  const [activeCalls, setActiveCalls] = useState([
    { id: 1, table: 'Masa 4', type: 'Garson Çağırma', time: '14:32' },
    { id: 2, table: 'Masa 2', type: 'Hesap İsteme', time: '14:35' },
    { id: 3, table: 'Masa 6', type: 'Su / İçecek', time: '14:40' },
  ]);

  const [history, setHistory] = useState([
    { id: 101, table: 'Masa 1', type: 'Garson Çağırma', completedAt: '14:20' },
  ]);

  // Yeni çağrı geldiğinde tetiklenecek state (örnek amaçlı true verilebilir)
  const [playAlert, setPlayAlert] = useState(false);

  const handleCompleteCall = (id: number) => {
    const callToComplete = activeCalls.find((c) => c.id === id);
    if (!callToComplete) return;

    setActiveCalls(activeCalls.filter((c) => c.id !== id));
    setHistory([
      {
        id: Date.now(),
        table: callToComplete.table,
        type: callToComplete.type,
        completedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
      ...history,
    ]);
  };

  return (
    <div className={styles.container}>
      {/* Ses Efekti Bileşeni */}
      <CallSound playTrigger={playAlert} />

      <div className={styles.headerRow}>
        <h2 className={styles.title}>🔔 Garson Anlık Bildirimler ve Çağrılar</h2>
        <span className={styles.badge}>
          Aktif Bildirim: {activeCalls.length}
        </span>
      </div>

      <div className={styles.grid}>
        <div className={styles.activeColumn}>
          <h3 className={styles.sectionHeading}>Masalardan Gelen Talepler</h3>
          {activeCalls.length === 0 ? (
            <div className={styles.emptyCard}>
              🎉 Harika! Bekleyen bildirim bulunmuyor.
            </div>
          ) : (
            activeCalls.map((call) => (
              <CallNotificationCard key={call.id} call={call} onComplete={handleCompleteCall} />
            ))
          )}
        </div>

        <div>
          <CallHistoryList history={history} />
        </div>
      </div>
    </div>
  );
}