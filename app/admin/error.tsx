'use client';

import { useEffect } from 'react';

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Admin Panelinde Hata Yakalandı:', error);
  }, [error]);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '70vh',
      textAlign: 'center',
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: '#fef2f2',
        border: '1px solid #fecaca',
        borderRadius: '12px',
        padding: '40px',
        maxWidth: '500px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
      }}>
        <h2 style={{ color: '#dc2626', marginTop: 0 }}>Bir Şeyler Ters Gitti!</h2>
        <p style={{ color: '#4b5563', fontSize: '14px', marginBottom: '24px' }}>
          Admin panelinde yükleme sırasında beklenmeyen bir hata oluştu. Sayfayı yenilemeyi veya işlemi tekrar denemeyi deneyebilirsiniz.
        </p>
        <button
          onClick={() => reset()}
          style={{
            backgroundColor: '#0284c7',
            color: '#fff',
            border: 'none',
            padding: '10px 24px',
            borderRadius: '6px',
            fontWeight: 'bold',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          Tekrar Dene
        </button>
      </div>
    </div>
  );
}