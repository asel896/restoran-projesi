'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddTablePage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    tableNumber: '',
    capacity: '4',
    location: 'İç Mekan',
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.tableNumber) return;

    alert(`"${formData.tableNumber}" başarıyla oluşturuldu!`);
    router.push('/admin/tables');
  };

  return (
    <div style={{ padding: '30px', maxWidth: '600px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <button 
        onClick={() => router.push('/admin/tables')}
        style={{ marginBottom: '20px', padding: '6px 12px', cursor: 'pointer' }}
      >
        ← Masalara Dön
      </button>

      <h2>Yeni Masa Oluştur</h2>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>Masa Adı / Numarası:</label>
          <input
            type="text"
            required
            value={formData.tableNumber}
            onChange={(e) => setFormData({ ...formData, tableNumber: e.target.value })}
            placeholder="Örn: Masa 12 veya Bahçe 3"
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>Kişi Kapasitesi:</label>
          <input
            type="number"
            min="1"
            required
            value={formData.capacity}
            onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
            placeholder="Örn: 4"
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>Konum / Alan:</label>
          <select
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          >
            <option value="İç Mekan">İç Mekan</option>
            <option value="Teras">Teras</option>
            <option value="Bahçe">Bahçe</option>
            <option value="VIP Salon">VIP Salon</option>
          </select>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>Notlar / Açıklama (İsteğe Bağlı):</label>
          <textarea
            rows={3}
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            placeholder="Örn: Priz yanında, sigara içilebilir alanda..."
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>

        <button 
          type="submit" 
          style={{ padding: '12px', backgroundColor: '#20c997', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          Masayı Kaydet
        </button>
      </form>
    </div>
  );
}