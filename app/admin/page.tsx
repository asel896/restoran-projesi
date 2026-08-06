'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {
  Flame as FlameIcon,
  UtensilsCrossed,
  QrCode,
  ChefHat,
  CalendarDays,
  BarChart3,
  Receipt,
} from 'lucide-react';
import styles from './page.module.css';

type Burner = {
  name: string;
  href: string;
  icon: typeof UtensilsCrossed;
  size: 'lg' | 'md' | 'sm';
  // Merkeze göre konum: yüzde cinsinden (sketch'teki dağınık ocak gözleri düzeni)
  top: string;
  left: string;
  // Canlı sayı rozeti (opsiyonel) — gerçek veriyle bağlandığında API'den gelecek
  badge?: number;
};

const burners: Burner[] = [
  { name: 'Siparişler', href: '/admin/dashboard', icon: Receipt, size: 'md', top: '12%', left: '50%', badge: 4 },
  { name: 'Menü Yönetimi', href: '/admin/menu-management', icon: UtensilsCrossed, size: 'md', top: '31%', left: '82.9%' },
  { name: 'Masa Yönetimi', href: '/admin/tables', icon: QrCode, size: 'md', top: '69%', left: '82.9%' },
  { name: 'Rezervasyonlar', href: '/admin/reservations', icon: CalendarDays, size: 'md', top: '88%', left: '50%', badge: 12 },
  { name: 'Garson Yönetimi', href: '/admin/waiter-management', icon: ChefHat, size: 'md', top: '69%', left: '17.1%' },
  { name: 'İstatistikler', href: '/admin/statistics', icon: BarChart3, size: 'md', top: '31%', left: '17.1%' },
];

export default function AdminHomePage() {
  const router = useRouter();
  const [igniting, setIgniting] = useState<string | null>(null);

  const handleBurnerClick = (href: string) => {
    if (igniting) return;
    setIgniting(href);
    // Alev efekti oynasın, sonra sayfaya geç
    setTimeout(() => {
      router.push(href);
    }, 480);
  };

  return (
    <div className={styles.stage}>
      {/* Arka plan — hafif yükselen duman */}
      <div className={styles.smokeLayer} aria-hidden="true">
        <span className={`${styles.smokeWisp} ${styles.smoke1}`} />
        <span className={`${styles.smokeWisp} ${styles.smoke2}`} />
        <span className={`${styles.smokeWisp} ${styles.smoke3}`} />
      </div>

      <div className={styles.field}>
        {/* Merkez — Logo */}
        <div className={styles.center}>
          <span className={styles.centerEyebrow}>Kor Ocakbaşı</span>
          <span className={styles.centerTitle}>Yönetim Paneli</span>
        </div>

        {/* Ocak gözleri */}
        {burners.map((burner) => {
          const Icon = burner.icon;
          const isIgniting = igniting === burner.href;
          return (
            <button
              key={burner.href}
              className={`${styles.burner} ${styles[burner.size]} ${isIgniting ? styles.igniting : ''}`}
              style={{ top: burner.top, left: burner.left }}
              onClick={() => handleBurnerClick(burner.href)}
              disabled={!!igniting}
            >
              {burner.badge !== undefined && (
                <span className={styles.badge}>{burner.badge}</span>
              )}
              <span className={styles.pilot} aria-hidden="true" />
              <span className={styles.flameWrap} aria-hidden="true">
                <FlameIcon className={styles.flame} />
                <FlameIcon className={`${styles.flame} ${styles.flame2}`} />
                <FlameIcon className={`${styles.flame} ${styles.flame3}`} />
              </span>
              <Icon size={burner.size === 'lg' ? 26 : burner.size === 'md' ? 21 : 17} className={styles.burnerIcon} />
              <span className={styles.burnerLabel}>{burner.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}