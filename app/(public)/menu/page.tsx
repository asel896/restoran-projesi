'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import MenuFilterBar from '@/components/public/MenuFilterBar/MenuFilterBar';
import MenuCard from '@/components/public/MenuCard/MenuCard';
import styles from './page.module.css';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl?: string;
  weight?: string;
}

export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState('Tümü');
  const [searchTerm, setSearchTerm] = useState('');

  // Hero alanı için kayan stok fotoğraflar (Ocakbaşı ve mekan atmosferi)
  const heroImages = [
    'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=1200&q=80',
  ];
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);

  // Her 4 saniyede bir hero görselini otomatik kaydır
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  const menuList: MenuItem[] = [
    { 
      id: 1, 
      name: 'Adana Kebap', 
      description: 'Özel baharatlı zırh kıyması, közlenmiş biber ve domates ile', 
      price: 220, 
      category: 'Ana Yemekler', 
      imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80', 
      weight: '250g' 
    },
    { 
      id: 2, 
      name: 'Urfa Kebap', 
      description: 'Acısız zırh kıyması, lavaş ve garnitür ile', 
      price: 210, 
      category: 'Ana Yemekler', 
      imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80', 
      weight: '250g' 
    },
    { 
      id: 3, 
      name: 'Tavuk Şiş', 
      description: 'Özel marine edilmiş tavuk göğsü parçaları', 
      price: 180, 
      category: 'Ana Yemekler', 
      imageUrl: 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&w=600&q=80', 
      weight: '220g' 
    },
    { 
      id: 4, 
      name: 'Lahmacun', 
      description: 'Geleneksel çıtır lahmacun', 
      price: 80, 
      category: 'Ana Yemekler', 
      imageUrl: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=600&q=80', 
      weight: '1 Adet' 
    },
    { 
      id: 5, 
      name: 'Mercimek Çorbası', 
      description: 'Tereyağlı kıtır ekmek ile', 
      price: 70, 
      category: 'Çorbalar', 
      imageUrl: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=600&q=80', 
      weight: '300ml' 
    },
    { 
      id: 6, 
      name: 'Gavurdağı Salatası', 
      description: 'Cevizli, nar ekşili özel domates salatası', 
      price: 90, 
      category: 'Salatalar', 
      imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80', 
      weight: '200g' 
    },
    { 
      id: 7, 
      name: 'Kola', 
      description: '330ml Soğuk Kutulama', 
      price: 40, 
      category: 'İçecekler', 
      imageUrl: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80', 
      weight: '330ml' 
    },
    { 
      id: 8, 
      name: 'Ayran', 
      description: 'Yayık ayranı', 
      price: 25, 
      category: 'İçecekler', 
      imageUrl: 'https://images.unsplash.com/photo-1541658016709-82535e94bc69?auto=format&fit=crop&w=600&q=80', 
      weight: '250ml' 
    },
    { 
      id: 9, 
      name: 'Künefe', 
      description: 'Antep fıstıklı sıcak künefe', 
      price: 110, 
      category: 'Tatlılar', 
      imageUrl: 'https://images.unsplash.com/photo-1579372786545-d24232daf58c?auto=format&fit=crop&w=600&q=80', 
      weight: '180g' 
    },
  ];

  const categories = ['Tümü', 'Ana Yemekler', 'Çorbalar', 'Salatalar', 'İçecekler', 'Tatlılar'];

  const filteredMenu = menuList.filter((item) => {
    const matchesCategory = selectedCategory === 'Tümü' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.brandTitle}>Kor Ocakbaşı</h1>
        <span className={styles.eyebrowBadge}>Menü</span>
      </header>

      <main className={styles.main}>
        {/* Kayan Mekan / Hero Alanı */}
        <div className={styles.heroSlider}>
          {heroImages.map((img, index) => (
            <div
              key={index}
              className={`${styles.heroSlide} ${index === currentHeroIndex ? styles.heroSlideActive : ''}`}
              style={{ backgroundImage: `url(${img})` }}
            />
          ))}
          <div className={styles.heroOverlay}>
            <div className={styles.heroContent}>
              <h2 className={styles.heroTitle}>Geleneksel Ateşin Lezzeti</h2>
              <p className={styles.heroSubtitle}>Kor ateşinde pişen eşsiz ocakbaşı lezzetleriyle tanışın.</p>
            </div>
            <div className={styles.heroDots}>
              {heroImages.map((_, index) => (
                <button
                  key={index}
                  className={`${styles.heroDot} ${index === currentHeroIndex ? styles.heroDotActive : ''}`}
                  onClick={() => setCurrentHeroIndex(index)}
                  aria-label={`Slayt ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        <MenuFilterBar
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        <div className={styles.menuList}>
          {filteredMenu.length === 0 ? (
            <p className={styles.emptyState}>
              Aradığınız lezzet bulunamadı.
            </p>
          ) : (
            filteredMenu.map((item) => (
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