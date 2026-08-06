'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

export default function UnifiedLoginPage() {
  const router = useRouter();
  const [role, setRole] = useState<'admin' | 'chef' | 'waiter'>('admin');

  // Admin Form State
  const [adminUser, setAdminUser] = useState('');
  const [adminPass, setAdminPass] = useState('');

  // Şef Form State
  const [chefPin, setChefPin] = useState('');

  // Garson Form State
  const [waiterPin, setWaiterPin] = useState('');

  const handleAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminUser || !adminPass) return;
    
    alert('Yönetici girişi başarılı!');
    router.push('/admin');
  };

  const handleChefSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chefPin) return;

    alert('Şef girişi başarılı!');
    router.push('/kitchen');
  };

  const handleWaiterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!waiterPin) return;

    alert('Garson girişi başarılı!');
    router.push('/waiter');
  };

  return (
    <div className={styles.stage}>
      {/* Arka plan — hafif yükselen duman */}
      <div className={styles.smokeLayer} aria-hidden="true">
        <span className={`${styles.smokeWisp} ${styles.smoke1}`} />
        <span className={`${styles.smokeWisp} ${styles.smoke2}`} />
        <span className={`${styles.smokeWisp} ${styles.smoke3}`} />
      </div>

      <div className={styles.card}>
        {/* Başlık */}
        <div className={styles.header}>
          <h1 className={styles.title}>
            Kor Ocakbaşı
          </h1>
          <p className={styles.subtitle}>
            Yönetim Otomasyonu Giriş Paneli
          </p>
        </div>

        {/* Rol Seçim Sekmeleri (Tabs) */}
        <div className={styles.tabs}>
          <button
            type="button"
            onClick={() => setRole('admin')}
            className={`${styles.tabButton} ${role === 'admin' ? styles.tabButtonActive : ''}`}
          >
            👨‍💼 Yönetici
          </button>
          <button
            type="button"
            onClick={() => setRole('chef')}
            className={`${styles.tabButton} ${role === 'chef' ? styles.tabButtonActive : ''}`}
          >
            🍳 Şef
          </button>
          <button
            type="button"
            onClick={() => setRole('waiter')}
            className={`${styles.tabButton} ${role === 'waiter' ? styles.tabButtonActive : ''}`}
          >
            🍽️ Garson
          </button>
        </div>

        {/* Admin Giriş Formu */}
        {role === 'admin' && (
          <form onSubmit={handleAdminSubmit} className={styles.form}>
            <div>
              <label className={styles.label}>
                Kullanıcı Adı
              </label>
              <input
                type="text"
                required
                placeholder="admin"
                value={adminUser}
                onChange={(e) => setAdminUser(e.target.value)}
                className={styles.input}
              />
            </div>

            <div>
              <label className={styles.label}>
                Şifre
              </label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={adminPass}
                onChange={(e) => setAdminPass(e.target.value)}
                className={styles.input}
              />
            </div>

            <button
              type="submit"
              className={styles.submitButton}
            >
              Yönetici Paneline Giriş Yap
            </button>
          </form>
        )}

        {/* Şef PIN Giriş Formu */}
        {role === 'chef' && (
          <form onSubmit={handleChefSubmit} className={styles.form}>
            <div>
              <label className={styles.label}>
                Şef PIN Kodu
              </label>
              <input
                type="password"
                maxLength={6}
                required
                placeholder="Örn: 5678"
                value={chefPin}
                onChange={(e) => setChefPin(e.target.value)}
                className={`${styles.input} ${styles.pinInput}`}
              />
            </div>

            <button
              type="submit"
              className={styles.submitButton}
            >
              Şef Paneline Giriş Yap
            </button>
          </form>
        )}

        {/* Garson PIN Giriş Formu */}
        {role === 'waiter' && (
          <form onSubmit={handleWaiterSubmit} className={styles.form}>
            <div>
              <label className={styles.label}>
                Garson PIN Kodu
              </label>
              <input
                type="password"
                maxLength={6}
                required
                placeholder="Örn: 1234"
                value={waiterPin}
                onChange={(e) => setWaiterPin(e.target.value)}
                className={`${styles.input} ${styles.pinInput}`}
              />
            </div>

            <button
              type="submit"
              className={styles.submitButton}
            >
              Garson Paneline Giriş Yap
            </button>
          </form>
        )}
      </div>
    </div>
  );
}