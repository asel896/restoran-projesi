'use client';

import { useState } from 'react';
import styles from './WaiterForm.module.css';

export default function WaiterForm({ onAdd }: { onAdd: (staff: { name: string; role: string; pinCode: string; shift: string }) => void }) {
  const [name, setName] = useState('');
  const [role, setRole] = useState('Garson');
  const [pinCode, setPinCode] = useState('');
  const [shift, setShift] = useState('Sabah (08:00 - 16:00)');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !pinCode) return;
    onAdd({ name, role, pinCode, shift });
    setName('');
    setPinCode('');
    setRole('Garson');
  };

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>➕ Yeni Personel Ekle</h3>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="Personel Adı Soyadı" 
          className={styles.input} 
          required 
        />
        
        <select 
          value={role} 
          onChange={(e) => setRole(e.target.value)} 
          className={styles.select}
        >
          <option value="Garson">🍽️ Garson</option>
          <option value="Şef">🍳 Şef</option>
        </select>

        <input 
          type="text" 
          maxLength={6}
          value={pinCode} 
          onChange={(e) => setPinCode(e.target.value)} 
          placeholder="Giriş PIN Kodu (Örn: 1234)" 
          className={styles.input} 
          required 
        />

        <select 
          value={shift} 
          onChange={(e) => setShift(e.target.value)} 
          className={styles.select}
        >
          <option value="Sabah (08:00 - 16:00)">Sabah (08:00 - 16:00)</option>
          <option value="Akşam (16:00 - 00:00)">Akşam (16:00 - 00:00)</option>
        </select>
        
        <button type="submit" className={styles.submitButton}>Ekle</button>
      </form>
    </div>
  );
}