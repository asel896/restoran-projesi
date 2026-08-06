'use server';

import { redirect } from 'next/navigation';

export interface ReservationFormState {
  error: string | null;
}

export async function createReservation(
  _prevState: ReservationFormState,
  formData: FormData
): Promise<ReservationFormState> {
  const name = (formData.get('name') as string || '').trim();
  const phone = (formData.get('phone') as string || '').trim();
  const date = (formData.get('date') as string || '').trim();
  const time = (formData.get('time') as string || '').trim();
  const guests = (formData.get('guests') as string || '').trim();
  const note = (formData.get('note') as string || '').trim();

  if (!name || !phone || !date || !time || !guests) {
    return { error: 'Lütfen zorunlu alanları (ad, telefon, tarih, saat, kişi sayısı) doldurun.' };
  }

  const guestCount = Number(guests);
  if (!Number.isFinite(guestCount) || guestCount < 1) {
    return { error: 'Kişi sayısı geçerli bir sayı olmalı.' };
  }

  // TODO: Gerçek veritabanı / e-posta / SMS entegrasyonu buraya eklenecek.
  // Şimdilik talep sunucu logunda tutuluyor.
  console.log('Yeni rezervasyon talebi:', {
    name,
    phone,
    date,
    time,
    guests: guestCount,
    note,
    createdAt: new Date().toISOString(),
  });

  const params = new URLSearchParams({ name, date, time, guests });
  redirect(`/reservation/success?${params.toString()}`);
}