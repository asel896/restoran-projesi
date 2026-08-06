'use client';

import styles from './CallWaiterButton.module.css';

interface CallWaiterButtonProps {
  onCall: (type: 'WAITER' | 'BILL') => void;
}

export default function CallWaiterButton({ onCall }: CallWaiterButtonProps) {
  return (
    <div className={styles.footerBar}>
      <button
        onClick={() => onCall('WAITER')}
        className={styles.waiterButton}
      >
        🔔 Garson Çağır
      </button>

      <button
        onClick={() => onCall('BILL')}
        className={styles.billButton}
      >
        💰 Hesap İste
      </button>
    </div>
  );
}