'use client';

import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  UtensilsCrossed,
  ChefHat,
  QrCode,
  CalendarDays,
  Flame,
  DoorOpen,
  Clock3,
  Receipt,
} from 'lucide-react';
import styles from './page.module.css';

export default function AdminDashboardPage() {
  const router = useRouter();

  // Şimdilik mockup/test verileri
  const stats = {
    dailyRevenue: '₺14.250',
    activeTables: '8 / 15',
    pendingOrders: 4,
    totalReservations: 12,
  };

  const recentOrders = [
    { id: '101', table: 'Masa 3', items: '2x Adana Kebap, 2x Ayran', status: 'Hazırlanıyor', time: '10 dk önce' },
    { id: '102', table: 'Masa 7', items: '1x Künefe, 1x Çay', status: 'Teslim Edildi', time: '18 dk önce' },
    { id: '103', table: 'Masa 1', items: '3x Lahmacun, 1x Şalgam', status: 'Beklemede', time: '2 dk önce' },
  ];

  const statusClass = (status: string) => {
    if (status === 'Beklemede') return styles.statusWaiting;
    if (status === 'Hazırlanıyor') return styles.statusPreparing;
    return styles.statusDelivered;
  };

  return (
    <div className={styles.page}>
      {/* Başlık & Çıkış */}
      <div className={styles.header}>
        <div>
          <span className={styles.eyebrow}>Kor Ocakbaşı — Yönetim Paneli</span>
          <h1 className={styles.title}>Bugün mutfakta <em>neler oluyor</em></h1>
        </div>
        
      </div>

      {/* 1. İstatistik Kartları — sipariş fişi rafı */}
      <div className={styles.rail}>
        <div className={styles.statsGrid}>
          <div className={styles.ticket}>
            <div className={styles.ticketHead}>
              <span>Bugünkü Ciro</span>
              <Flame size={16} className={styles.ticketIcon} />
            </div>
            <div className={styles.ticketValue}>{stats.dailyRevenue}</div>
          </div>
          <div className={styles.ticket}>
            <div className={styles.ticketHead}>
              <span>Dolu Masalar</span>
              <DoorOpen size={16} className={styles.ticketIcon} />
            </div>
            <div className={styles.ticketValue}>{stats.activeTables}</div>
          </div>
          <div className={styles.ticket}>
            <div className={styles.ticketHead}>
              <span>Bekleyen Siparişler</span>
              <Receipt size={16} className={styles.ticketIcon} />
            </div>
            <div className={styles.ticketValue}>{stats.pendingOrders}</div>
          </div>
          <div className={styles.ticket}>
            <div className={styles.ticketHead}>
              <span>Bugünkü Rezervasyon</span>
              <CalendarDays size={16} className={styles.ticketIcon} />
            </div>
            <div className={styles.ticketValue}>{stats.totalReservations}</div>
          </div>
        </div>
      </div>

      

      {/* 3. Canlı Sipariş Akışı */}
      <div className={styles.ordersSection}>
        <span className={styles.sectionLabel}>Son Sipariş Hareketleri</span>
        <div className={styles.ordersCard}>
          <div className={styles.ordersHead}>
            <span>Masa</span>
            <span>Sipariş İçeriği</span>
            <span>Durum</span>
            <span>Zaman</span>
          </div>
          {recentOrders.map((order) => (
            <div className={styles.orderRow} key={order.id}>
              <span className={styles.orderTable}>{order.table}</span>
              <span className={styles.orderItems}>{order.items}</span>
              <span className={`${styles.statusBadge} ${statusClass(order.status)}`}>{order.status}</span>
              <span className={styles.orderTime}>
                <Clock3 size={13} className={styles.timeIcon} />
                {order.time}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}