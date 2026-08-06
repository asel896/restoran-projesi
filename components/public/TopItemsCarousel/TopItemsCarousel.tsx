'use client';

import styles from './TopItemsCarousel.module.css';

export default function TopItemsCarousel() {
  const topItems = ['Adana Kebap', 'Künefe', 'Mercimek Çorbası'];

  return (
    <div className={styles.carouselContainer}>
      <h3 className={styles.title}>🔥 En Çok Tercih Edilenler</h3>
      <div className={styles.itemsScroll}>
        {topItems.map((item, index) => (
          <div key={index} className={styles.itemCard}>
            ⭐ {item}
          </div>
        ))}
      </div>
    </div>
  );
}