'use client';

import { useState } from 'react';
import MenuItemForm from '@/components/admin/MenuItemForm/MenuItemForm';
import MenuItemTable from '@/components/admin/MenuItemTable/MenuItemTable';
import styles from './page.module.css';

export default function MenuManagementPage() {
  const [menuItems, setMenuItems] = useState([
    { id: 1, name: 'Adana Kebap', category: 'Ana Yemekler', price: 220 },
    { id: 2, name: 'Mercimek Çorbası', category: 'Çorbalar', price: 70 },
    { id: 3, name: 'Künefe', category: 'Tatlılar', price: 110 },
    { id: 4, name: 'Ayran', category: 'İçecekler', price: 25 },
  ]);

  const handleAddItem = (newItemData: { name: string; category: string; price: number }) => {
    const newItem = { id: Date.now(), ...newItemData };
    setMenuItems([newItem, ...menuItems]);
  };

  const handleDeleteItem = (id: number | string) => {
    setMenuItems(menuItems.filter((item) => item.id !== id));
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.eyebrow}>Kor Ocakbaşı — Yönetim Paneli</span>
        <h2 className={styles.title}>
          Menü ve Ürün <span className={styles.titleHighlight}>Yönetimi</span>
        </h2>
      </div>
      <div className={styles.contentGrid}>
        <MenuItemForm onAdd={handleAddItem} />
        <MenuItemTable items={menuItems} onDelete={handleDeleteItem} />
      </div>
    </div>
  );
}