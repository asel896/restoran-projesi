import { useState } from 'react';
import styles from './KitchenDashboard.module.css';
import { StockItem } from './KitchenDashboard';

interface StockTabProps {
  stocks: StockItem[];
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  onUpdateStock: (id: number, amount: number) => void;
  onDeleteStock: (id: number) => void;
  onAddStock: (newItem: Omit<StockItem, 'id'>) => void;
}

export default function StockTab({
  stocks,
  categories,
  selectedCategory,
  onSelectCategory,
  onUpdateStock,
  onDeleteStock,
  onAddStock,
}: StockTabProps) {
  const [isStockModalOpen, setIsStockModalOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newCategory, setNewCategory] = useState('Etler');
  const [newQuantity, setNewQuantity] = useState('');
  const [newUnit, setNewUnit] = useState('kg');
  const [newCritical, setNewCritical] = useState('');

  const filteredStocks = selectedCategory === 'Tümü' 
    ? stocks 
    : stocks.filter((s) => s.category === selectedCategory);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newQuantity) return;

    onAddStock({
      name: newName,
      category: newCategory,
      quantity: Number(newQuantity),
      unit: newUnit,
      criticalLevel: newCritical ? Number(newCritical) : 5,
    });

    setIsStockModalOpen(false);
    setNewName('');
    setNewQuantity('');
    setNewCritical('');
  };

  return (
    <>
      <div className={styles.contentHeader}>
        <div>
          <h1 className={styles.title}>📦 Mutfak Stok ve Malzeme Takibi</h1>
          <p style={{ fontSize: '13px', color: 'var(--kagit-dim, #C9BC9C)', marginTop: '4px' }}>
            Siparişler onaylandığında tanımlı reçetelere göre stoktan otomatik düşer.
          </p>
        </div>
        <button 
          onClick={() => setIsStockModalOpen(true)}
          className={styles.addStockButton}
        >
          + Yeni Malzeme Ekle
        </button>
      </div>

      <div className={styles.categoryFilterContainer}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onSelectCategory(cat)}
            className={selectedCategory === cat ? styles.categoryBtnActive : styles.categoryBtn}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className={styles.grid}>
        {filteredStocks.map((stock) => {
          const isCritical = stock.quantity <= stock.criticalLevel;

          return (
            <div key={stock.id} className={styles.orderCard}>
              <div className={styles.cardHeader}>
                <div>
                  <span className={styles.tableNo}>{stock.name}</span>
                  <div className={styles.categoryTag}>{stock.category}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className={isCritical ? styles.criticalBadge : styles.normalBadge}>
                    {isCritical ? '⚠️ Kritik' : '✅ Yeterli'}
                  </span>
                  <button 
                    onClick={() => onDeleteStock(stock.id)}
                    className={styles.deleteIconBtn}
                    title="Malzemeyi Sil"
                  >
                    🗑️
                  </button>
                </div>
              </div>

              <div className={styles.cardBody} style={{ textAlign: 'center', padding: '20px 16px' }}>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: 'var(--bakir, #B9863F)', fontFamily: 'IBM Plex Mono, monospace' }}>
                  {stock.quantity} {stock.unit}
                </div>
                <div style={{ fontSize: '13px', color: 'var(--kagit-dim, #C9BC9C)', marginTop: '6px' }}>
                  Kritik Eşik: {stock.criticalLevel} {stock.unit}
                </div>
              </div>

              <div className={styles.cardFooter} style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => onUpdateStock(stock.id, -1)}
                  className={styles.stockDecreaseBtn}
                >
                  - Azalt
                </button>
                <button
                  onClick={() => onUpdateStock(stock.id, 5)}
                  className={styles.stockIncreaseBtn}
                >
                  + 5 Ekle
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {isStockModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2 className={styles.modalTitle}>Yeni Stok Malzemesi Ekle</h2>
            <form onSubmit={handleSubmit} className={styles.modalForm}>
              <div className={styles.formGroup}>
                <label>Malzeme Adı</label>
                <input 
                  type="text" 
                  value={newName} 
                  onChange={(e) => setNewName(e.target.value)} 
                  placeholder="Örn: Salatalık" 
                  required 
                  className={styles.formInput}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Kategori</label>
                <select 
                  value={newCategory} 
                  onChange={(e) => setNewCategory(e.target.value)}
                  className={styles.formSelect}
                >
                  {categories.filter(c => c !== 'Tümü').map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Başlangıç Miktarı</label>
                  <input 
                    type="number" 
                    step="any"
                    value={newQuantity} 
                    onChange={(e) => setNewQuantity(e.target.value)} 
                    placeholder="50" 
                    required 
                    className={styles.formInput}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Birim</label>
                  <select 
                    value={newUnit} 
                    onChange={(e) => setNewUnit(e.target.value)}
                    className={styles.formSelect}
                  >
                    <option value="kg">kg</option>
                    <option value="adet">adet</option>
                    <option value="paket">paket</option>
                    <option value="litre">litre</option>
                  </select>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>Kritik Eşik Seviyesi</label>
                <input 
                  type="number" 
                  value={newCritical} 
                  onChange={(e) => setNewCritical(e.target.value)} 
                  placeholder="5" 
                  className={styles.formInput}
                />
              </div>

              <div className={styles.modalActions}>
                <button 
                  type="button" 
                  onClick={() => setIsStockModalOpen(false)}
                  className={styles.modalCancelBtn}
                >
                  İptal
                </button>
                <button type="submit" className={styles.modalSubmitBtn}>
                  Kaydet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}