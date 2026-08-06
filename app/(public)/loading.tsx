import styles from './page.module.css';

export default function Loading() {
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <p
          style={{
            textAlign: 'center',
            color: '#C9BC9C',
            padding: '60px 0',
            fontFamily: 'IBM Plex Mono, monospace',
            fontSize: '13px',
          }}
        >
          Rezervasyon formu hazırlanıyor...
        </p>
      </div>
    </div>
  );
}