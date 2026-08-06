'use client';

import { useEffect } from 'react';

export default function CallSound({ playTrigger }: { playTrigger: boolean }) {
  useEffect(() => {
    if (playTrigger) {
      // Basit bir web ses efekti (beep) veya harici ses dosyası çalınabilir
      try {
        const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
        audio.play().catch((e) => console.log('Ses çalınamadı (tarayıcı izni gerekebilir):', e));
      } catch (error) {
        console.log('Ses hatası:', error);
      }
    }
  }, [playTrigger]);

  return null; // Görsel bir çıktısı yoktur, arka planda ses çalıştırır
}