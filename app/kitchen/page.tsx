import KitchenDashboard from '@/components/kitchen/KitchenDashboard';
import styles from './page.module.css';

export default function KitchenPage() {
  return (
    <main className={styles.pageContainer}>
      <KitchenDashboard />
    </main>
  );
}