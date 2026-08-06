import styles from './page.module.css';

export default function Loading() {
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div style={{ textAlign: 'center', color: '#C9BC9C', padding: '60px 0', fontFamily: 'IBM Plex Mono, monospace' }}>
          Lezzetler yükleniyor...
        </div>
      </div>
    </div>
  );
}