'use client';

import { useState } from 'react';
import styles from './ReservationForm.module.css';

export default function ReservationForm() {
  const [form, setForm] = useState({ name: '', phone: '', date: '', guests: 2, note: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Teşekkürler ${form.name}, rezervasyon talebiniz alındı.`);
    setForm({ name: '', phone: '', date: '', guests: 2, note: '' });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h3 className={styles.title}>📅 Online Rezervasyon Yap</h3>
      
      <div className={styles.fieldGroup}>
        <label className={styles.label}>Ad Soyad</label>
        <input
          type="text"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
          className={styles.input}
        />
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.label}>Telefon</label>
        <input
          type="text"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          required
          className={styles.input}
        />
      </div>

      <div className={styles.gridRow}>
        <div className={styles.fieldGroup}>
          <label className={styles.label}>Tarih / Saat</label>
          <input
            type="text"
            placeholder="Örn: 03.06.2026 - 20:00"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.fieldGroup}>
          <label className={styles.label}>Kişi Sayısı</label>
          <input
            type="number"
            value={form.guests}
            onChange={(e) => setForm({ ...form, guests: Number(e.target.value) })}
            min={1}
            max={20}
            required
            className={styles.input}
          />
        </div>
      </div>

      <button type="submit" className={styles.submitButton}>
        Rezervasyonu Tamamla
      </button>
    </form>
  );
}