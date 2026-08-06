'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddStaffPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    pinCode: '',
    role: 'Garson', // Varsayılan rol
    shift: 'Gündüz (08:00 - 16:00)',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.pinCode) return;

    alert(`"${formData.name}" (${formData.role}) olarak sisteme eklendi!`);
    router.push('/admin/waiter-management'); // İsterseniz burayı /admin/staff-management olarak güncelleyebilirsiniz
  };

  return (
    <div style={{ padding: '30px', maxWidth: '600px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <button 
        onClick={() => router.push('/admin/waiter-management')}
        style={{ marginBottom: '20px', padding: '6px 12px', cursor: 'pointer' }}
      >
        ← Personel Listesine Dön
      </button>

      <h2>Yeni Personel / Şef Hesabı Tanımla</h2>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>Ad Soyad:</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Örn: Burak Kaya"
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>Personel Rolü / Unvanı:</label>
          <select
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box', fontWeight: 'bold' }}
          >
            <option value="Garson">🍽️ Garson</option>
            <option value="Şef">🍳 Şef (Mutfak)</option>
          </select>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>Telefon Numarası:</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="Örn: 0555 123 4567"
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>Giriş PIN Kodu (4-6 Hane):</label>
          <input
            type="text"
            maxLength={6}
            required
            value={formData.pinCode}
            onChange={(e) => setFormData({ ...formData, pinCode: e.target.value })}
            placeholder="Örn: 2024"
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box', fontFamily: 'monospace' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>Vardiya Bilgisi:</label>
          <select
            value={formData.shift}
            onChange={(e) => setFormData({ ...formData, shift: e.target.value })}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          >
            <option value="Gündüz (08:00 - 16:00)">Gündüz (08:00 - 16:00)</option>
            <option value="Akşam (16:00 - 00:00)">Akşam (16:00 - 00:00)</option>
            <option value="Tam Gün">Tam Gün</option>
          </select>
        </div>

        <button 
          type="submit" 
          style={{ padding: '12px', backgroundColor: '#B9863F', color: '#17140F', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          Personel Hesabını Kaydet
        </button>
      </form>
    </div>
  );
}