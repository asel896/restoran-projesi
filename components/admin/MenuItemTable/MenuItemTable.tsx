import { Trash2 } from 'lucide-react';
import styles from './MenuItemTable.module.css';

interface Item {
  id: number | string;
  name: string;
  category: string;
  price: number;
}

interface MenuItemTableProps {
  items: Item[];
  onDelete: (id: number | string) => void;
}

export default function MenuItemTable({ items, onDelete }: MenuItemTableProps) {
  return (
    <div className={styles.menuCard}>
      <div className={styles.menuStrip}>
        <span className={styles.eyebrow}>Menü — {items.length} Ürün</span>
      </div>

      {items.length === 0 ? (
        <div className={styles.emptyRow}>Menüde henüz ürün yok.</div>
      ) : (
        items.map((item) => (
          <div className={styles.menuRow} key={item.id}>
            <span className={styles.itemName}>{item.name}</span>
            <span className={styles.catTag}>{item.category}</span>
            <span className={styles.price}>₺{item.price}</span>
            <button
              className={styles.delBtn}
              onClick={() => onDelete(item.id)}
              aria-label={`${item.name} ürününü sil`}
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))
      )}
    </div>
  );
}