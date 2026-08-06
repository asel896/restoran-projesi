'use client';

import styles from './StatCard.module.css';

interface StatCardProps {
  title: string;
  value: string;
  color?: string;
}

export default function StatCard({ title, value, color }: StatCardProps) {
  return (
    <div className={styles.card}>
      <p className={styles.title}>{title}</p>
      <h3 className={styles.value} style={color ? { color } : undefined}>{value}</h3>
    </div>
  );
}