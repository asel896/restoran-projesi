'use client';

import styles from './MenuFilterBar.module.css';

interface MenuFilterBarProps {
  categories?: string[]; // Opsiyonel hale getirdik
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

export default function MenuFilterBar({
  categories = [], // Eğer prop gelmezse patlamaması için boş dizi atadık
  selectedCategory,
  onSelectCategory,
  searchTerm,
  onSearchChange,
}: MenuFilterBarProps) {
  return (
    <>
      {/* Arama Çubuğu */}
      <input
        type="text"
        placeholder="🔍 Lezzetler arasında ara..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className={styles.searchInput}
      />

      {/* Kategoriler */}
      <div className={styles.categoriesContainer}>
        {categories.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`${styles.categoryButton} ${isActive ? styles.categoryButtonActive : ''}`}
            >
              {cat}
            </button>
          );
        })}
      </div>
    </>
  );
}