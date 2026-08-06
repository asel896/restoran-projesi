'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Flame, LogOut } from 'lucide-react';
import styles from './layout.module.css';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    if (confirm('Çıkış yapmak istediğinize emin misiniz?')) {
      // İleride burada token/session temizleme işlemleri yapılacak
      alert('Başarıyla çıkış yapıldı.');
      router.push('/login'); // veya ana sayfaya yönlendirme
    }
  };

  // Ocak ana sayfasında (/admin) tamamen çıplak, tam ekran göster
  const isHomePage = pathname === '/admin';
  if (isHomePage) {
    return <>{children}</>;
  }

  // Alt sayfalarda: sidebar yok, sadece ocağa dönüş + çıkış olan ince bir üst bar
  return (
    <div className={styles.container}>
      <header className={styles.topbar}>
        <Link href="/admin" className={styles.backToHome}>
          <Flame size={16} className={styles.backIcon} />
          Kor Ocakbaşı
        </Link>

        <div className={styles.topbarRight}>
          <span className={styles.welcomeText}>
            Hoş geldiniz, <strong>Admin</strong>
          </span>
          <button onClick={handleLogout} className={styles.logoutBtnTop}>
            <LogOut size={14} />
            Çıkış Yap
          </button>
        </div>
      </header>

      <main className={styles.pageContent}>
        {children}
      </main>
    </div>
  );
}