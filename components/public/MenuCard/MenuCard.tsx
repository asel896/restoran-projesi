'use client';

import { useState } from 'react';
import styles from './MenuCard.module.css';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  /** public/ klasörüne göre yol, örn: "/menu-images/adana-kebap.jpg" */
  imageUrl?: string;
  /** Gramaj veya porsiyon bilgisi, örn: "250g", "330ml", "1 Adet" */
  weight?: string;
}

export default function MenuCard({ item }: { item: MenuItem }) {
  const [imageFailed, setImageFailed] = useState(false);
  const showImage = item.imageUrl && !imageFailed;

  return (
    <div className={styles.card}>
      <div className={styles.thumbnail}>
        {showImage ? (
          <img
            src={item.imageUrl}
            alt={item.name}
            className={styles.thumbnailImg}
            onError={() => setImageFailed(true)}
          />
        ) : (
          <span className={styles.thumbnailFallback} aria-hidden="true">🍽️</span>
        )}
      </div>

      <div className={styles.info}>
        <h3 className={styles.title}>{item.name}</h3>
        <p className={styles.description}>{item.description}</p>
        {item.weight && (
          <span className={styles.weight}>{item.weight}</span>
        )}
      </div>

      <div className={styles.price}>
        ₺{item.price}
      </div>
    </div>
  );
}