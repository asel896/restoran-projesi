'use client';

import styles from './RestaurantHero.module.css';

export default function RestaurantHero() {
  return (
    <div className={styles.hero}>
      <h1 className={styles.title}>🍽️ Lezzet Rotası Restoranına Hoş Geldiniz</h1>
      <p className={styles.description}>
        En taze yemekleri keşfedin, masanızdan garson çağırın veya hızlıca rezervasyon yapın.
      </p>
      <div className={styles.buttonContainer}>
        <a href="#menu" className={styles.primaryButton}>
          Menüyü İncele
        </a>
      </div>
    </div>
  );
}