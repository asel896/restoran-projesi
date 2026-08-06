import { useState } from 'react';
import styles from './KitchenDashboard.module.css';
import { StockItem } from './KitchenDashboard';

interface CountTabProps {
  stocks: StockItem[];
  onSaveCounts: (countInputs: Record<number, string>) => void;
}

export default function CountTab({ stocks, onSaveCounts }: CountTabProps) {
  const [countInputs, setCountInputs] = useState<Record<number, string>>({});

  const handleConfirm = () => {
    onSaveCounts(countInputs);
    setCountInputs({});
  };

  return (
    <>
      <div className={styles.contentHeader}>
        <div>
          <h1 className={styles.title}>📋 Gün Sonu Fiziki Sayım</h1>
          <p style={{ fontSize: '13px', color: 'var(--kagit-dim, #C9BC9C)', marginTop: '4px' }}>
            Dolap sayımı yaptıktan sonra gerçek miktarları girerek sistemle eşitleyebilirsiniz.
          </p>
        </div>
        <button onClick={handleConfirm} className={styles.addStockButton}>
          Sayımı Onayla ve Güncelle 💾
        </button>
      </div>

      <div className={styles.grid}>
        {stocks.map((stock) => {
          const currentInput = countInputs[stock.id] ?? '';
          const diff = currentInput !== '' ? Number(currentInput) - stock.quantity : 0;

          return (
            <div key={stock.id} className={styles.orderCard}>
              <div className={styles.cardHeader}>
                <div>
                  <span className={styles.tableNo}>{stock.name}</span>
                  <div className={styles.categoryTag}>{stock.category}</div>
                </div>
                <span className={styles.normalBadge}>Sistem: {stock.quantity} {stock.unit}</span>
              </div>

              <div className={styles.cardBody} style={{ padding: '20px 16px' }}>
                <div style={{ fontSize: '13px', color: 'var(--kagit-dim, #C9BC9C)', marginBottom: '8px' }}>
                  Fiziki Sayılan Miktar ({stock.unit}):
                </div>
                <input
                  type="number"
                  step="any"
                  placeholder={`Örn: ${stock.quantity}`}
                  value={currentInput}
                  onChange={(e) =>
                    setCountInputs({ ...countInputs, [stock.id]: e.target.value })
                  }
                  className={styles.formInput}
                  style={{ fontSize: '18px', fontFamily: 'IBM Plex Mono, monospace' }}
                />
                {currentInput !== '' && (
                  <div style={{ fontSize: '12px', marginTop: '8px', color: diff < 0 ? 'var(--kor-red, #ef4444)' : 'var(--success, #6C7F44)' }}>
                    {diff < 0 ? `⚠️ Kayıp/Fire: ${diff} ${stock.unit}` : diff > 0 ? `📈 Fazla: +${diff} ${stock.unit}` : '✅ Sistemle Eşit'}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}