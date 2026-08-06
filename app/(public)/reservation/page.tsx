'use client';

import { useActionState } from 'react';
import Link from 'next/link';
import { createReservation, type ReservationFormState } from './actions';
import styles from './page.module.css';

const initialState: ReservationFormState = { error: null };

export default function ReservationPage() {
  const [state, formAction, isPending] = useActionState(createReservation, initialState);

  const todayISO = new Date().toISOString().split('T')[0];

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.brandTitle}>Kor Ocakbaşı</h1>
        <span className={styles.eyebrowBadge}>Rezervasyon</span>
      </header>

      <main className={styles.main}>
        <p className={styles.intro}>
          Masanızı önceden ayırtın, sıra beklemeden keyfini çıkarın.
        </p>

        <form action={formAction} className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="name" className={styles.label}>Ad Soyad *</label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className={styles.input}
              placeholder="Adınız Soyadınız"
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="phone" className={styles.label}>Telefon *</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              className={styles.input}
              placeholder="05xx xxx xx xx"
            />
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label htmlFor="date" className={styles.label}>Tarih *</label>
              <input
                id="date"
                name="date"
                type="date"
                required
                min={todayISO}
                className={styles.input}
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="time" className={styles.label}>Saat *</label>
              <input
                id="time"
                name="time"
                type="time"
                required
                className={styles.input}
              />
            </div>
          </div>

          <div className={styles.field}>
            <label htmlFor="guests" className={styles.label}>Kişi Sayısı *</label>
            <input
              id="guests"
              name="guests"
              type="number"
              min={1}
              max={20}
              required
              defaultValue={2}
              className={styles.input}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="note" className={styles.label}>Not (opsiyonel)</label>
            <textarea
              id="note"
              name="note"
              rows={3}
              className={styles.textarea}
              placeholder="Özel bir isteğiniz varsa yazabilirsiniz (doğum günü, pencere kenarı vb.)"
            />
          </div>

          {state.error && (
            <p className={styles.errorText}>{state.error}</p>
          )}

          <button type="submit" className={styles.submitButton} disabled={isPending}>
            {isPending ? 'Gönderiliyor...' : 'Rezervasyon Talebi Gönder'}
          </button>
        </form>

        <Link href="/menu" className={styles.backLink}>← Menüye dön</Link>
      </main>
    </div>
  );
}