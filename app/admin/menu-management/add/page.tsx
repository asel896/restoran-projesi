'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddMenuItemPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    category: 'Ana Yemekler',
    price: '',
    description: '',
    isAvailable: true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`"${formData.name}" ürünü başarıyla eklendi!`);
    router.push('/admin/menu-management');
  };

  return (
    <div style={{ padding: '30px', maxWidth: '600px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <button onClick={() => router.push('/admin/menu-management')} style={{ marginBottom: '20px', padding: '6px 12px', cursor: 'pointer' }}>
        ← Menü Listesine Dön
      </button>

      <h2>Yeni Menü Elemanı Ekle</h2>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>Ürün Adı:</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Örn: İskender Kebap"
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
            placeholder="Örn: 320"
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>Açıklama / İçerik:</label>
          <textarea
            rows={3}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Örn: Tereyağlı pide üzerinde dana eti, yoğurt ile..."
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>

        <button type="submit" style={{ padding: '12px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
          Ürünü Kaydet
        </button>
      </form>
    </div>
  );
}