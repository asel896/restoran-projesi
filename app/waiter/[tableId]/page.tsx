'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import styles from './page.module.css';

interface OrderItem {
  id: string; // Notlu ürünler çakışmasın diye benzersiz ID
  name: string;
  price: number;
  quantity: number;
  note?: string; // Müşteri özel isteği
}

interface MenuItem {
  id: number;
  name: string;
  price: number;
  category: string;
}

export default function TableDetailPage() {
  const params = useParams();
  const router = useRouter();
  const tableId = params.tableId as string;

  // Tüm Restoran Menüsü
  const menuList: MenuItem[] = [
    { id: 1, name: 'Adana Kebap', price: 220, category: 'Ana Yemekler' },
    { id: 2, name: 'Urfa Kebap', price: 210, category: 'Ana Yemekler' },
    { id: 3, name: 'Tavuk Şiş', price: 180, category: 'Ana Yemekler' },
    { id: 4, name: 'Lahmacun', price: 80, category: 'Ana Yemekler' },
    { id: 5, name: 'Mercimek Çorbası', price: 70, category: 'Çorbalar' },
    { id: 6, name: 'Ezogelin Çorbası', price: 70, category: 'Çorbalar' },
    { id: 7, name: 'Gavurdağı Salatası', price: 90, category: 'Salatalar' },
    { id: 8, name: 'Çoban Salata', price: 75, category: 'Salatalar' },
    { id: 9, name: 'Kola', price: 40, category: 'İçecekler' },
    { id: 10, name: 'Ayran', price: 25, category: 'İçecekler' },
    { id: 11, name: 'Şalgam Suyu', price: 30, category: 'İçecekler' },
    { id: 12, name: 'Künefe', price: 110, category: 'Tatlılar' },
    { id: 13, name: 'Baklava (3 Dilim)', price: 140, category: 'Tatlılar' },
  ];

  const categories = ['Tümü', 'Ana Yemekler', 'Çorbalar', 'Salatalar', 'İçecekler', 'Tatlılar'];
  const [selectedCategory, setSelectedCategory] = useState('Tümü');
  const [searchTerm, setSearchTerm] = useState('');

  // Not Ekleme Pop-up State'i
  const [selectedProduct, setSelectedProduct] = useState<MenuItem | null>(null);
  const [customerNote, setCustomerNote] = useState('');

  // Mevcut Adisyon Kalemleri
  const [items, setItems] = useState<OrderItem[]>([
    { id: '1-1', name: 'Adana Kebap', price: 220, quantity: 2, note: 'Acılı olsun' },
    { id: '10-2', name: 'Ayran', price: 25, quantity: 2, note: 'Bol köpüklü' },
  ]);

  // Kategori ve Arama Filtresi Uygulama
  const filteredMenu = menuList.filter((item) => {
    const matchesCategory = selectedCategory === 'Tümü' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Müşteri İsteğiyle Ürün Ekleme
  const handleConfirmAdd = () => {
    if (!selectedProduct) return;

    const newItem: OrderItem = {
      id: `${selectedProduct.id}-${Date.now()}`,
      name: selectedProduct.name,
      price: selectedProduct.price,
      quantity: 1,
      note: customerNote.trim() ? customerNote : undefined,
    };

    setItems((prev) => [...prev, newItem]);
    setSelectedProduct(null);
    setCustomerNote('');
  };

  const updateQuantity = (id: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, quantity: i.quantity + delta } : i))
        .filter((i) => i.quantity > 0)
    );
  };

  const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCloseBill = () => {
    if (confirm(`Masa #${tableId} hesabını (₺${totalAmount}) kapatmak istediğinize emin misiniz?`)) {
      alert('Hesap kapatıldı, masa boşaltıldı.');
      router.push('/waiter');
    }
  };

  return (
    <div className={styles.container}>
      {/* Üst Bar: Geri Butonu ve Başlık */}
      <div className={styles.topBar}>
        <button
          onClick={() => router.push('/waiter')}
          className={styles.backBtn}
        >
          ← Masalara Dön
        </button>
        <h1 className={styles.pageTitle}>
          Masa {tableId} Sipariş & Adisyon Detayı
        </h1>
      </div>

      <div className={styles.mainGrid}>
        
        {/* SOL ALAN: KATEGORİLİ MENÜ SEÇİMİ VE ARAMA */}
        <div className={styles.menuSection}>
          
          {/* Arama Çubuğu */}
          <input
            type="text"
            placeholder="🔍 Menüde hızlı ürün ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />

          {/* Kategori Filtre Butonları */}
          <div className={styles.categoryContainer}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`${styles.categoryBtn} ${selectedCategory === cat ? styles.categoryBtnActive : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Ürün Listesi Izgarası */}
          <div className={styles.productGrid}>
            {filteredMenu.length === 0 ? (
              <div className={styles.emptyMenu}>
                Aradığınız kriterlere uygun ürün bulunamadı.
              </div>
            ) : (
              filteredMenu.map((prod) => (
                <div
                  key={prod.id}
                  onClick={() => setSelectedProduct(prod)}
                  className={styles.productCard}
                >
                  <div className={styles.productName}>{prod.name}</div>
                  <div className={styles.productFooter}>
                    <span className={styles.productPrice}>₺{prod.price}</span>
                    <span className={styles.addProductBadge}>+ Ekle</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* SAĞ ALAN: MEVCUT ADİSYON & NOTLAR & HESAP */}
        <div className={styles.rightColumn}>
          <div className={styles.billBox}>
            <h2 className={styles.billTitle}>
              Masa Adisyonu ({items.length} Kalem)
            </h2>

            {items.length === 0 ? (
              <p className={styles.emptyBill}>
                Adisyon boş. Soldan ürün seçerek ekleyebilirsiniz.
              </p>
            ) : (
              <div className={styles.billItemList}>
                {items.map((item) => (
                  <div
                    key={item.id}
                    className={styles.billItemCard}
                  >
                    <div className={styles.billItemRow}>
                      <div>
                        <div className={styles.billItemName}>{item.name}</div>
                        {/* Müşteri Notu */}
                        {item.note && (
                          <div className={styles.billItemNote}>
                            ✏️ "{item.note}"
                          </div>
                        )}
                        <div className={styles.billItemCalculation}>
                          ₺{item.price} x {item.quantity} = <strong className={styles.billItemTotal}>₺{item.price * item.quantity}</strong>
                        </div>
                      </div>

                      {/* Adet Artır / Azalt */}
                      <div className={styles.qtyControls}>
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className={styles.qtyBtn}
                        >
                          -
                        </button>
                        <span className={styles.qtyValue}>{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className={styles.qtyBtn}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Toplam Tutar Özeti */}
            <div className={styles.totalSummary}>
              <span className={styles.totalLabel}>Toplam Tutar:</span>
              <span className={styles.totalValue}>₺{totalAmount}</span>
            </div>
          </div>

          <button
            onClick={handleCloseBill}
            disabled={items.length === 0}
            className={styles.closeBillBtn}
          >
            💰 Hesabı Kapat / Ödeme Al
          </button>
        </div>
      </div>

      {/* MÜŞTERİ İSTEĞİ / NOT EKLEME POP-UP (MODAL) */}
      {selectedProduct && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalBox}>
            <h3 className={styles.modalTitle}>{selectedProduct.name} Ekle</h3>
            <p className={styles.modalPrice}>Birim Fiyat: ₺{selectedProduct.price}</p>

            <label className={styles.modalLabel}>
              Müşteri İsteği / Özel Not (İsteğe Bağlı):
            </label>
            <input
              type="text"
              autoFocus
              placeholder="Örn: Acısız, soğansız, bol buzlu..."
              value={customerNote}
              onChange={(e) => setCustomerNote(e.target.value)}
              className={styles.modalInput}
            />

            <div className={styles.modalActions}>
              <button
                onClick={() => { setSelectedProduct(null); setCustomerNote(''); }}
                className={styles.modalCancelBtn}
              >
                İptal
              </button>
              <button
                onClick={handleConfirmAdd}
                className={styles.modalConfirmBtn}
              >
                Adisyona Ekle
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}