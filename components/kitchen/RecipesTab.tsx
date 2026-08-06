import { useState } from 'react';
import styles from './KitchenDashboard.module.css';
import { StockItem, RecipesMap, RecipeItem } from './KitchenDashboard';

interface RecipesTabProps {
  stocks: StockItem[];
  recipes: RecipesMap;
  menuDishes: string[];
  onSaveRecipe: (dishName: string, items: RecipeItem[]) => void;
  onDeleteRecipe: (dishName: string) => void;
}

export default function RecipesTab({
  stocks,
  recipes,
  menuDishes,
  onSaveRecipe,
  onDeleteRecipe,
}: RecipesTabProps) {
  const [dishInputMode, setDishInputMode] = useState<'select' | 'custom'>('select');
  const [selectedRecipeDish, setSelectedRecipeDish] = useState<string>(menuDishes[0] || '');
  const [customDishName, setCustomDishName] = useState<string>('');
  const [recipeFormItems, setRecipeFormItems] = useState<{ materialId: number; amount: string }[]>([
    { materialId: stocks[0]?.id || 1, amount: '' }
  ]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const dishName = dishInputMode === 'select' ? selectedRecipeDish : customDishName.trim();
    
    if (!dishName) {
      alert('Lütfen yemek adını belirtin!');
      return;
    }

    const formattedItems: RecipeItem[] = recipeFormItems
      .filter((item) => item.amount !== '' && Number(item.amount) > 0)
      .map((item) => ({
        materialId: Number(item.materialId),
        amountPerPortion: Number(item.amount),
      }));

    if (formattedItems.length === 0) {
      alert('Lütfen en az bir geçerli malzeme ve miktar ekleyin.');
      return;
    }

    onSaveRecipe(dishName, formattedItems);

    if (dishInputMode === 'custom') {
      setCustomDishName('');
      setDishInputMode('select');
      setSelectedRecipeDish(dishName);
    }

    alert(`"${dishName}" reçetesi başarıyla kaydedildi!`);
  };

  const handleEditClick = (dishName: string) => {
    setDishInputMode('select');
    setSelectedRecipeDish(dishName);
    const existing = recipes[dishName] || [];
    setRecipeFormItems(
      existing.length > 0
        ? existing.map((i) => ({ materialId: i.materialId, amount: String(i.amountPerPortion) }))
        : [{ materialId: stocks[0]?.id || 1, amount: '' }]
    );
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addRow = () => {
    if (stocks.length === 0) return;
    setRecipeFormItems([...recipeFormItems, { materialId: stocks[0].id, amount: '' }]);
  };

  return (
    <>
      <div className={styles.contentHeader}>
        <div>
          <h1 className={styles.title}>📝 Menü Reçete Yönetimi</h1>
          <p style={{ fontSize: '13px', color: 'var(--kagit-dim, #C9BC9C)', marginTop: '4px' }}>
            Yemeklerin 1 porsiyonu için gereken malzemeleri tanımlayın ve mevcut reçeteleri güncelleyin.
          </p>
        </div>
      </div>

      <div className={styles.orderCard} style={{ maxWidth: '750px', margin: '0 auto 32px auto', padding: '24px' }}>
        <h3 style={{ fontSize: '16px', color: 'var(--bakir, #B9863F)', marginBottom: '16px', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '8px' }}>
          ✨ Reçete Ekle / Güncelle
        </h3>

        <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
          <button
            type="button"
            onClick={() => setDishInputMode('select')}
            className={dishInputMode === 'select' ? styles.categoryBtnActive : styles.categoryBtn}
          >
            Mevcut Yemeklerden Seç
          </button>
          <button
            type="button"
            onClick={() => setDishInputMode('custom')}
            className={dishInputMode === 'custom' ? styles.categoryBtnActive : styles.categoryBtn}
          >
            + Yeni Yemek Adı Yaz
          </button>
        </div>

        <form onSubmit={handleFormSubmit}>
          {dishInputMode === 'select' ? (
            <div className={styles.formGroup} style={{ marginBottom: '20px' }}>
              <label style={{ fontSize: '14px', fontWeight: 'bold', color: 'var(--kagit, #F3E9D2)' }}>
                Yemek Seçimi:
              </label>
              <select
                value={selectedRecipeDish}
                onChange={(e) => {
                  const dish = e.target.value;
                  setSelectedRecipeDish(dish);
                  const existing = recipes[dish] || [];
                  setRecipeFormItems(
                    existing.length > 0
                      ? existing.map((i) => ({ materialId: i.materialId, amount: String(i.amountPerPortion) }))
                      : [{ materialId: stocks[0]?.id || 1, amount: '' }]
                  );
                }}
                className={styles.formSelect}
                style={{ marginTop: '8px' }}
              >
                {menuDishes.map((dish) => (
                  <option key={dish} value={dish}>{dish} {recipes[dish] ? '✔️ (Tanımlı)' : ''}</option>
                ))}
                {Object.keys(recipes).filter(d => !menuDishes.includes(d)).map((customDish) => (
                  <option key={customDish} value={customDish}>{customDish} ✔️ (Özel)</option>
                ))}
              </select>
            </div>
          ) : (
            <div className={styles.formGroup} style={{ marginBottom: '20px' }}>
              <label style={{ fontSize: '14px', fontWeight: 'bold', color: 'var(--kagit, #F3E9D2)' }}>
                Yeni Yemek Adı:
              </label>
              <input
                type="text"
                placeholder="Örn: Çoban Salatası..."
                value={customDishName}
                onChange={(e) => setCustomDishName(e.target.value)}
                required
                className={styles.formInput}
                style={{ marginTop: '8px' }}
              />
            </div>
          )}

          <h4 style={{ fontSize: '14px', color: 'var(--kagit, #F3E9D2)', marginBottom: '12px' }}>
            1 Porsiyon İçin Gidecek Malzemeler:
          </h4>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
            {recipeFormItems.map((item, index) => {
              const matchedStock = stocks.find((s) => s.id === item.materialId);

              return (
                <div key={index} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <select
                    value={item.materialId}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setRecipeFormItems(
                        recipeFormItems.map((ri, i) => (i === index ? { ...ri, materialId: val } : ri))
                      );
                    }}
                    className={styles.formSelect}
                    style={{ flex: 2 }}
                  >
                    {stocks.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name} ({s.unit})
                      </option>
                    ))}
                  </select>

                  <input
                    type="number"
                    step="any"
                    placeholder="Miktar"
                    value={item.amount}
                    onChange={(e) => {
                      const val = e.target.value;
                      setRecipeFormItems(
                        recipeFormItems.map((ri, i) => (i === index ? { ...ri, amount: val } : ri))
                      );
                    }}
                    required
                    className={styles.formInput}
                    style={{ flex: 1 }}
                  />

                  <span style={{ fontSize: '13px', fontWeight: 'bold', color: 'var(--bakir, #B9863F)', minWidth: '50px' }}>
                    {matchedStock ? matchedStock.unit : ''}
                  </span>

                  <button
                    type="button"
                    onClick={() => {
                      setRecipeFormItems(recipeFormItems.filter((_, i) => i !== index));
                    }}
                    style={{ background: 'transparent', border: 'none', color: 'var(--kor-red, #ef4444)', cursor: 'pointer', fontSize: '16px' }}
                  >
                    ✕
                  </button>
                </div>
              );
            })}
          </div>

          <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
            <button
              type="button"
              onClick={addRow}
              className={styles.categoryBtn}
              style={{ width: '100%' }}
            >
              + Malzeme Satırı Ekle
            </button>
          </div>

          <button type="submit" className={styles.addStockButton} style={{ width: '100%', padding: '14px' }}>
            Reçeteyi Kaydet / Güncelle 💾
          </button>
        </form>
      </div>

      <div style={{ maxWidth: '750px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '18px', color: 'var(--bakir, #B9863F)', marginBottom: '16px' }}>
          📋 Tanımlı Tüm Reçeteler ({Object.keys(recipes).length})
        </h2>

        <div className={styles.grid} style={{ gridTemplateColumns: '1fr' }}>
          {Object.entries(recipes).map(([dishName, ingredients]) => (
            <div key={dishName} className={styles.orderCard} style={{ padding: '16px 20px' }}>
              <div className={styles.cardHeader} style={{ marginBottom: '12px' }}>
                <span className={styles.tableNo} style={{ fontSize: '16px' }}>🍲 {dishName}</span>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => handleEditClick(dishName)}
                    style={{ background: 'var(--bakir, #B9863F)', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px' }}
                  >
                    Düzenle ✏️
                  </button>
                  <button
                    onClick={() => onDeleteRecipe(dishName)}
                    style={{ background: 'rgba(239, 68, 68, 0.2)', color: 'var(--kor-red, #ef4444)', border: '1px solid rgba(239, 68, 68, 0.4)', padding: '6px 10px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px' }}
                  >
                    Sil 🗑️
                  </button>
                </div>
              </div>

              <div className={styles.cardBody} style={{ padding: '0' }}>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {ingredients.map((ing, idx) => {
                    const stockObj = stocks.find((s) => s.id === ing.materialId);
                    return (
                      <li key={idx} style={{ background: 'rgba(255,255,255,0.04)', padding: '6px 10px', borderRadius: '6px', fontSize: '13px', border: '1px solid rgba(255,255,255,0.06)' }}>
                        <strong style={{ color: 'var(--kagit, #F3E9D2)' }}>{stockObj ? stockObj.name : `Malzeme #${ing.materialId}`}</strong>: {ing.amountPerPortion} {stockObj?.unit || ''}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}