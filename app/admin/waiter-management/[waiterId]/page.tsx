'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function EditStaffPage() {
  const params = useParams();
  const router = useRouter();
  const staffId = params.staffId as string; // Veya waiterId (klasör yapınıza göre)

  // Şimdilik mockup veri
  const [formData, setFormData] = useState({
    name: 'Ahmet Yılmaz',
    role: 'Garson', // Rol alanı eklendi ('Garson' veya 'Şef')
    phone: '0533 987 6543',
    pinCode: '1001',
    status: 'Aktif',
    shift: 'Gündüz (08:00 - 16:00)',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Personel #${staffId} (${formData.role}) bilgileri güncellendi!`);
    router.push('/admin/waiter-management');
  };

  return (
    <div style={{ padding: '30px', maxWidth: '600px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <button 
        onClick={() => router.push('/admin/waiter-management')}
        style={{ marginBottom: '20px', padding: '6px 12px', cursor: 'pointer' }}
      >
        ← Personel Listesine Dön
      </button>

      <h2>Personel Profili Düzenle (ID: #{staffId})</h2>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>Ad Soyad:</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>Giriş PIN Kodu:</label>
          <input
            type="text"
            maxLength={6}
            required
            value={formData.pinCode}
            onChange={(e) => setFormData({ ...formData, pinCode: e.target.value })}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box', fontFamily: 'monospace' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>Hesap Durumu:</label>
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          >
            <option value="Aktif">Aktif (Giriş Yapabilir)</option>
            <option value="Pasif">Pasif (Erişimi Engelle)</option>
          </select>
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
          Güncellemeleri Kaydet
        </button>
      </form>
    </div>
  );
}