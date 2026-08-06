'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function EditMenuItemPage() {
  const params = useParams();
  const router = useRouter();
  const itemId = params.itemId as string;

  // Şimdilik mockup veri
  const [formData, setFormData] = useState({
    name: 'Adana Kebap',
    category: 'Ana Yemekler',
    price: '280',
    description: 'Zırh kıyması, özel baharatlar, közlenmiş biber ve domates ile',
    isAvailable: true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Ürün ID: ${itemId} başarıyla güncellendi!`);
    router.push('/admin/menu-management');
  };

  return (
    <div style={{ padding: '30px', maxWidth: '600px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <button onClick={() => router.push('/admin/menu-management')} style={{ marginBottom: '20px', padding: '6px 12px', cursor: 'pointer' }}>
        ← Menü Listesine Dön
      </button>

      <h2>Ürün Düzenle (ID: #{itemId})</h2>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>Ürün Adı:</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>Kategori:</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          >
            <option value="Ana Yemekler">Ana Yemekler</option>
            <option value="Çorbalar">Çorbalar</option>
            <option value="Tatlılar">Tatlılar</option>
            <option value="İçecekler">İçecekler</option>
          </select>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>Fiyat (₺):</label>
          <input
            type="number"
            required
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>Açıklama:</label>
          <textarea
            rows={3}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>

        <div>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={formData.isAvailable}
              onChange={(e) => setFormData({ ...formData, isAvailable: e.target.checked })}
            />
            Ürün Satışta / Stokta Var
          </label>
        </div>

        <button type="submit" style={{ padding: '12px', backgroundColor: '#0070f3', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
          Değişiklikleri Kaydet
        </button>
      </form>
    </div>
  );
}