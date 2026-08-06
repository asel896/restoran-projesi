import styles from './page.module.css';

export default function Loading() {
  return (
    <div className={styles.container}>
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '14px',
        }}
      >
        <div
          style={{
            width: '36px',
            height: '36px',
            border: '3px solid var(--hairline, #3A3226)',
            borderTop: '3px solid var(--kor, #C43E1C)',
            borderRadius: '50%',
            animation: 'kor-spin 0.9s linear infinite',
          }}
        />
        <p
          style={{
            color: 'var(--kagit-dim, #C9BC9C)',
            fontFamily: 'IBM Plex Mono, monospace',
            fontSize: '13px',
            margin: 0,
            letterSpacing: '0.02em',
          }}
        >
          Menü Yükleniyor...
        </p>
      </div>

      <style>{`
        @keyframes kor-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}