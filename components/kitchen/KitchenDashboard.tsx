'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './KitchenDashboard.module.css';
import OrdersTab from './OrdersTab';
import StockTab from './StockTab';
import RecipesTab from './RecipesTab';
import CountTab from './CountTab';

export interface OrderItem {
  id: number;
  name: string;
  quantity: number;
  note?: string;
}

export interface Order {
  id: number;
  tableNo: string;
  time: string;
  status: 'BEKLIYOR' | 'HAZIRLANIYOR' | 'HAZIR';
  items: OrderItem[];
}

export interface StockItem {
  id: number;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  criticalLevel: number;
}

export interface RecipeItem {
  materialId: number;
  amountPerPortion: number;
}

export type RecipesMap = Record<string, RecipeItem[]>;

export default function KitchenDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'orders' | 'stock' | 'recipes' | 'count'>('orders');
  
  // Hamburger menünün mobil cihazlarda açık/kapalı olma durumu
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [orders, setOrders] = useState<Order[]>([
    {
      id: 101,
      tableNo: 'Masa 4',
      time: '14:22',
      status: 'BEKLIYOR',
      items: [
        { id: 1, name: 'Adana Kebap', quantity: 2, note: 'Acısız olsun' },
        { id: 2, name: 'Mercimek Çorbası', quantity: 1 },
      ],
    },
    {
      id: 102,
      tableNo: 'Masa 2',
      time: '14:18',
      status: 'HAZIRLANIYOR',
      items: [{ id: 3, name: 'Künefe', quantity: 1, note: 'Bol fıstıklı' }],
    },
  ]);

  const [stocks, setStocks] = useState<StockItem[]>([
    { id: 1, name: 'Kıyma (KEBAP)', category: 'Etler', quantity: 12, unit: 'kg', criticalLevel: 5 },
    { id: 2, name: 'Mercimek', category: 'Kuru Gıda', quantity: 3, unit: 'kg', criticalLevel: 4 },
    { id: 3, name: 'Künefe Peyniri', category: 'Şarküteri', quantity: 2, unit: 'kg', criticalLevel: 3 },
    { id: 4, name: 'Lavaş Ekmeği', category: 'Unlu Mamuller', quantity: 80, unit: 'adet', criticalLevel: 20 },
    { id: 5, name: 'Domates', category: 'Sebzeler', quantity: 15, unit: 'kg', criticalLevel: 5 },
  ]);

  const [recipes, setRecipes] = useState<RecipesMap>({
    'Adana Kebap': [
      { materialId: 1, amountPerPortion: 0.18 },
      { materialId: 4, amountPerPortion: 2 },
      { materialId: 5, amountPerPortion: 0.15 },
    ],
    'Mercimek Çorbası': [
      { materialId: 2, amountPerPortion: 0.1 },
    ],
    'Künefe': [
      { materialId: 3, amountPerPortion: 0.12 },
    ],
  });

  const [selectedCategory, setSelectedCategory] = useState<string>('Tümü');
  const categories = ['Tümü', 'Etler', 'Sebzeler', 'Kuru Gıda', 'Şarküteri', 'Unlu Mamuller'];
  const menuDishes = ['Adana Kebap', 'Mercimek Çorbası', 'Künefe', 'Urfa Kebap', 'Tavuk Şiş'];

  const notifyWaiterKitchenReady = (tableNoString: string) => {
    const tableId = tableNoString.replace(/[^0-9]/g, '') || tableNoString;
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const existingNotifications = JSON.parse(localStorage.getItem('waiter_notifications') || '[]');
    
    if (existingNotifications.some((n: any) => n.tableId === tableId && n.type === 'KITCHEN_READY' && n.time === timeStr)) return;

    const newNotification = {
      id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      tableId,
      type: 'KITCHEN_READY',
      time: timeStr,
    };

    localStorage.setItem('waiter_notifications', JSON.stringify([newNotification, ...existingNotifications]));
    window.dispatchEvent(new Event('waiter-notification-updated'));
  };

  const deductStockForOrder = (orderItems: OrderItem[]) => {
    setStocks((prevStocks) => {
      let updatedStocks = [...prevStocks];
      orderItems.forEach((orderItem) => {
        const dishRecipe = recipes[orderItem.name];
        if (dishRecipe) {
          dishRecipe.forEach((ingredient) => {
            const totalDeduction = ingredient.amountPerPortion * orderItem.quantity;
            updatedStocks = updatedStocks.map((stock) => {
              if (stock.id === ingredient.materialId) {
                return { ...stock, quantity: Math.max(0, Number((stock.quantity - totalDeduction).toFixed(2))) };
              }
              return stock;
            });
          });
        }
      });
      return updatedStocks;
    });
  };

  const handleNextStatus = (orderId: number) => {
    const targetOrder = orders.find((o) => o.id === orderId);
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id === orderId) {
          if (order.status === 'BEKLIYOR') return { ...order, status: 'HAZIRLANIYOR' };
          if (order.status === 'HAZIRLANIYOR') {
            notifyWaiterKitchenReady(order.tableNo);
            return { ...order, status: 'HAZIR' };
          }
        }
        return order;
      })
    );
    if (targetOrder && targetOrder.status === 'BEKLIYOR') {
      deductStockForOrder(targetOrder.items);
    }
  };

  const handleCompleteOrder = (orderId: number) => {
    setOrders((prev) => prev.filter((order) => order.id !== orderId));
  };

  const handleUpdateStock = (id: number, amount: number) => {
    setStocks((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(0, Number((item.quantity + amount).toFixed(2))) } : item
      )
    );
  };

  const handleDeleteStock = (id: number) => {
    if (confirm('Bu malzemeyi stoktan silmek istediğinize emin misiniz?')) {
      setStocks((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const handleAddStock = (newItemData: Omit<StockItem, 'id'>) => {
    const newItem: StockItem = { id: Date.now(), ...newItemData };
    setStocks((prev) => [newItem, ...prev]);
  };

  const handleSaveRecipe = (dishName: string, items: RecipeItem[]) => {
    setRecipes((prev) => ({ ...prev, [dishName]: items }));
  };

  const handleDeleteRecipe = (dishName: string) => {
    if (confirm(`"${dishName}" reçetesini silmek istediğinize emin misiniz?`)) {
      setRecipes((prev) => {
        const copy = { ...prev };
        delete copy[dishName];
        return copy;
      });
    }
  };

  const handleSaveCounts = (countInputs: Record<number, string>) => {
    setStocks((prev) =>
      prev.map((stock) => {
        const enteredVal = countInputs[stock.id];
        if (enteredVal !== undefined && enteredVal !== '') {
          return { ...stock, quantity: Number(enteredVal) };
        }
        return stock;
      })
    );
    alert('Fiziki sayım kaydedildi ve stoklar güncellendi!');
  };

  const handleTabClick = (tab: 'orders' | 'stock' | 'recipes' | 'count') => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false); // Menüden bir sekmeye tıklandığında mobilde menüyü otomatik kapat
  };

  return (
    <div className={styles.container}>
      <header className={styles.navbar}>
        {/* Üst Satır: Marka ve Hamburger Buton (Mobilde yan yana görünür) */}
        <div className={styles.navTopRow}>
          <span className={styles.brand}>Kor Ocakbaşı</span>
          <button 
            className={styles.hamburgerBtn}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Menüyü Aç/Kapat"
          >
            {isMobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Açılıp kapanabilen veya masaüstünde sabit kalan alan */}
        <div className={`${styles.navCollapse} ${isMobileMenuOpen ? styles.navCollapseOpen : ''}`}>
          <div className={styles.navLeft}>
            <button 
              className={activeTab === 'orders' ? styles.navLinkActive : styles.navLink}
              onClick={() => handleTabClick('orders')}
            >
              Siparişler ({orders.length})
            </button>
            <button 
              className={activeTab === 'stock' ? styles.navLinkActive : styles.navLink}
              onClick={() => handleTabClick('stock')}
            >
              Stok Durumu 📦
            </button>
            <button 
              className={activeTab === 'recipes' ? styles.navLinkActive : styles.navLink}
              onClick={() => handleTabClick('recipes')}
            >
              Reçete Yönetimi 📝
            </button>
            <button 
              className={activeTab === 'count' ? styles.navLinkActive : styles.navLink}
              onClick={() => handleTabClick('count')}
            >
              Fiziki Sayım 📋
            </button>
          </div>
          <div className={styles.navRight}>
            <span className={styles.userProfile}>👤 Şef / Mutfak</span>
            <button 
              onClick={() => router.push('http://localhost:3000/login')} 
              className={styles.logoutButton}
            >
              Çıkış Yap
            </button>
          </div>
        </div>
      </header>

      {activeTab === 'orders' && (
        <OrdersTab 
          orders={orders} 
          onNextStatus={handleNextStatus} 
          onCompleteOrder={handleCompleteOrder} 
        />
      )}

      {activeTab === 'stock' && (
        <StockTab 
          stocks={stocks}
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          onUpdateStock={handleUpdateStock}
          onDeleteStock={handleDeleteStock}
          onAddStock={handleAddStock}
        />
      )}

      {activeTab === 'recipes' && (
        <RecipesTab 
          stocks={stocks}
          recipes={recipes}
          menuDishes={menuDishes}
          onSaveRecipe={handleSaveRecipe}
          onDeleteRecipe={handleDeleteRecipe}
        />
      )}

      {activeTab === 'count' && (
        <CountTab 
          stocks={stocks}
          onSaveCounts={handleSaveCounts}
        />
      )}
    </div>
  );
}