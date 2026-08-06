import Link from 'next/link';
import styles from './page.module.css';

export default function NotFound() {
  return (
    <div className={styles.container}>
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          textAlign: 'center',
        }}
      >
        <h1
          style={{
            fontSize: '48px',
            color: 'var(--bakir, #B9863F)',
            fontFamily: 'Fraunces, serif',
            fontWeight: 700,
            margin: '0 0 10px 0',
          }}
        >
          404
        </h1>
        <h2
          style={{
            fontSize: '20px',
            color: 'var(--kagit, #F3E9D2)',
            fontFamily: 'Fraunces, serif',
            fontWeight: 600,
            margin: '0 0 10px 0',
          }}
        >
          Masa Bulunamadı
        </h2>
        <p
          style={{
            color: 'var(--kagit-dim, #C9BC9C)',
            marginBottom: '24px',
            maxWidth: '400px',
            fontSize: '14px',
            fontFamily: 'Work Sans, sans-serif',
            lineHeight: 1.5,
          }}
        >
          Taramış olduğunuz QR koda ait masa sistemde tanımlı değil veya erişilemiyor.
        </p>
        <Link
          href="/"
          style={{
            backgroundColor: 'var(--kor, #C43E1C)',
            color: 'var(--kagit, #F3E9D2)',
            padding: '10px 24px',
            borderRadius: '3px',
            border: '1px solid var(--hairline, #3A3226)',
            textDecoration: 'none',
            fontWeight: 600,
            fontFamily: 'Work Sans, sans-serif',
            fontSize: '14px',
          }}
        >
          Ana Sayfaya Dön
        </Link>
      </div>
    </div>
  );
}