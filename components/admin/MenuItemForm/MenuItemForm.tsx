'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import styles from './MenuItemForm.module.css';

interface MenuItemFormProps {
  onAdd: (item: { name: string; category: string; price: number }) => void;
}

export default function MenuItemForm({ onAdd }: MenuItemFormProps) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Ana Yemekler');
  const [price, setPrice] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price) return;

    onAdd({ name, category, price: Number(price) });
    setName('');
    setPrice('');
  };

  return (
    <div className={styles.pad}>
      <h3 className={styles.padHead}>Sipariş Fişine Ekle</h3>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div>
          <label className={styles.fieldLabel}>Ürün Adı</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="ör. Lahmacun"
            className={styles.field}
            required
          />
        </div>

        <div>
          <label className={styles.fieldLabel}>Kategori</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={styles.field}
          >
            <option value="Ana Yemekler">Ana Yemekler</option>
            <option value="Çorbalar">Çorbalar</option>
            <option value="Salatalar">Salatalar</option>
            <option value="Tatlılar">Tatlılar</option>
            <option value="İçecekler">İçecekler</option>
          </select>
        </div>

        <div>
          <label className={styles.fieldLabel}>Fiyat (₺)</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="ör. 90"
            className={styles.field}
            required
          />
        </div>

        <button type="submit" className={styles.submitBtn}>
          <Plus size={16} />
          Menüye Ekle
        </button>
      </form>
    </div>
  );
}