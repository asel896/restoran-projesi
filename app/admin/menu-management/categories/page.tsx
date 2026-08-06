'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CategoryManagementPage() {
  const router = useRouter();

  const [categories, setCategories] = useState([
    { id: '1', name: 'Ana Yemekler', displayOrder: 1 },
    { id: '2', name: 'Çorbalar', displayOrder: 2 },
    { id: '3', name: 'Tatlılar', displayOrder: 3 },
    { id: '4', name: 'İçecekler', displayOrder: 4 },
  ]);

  const [newCatName, setNewCatName] = useState('');

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName) return;

    setCategories([
      ...categories,
      { id: Date.now().toString(), name: newCatName, displayOrder: categories.length + 1 },
    ]);
    setNewCatName('');
  };

  const handleDelete = (id: string) => {
    if (confirm('Bu kategoriyi silmek istediğinize emin misiniz?')) {
      setCategories(categories.filter((c) => c.id !== id));
    }
  };

  return (
    <div style={{ padding: '30px', maxWidth: '800px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <button onClick={() => router.push('/admin/menu-management')} style={{ marginBottom: '20px', padding: '6px 12px', cursor: 'pointer' }}>
        ← Menü Yönetimine Dön
      </button>

      <h2>Kategori Yönetimi</h2>

      {/* Yeni Kategori Ekleme */}
      <form onSubmit={handleAddCategory} style={{ display: 'flex', gap: '10px', marginBottom: '30px' }}>
        <input
          type="text"
          value={newCatName}
          onChange={(e) => setNewCatName(e.target.value)}
          placeholder="Yeni Kategori Adı (Örn: Salatalar)"
          required
          style={{ flex: 1, padding: '8px' }}
        />
        <button type="submit" style={{ padding: '8px 16px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          + Kategori Ekle
        </button>
      </form>

      {/* Liste */}
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2', textAlign: 'left' }}>
            <th style={{ padding: '12px', border: '1px solid #ddd' }}>Sıra</th>
            <th style={{ padding: '12px', border: '1px solid #ddd' }}>Kategori Adı</th>
            <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'center' }}>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat, index) => (
            <tr key={cat.id}>
              <td style={{ padding: '12px', border: '1px solid #ddd' }}>{index + 1}</td>
              <td style={{ padding: '12px', border: '1px solid #ddd', fontWeight: 'bold' }}>{cat.name}</td>
              <td style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'center' }}>
                <button
                  onClick={() => handleDelete(cat.id)}
                  style={{ padding: '4px 10px', backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                >
                  Sil
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}