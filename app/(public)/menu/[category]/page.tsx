import Link from 'next/link';
import MenuCard from '@/components/public/MenuCard/MenuCard';
import styles from './page.module.css';

interface PageProps {
  params: {
    category: string;
  };
}

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl?: string;
  weight?: string;
}

export default async function CategoryPage({ params }: PageProps) {
  const decodedCategory = decodeURIComponent(params.category);

  const menuList: MenuItem[] = [
    { id: 1, name: 'Adana Kebap', description: 'Özel baharatlı zırh kıyması', price: 220, category: 'Ana Yemekler', imageUrl: '/menu-images/adana-kebap.jpg', weight: '250g' },
    { id: 2, name: 'Mercimek Çorbası', description: 'Tereyağlı kıtır ekmek ile', price: 70, category: 'Çorbalar', imageUrl: '/menu-images/mercimek-corbasi.jpg', weight: '300ml' },
  ];

  const filteredItems = menuList.filter(
    (item) => item.category.toLowerCase() === decodedCategory.toLowerCase()
  );

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1
          style={{
            marginBottom: '20px',
            fontSize: '22px',
            fontFamily: 'Fraunces, serif',
            fontWeight: 700,
            color: 'var(--kagit, #F3E9D2)',
          }}
        >
          {decodedCategory}
        </h1>

        <div className={styles.menuList}>
          {filteredItems.length === 0 ? (
            <p className={styles.emptyState}>
              Bu kategoride henüz ürün bulunmuyor.
            </p>
          ) : (
            filteredItems.map((item) => (
              <MenuCard key={item.id} item={item} />
            ))
          )}
        </div>

        <Link href="/reservation" className={styles.reservationCta}>
          <span className={styles.reservationCtaLabel}>Masa Rezervasyonu</span>
          <span className={styles.reservationCtaArrow}>→</span>
        </Link>
      </main>
    </div>
  );
}