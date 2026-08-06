'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

interface Notification {
  id: string;
  tableId: string;
  type: 'WAITER' | 'BILL' | 'KITCHEN_READY'; // 👈 Mutfak bildirimi tipi eklendi
  time: string;
  read?: boolean;
}

interface Table {
  id: string;
  name: string;
  status: 'OCCUPIED' | 'EMPTY';
  total: number;
}

export default function WaiterDashboard() {
  const router = useRouter();

  const [tables] = useState<Table[]>([
    { id: '1', name: 'Masa 1', status: 'OCCUPIED', total: 450 },
    { id: '2', name: 'Masa 2', status: 'EMPTY', total: 0 },
    { id: '3', name: 'Masa 3', status: 'OCCUPIED', total: 280 },
    { id: '4', name: 'Masa 4', status: 'EMPTY', total: 0 },
  ]);

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [activeTab, setActiveTab] = useState<'tables' | 'notifications'>('tables');

  const loadNotifications = () => {
    const stored = JSON.parse(localStorage.getItem('waiter_notifications') || '[]');
    setNotifications(stored);
  };

  useEffect(() => {
  loadNotifications();

  const handleUpdate = (e?: Event) => {
    // Eğer olay bir StorageEvent ise ve key bizimki değilse işlem yapma
    if (e instanceof StorageEvent && e.key !== 'waiter_notifications') {
      return;
    }
    loadNotifications();
  };

  // Hem sekme içi (custom event) hem sekmeler arası (storage event) tek handler üzerinden dinlenir
  window.addEventListener('storage', handleUpdate);
  window.addEventListener('waiter-notification-updated', handleUpdate);

  return () => {
    window.removeEventListener('storage', handleUpdate);
    window.removeEventListener('waiter-notification-updated', handleUpdate);
  };
}, []);

  const removeNotification = (id: string) => {
    const updated = notifications.filter((n) => n.id !== id);
    setNotifications(updated);
    localStorage.setItem('waiter_notifications', JSON.stringify(updated));
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Çağrısı veya hazır siparişi olan masalar en üstte görünsün
  const sortedTables = [...tables].sort((a, b) => {
    const aCalled = notifications.some((n) => n.tableId === a.id);
    const bCalled = notifications.some((n) => n.tableId === b.id);
    if (aCalled && !bCalled) return -1;
    if (!aCalled && bCalled) return 1;
    return 0;
  });

  const getTableStatusMeta = (table: Table, hasCall: boolean) => {
    if (hasCall) {
      return { dotClass: styles.dotCalled, label: `Dolu (₺${table.total})` };
    }
    if (table.status === 'OCCUPIED') {
      return { dotClass: styles.dotOccupied, label: `Dolu (₺${table.total})` };
    }
    return { dotClass: styles.dotEmpty, label: 'Boş' };
  };

  // Bildirim kartı başlık ve ikon yardımcı fonksiyonu
  const getNotificationInfo = (type: Notification['type']) => {
    switch (type) {
      case 'WAITER':
        return { title: '🔔 Garson Çağrısı', text: 'sizi çağırıyor!', tag: 'Garson Çağrısı' };
      case 'BILL':
        return { title: '💰 Hesap Talebi', text: 'hesap istiyor!', tag: 'Hesap Talebi' };
      case 'KITCHEN_READY':
        return { title: '🍳 Sipariş Hazır', text: 'siparişi mutfakta hazır!', tag: 'Mutfak Hazır' };
    }
  };

  return (
    <div className={styles.dashboard}>
      {/* NAVBAR */}
      <nav className={styles.navbar}>
        <div className={styles.navLeft}>
          <h1 className={styles.brand}>Kor Ocakbaşı</h1>
          <button
            onClick={() => setActiveTab('tables')}
            className={`${styles.navButton} ${activeTab === 'tables' ? styles.navButtonActive : ''}`}
          >
            Masalar
          </button>
          <button
            onClick={() => setActiveTab('notifications')}
            className={`${styles.navButton} ${activeTab === 'notifications' ? styles.navButtonActive : ''}`}
          >
            Bildirimler
            {unreadCount > 0 && <span className={styles.badge}>{unreadCount}</span>}
          </button>
        </div>

        <div className={styles.navRight}>
          <span className={styles.userInfo}>👤 Ahmet Y.</span>
          <button
            onClick={() => {
              if (confirm('Çıkış yapmak istediğinize emin misiniz?')) {
                router.push('/login');
              }
            }}
            className={styles.logoutButton}
          >
            Çıkış Yap
          </button>
        </div>
      </nav>

      {/* CANLI POP-UP BİLDİRİM KARTLARI (SAĞ ÜST) */}
      <div className={styles.popupContainer}>
        {notifications.slice(0, 3).map((n) => {
          const info = getNotificationInfo(n.type);
          return (
            <div
              key={n.id}
              className={`${styles.popupCard} ${
                n.type === 'WAITER'
                  ? styles.popupWait
                  : n.type === 'KITCHEN_READY'
                  ? styles.popupKitchen
                  : styles.popupBill
              }`}
            >
              <div>
                <div className={styles.popupTitle}>{info.title}</div>
                <div className={styles.popupText}>
                  <strong>Masa #{n.tableId}</strong> {info.text}
                </div>
                <div className={styles.popupTime}>Saat: {n.time}</div>
              </div>
              <button onClick={() => removeNotification(n.id)} className={styles.popupClose}>
                Kapat
              </button>
            </div>
          );
        })}
      </div>

      {/* SEKMELERİN İÇERİĞİ */}
      {activeTab === 'tables' ? (
        <div>
          <h2 className={styles.sectionTitle}>Salon Masaları</h2>
          <div className={styles.tablesGrid}>
            {sortedTables.map((table) => {
              const tableHasCall = notifications.some((n) => n.tableId === table.id);
              const { dotClass, label } = getTableStatusMeta(table, tableHasCall);

              return (
                <div
                  key={table.id}
                  onClick={() => router.push(`/waiter/${table.id}`)}
                  className={`${styles.tableCard} ${tableHasCall ? styles.tableCardCalled : ''}`}
                >
                  <div className={styles.tableHeader}>
                    <h3 className={styles.tableName}>{table.name}</h3>
                    {tableHasCall && <span className={styles.callIcon}>🔔</span>}
                  </div>
                  <div className={styles.statusRow}>
                    <span className={`${styles.statusDot} ${dotClass}`} aria-hidden="true" />
                    <span className={styles.statusLabel}>{label}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* BİLDİRİMLER SEKMESİ İÇERİĞİ */
        <div>
          <h2 className={styles.sectionTitle}>Gelen Çağrılar & Mutfak Bildirimleri</h2>
          {notifications.length === 0 ? (
            <p className={styles.emptyState}>Henüz yeni bir çağrı veya mutfak bildirimi bulunmuyor.</p>
          ) : (
            <div className={styles.notificationsList}>
              {notifications.map((n) => {
                const info = getNotificationInfo(n.type);
                return (
                  <div key={n.id} className={styles.notificationCard}>
                    <div>
                      <span
                        className={
                          n.type === 'WAITER'
                            ? styles.tagWait
                            : n.type === 'KITCHEN_READY'
                            ? styles.tagKitchen
                            : styles.tagBill
                        }
                      >
                        {info.tag}
                      </span>
                      <h3 className={styles.notificationHeading}>Masa #{n.tableId}</h3>
                      <p style={{ margin: '4px 0', fontSize: '14px', color: '#475569' }}>
                        {info.text}
                      </p>
                      <span className={styles.notificationTime}>Saat: {n.time}</span>
                    </div>

                    <button onClick={() => removeNotification(n.id)} className={styles.completeButton}>
                      ✓ Tamamlandı
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}