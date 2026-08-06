'use client';

import { useEffect } from 'react';
import styles from './page.module.css';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('QR Menü Hatası:', error);
  }, [error]);

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
        <h2
          style={{
            color: 'var(--kor, #C43E1C)',
            fontFamily: 'Fraunces, serif',
            fontWeight: 700,
            fontSize: '22px',
            marginBottom: '10px',
          }}
        >
          Bir Şeyler Yanlış Gitti!
        </h2>
        <p
          style={{
            color: 'var(--kagit-dim, #C9BC9C)',
            marginBottom: '24px',
            maxWidth: '400px',
            fontFamily: 'Work Sans, sans-serif',
            fontSize: '14px',
            lineHeight: 1.5,
          }}
        >
          Menü yüklenirken bir sorun oluştu. Lütfen sayfayı yenilemeyi veya QR kodu tekrar okutmayı deneyin.
        </p>
        <button
          onClick={() => reset()}
          style={{
            backgroundColor: 'var(--kor, #C43E1C)',
            color: 'var(--kagit, #F3E9D2)',
            border: '1px solid var(--hairline, #3A3226)',
            padding: '10px 24px',
            borderRadius: '3px',
            fontWeight: 600,
            fontFamily: 'Work Sans, sans-serif',
            fontSize: '14px',
            cursor: 'pointer',
          }}
        >
          Tekrar Deneyin
        </button>
      </div>
    </div>
  );
}