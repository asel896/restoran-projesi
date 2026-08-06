'use client';

import { useState } from 'react';
import WaiterForm from '@/components/admin/WaiterForm/WaiterForm';
import WaiterTable from '@/components/admin/WaiterTable/WaiterTable';
import styles from './page.module.css';

export default function StaffManagementPage() {
  const [staffList, setStaffList] = useState([
    { id: 1, name: 'Ahmet Yılmaz', role: 'Garson', shift: 'Sabah (08:00 - 16:00)', status: 'Aktif' },
    { id: 2, name: 'Mehmet Demir', role: 'Şef', shift: 'Akşam (16:00 - 00:00)', status: 'Aktif' },
    { id: 3, name: 'Ayşe Kaya', role: 'Garson', shift: 'Akşam (16:00 - 00:00)', status: 'Mola' },
    { id: 4, name: 'Ali Usta', role: 'Şef', shift: 'Sabah (08:00 - 16:00)', status: 'Aktif' },
  ]);

  const handleAddStaff = (newStaffData: { name: string; role: string; shift: string }) => {
    const newStaff = {
      id: Date.now(),
      ...newStaffData,
      status: 'Aktif',
    };
    setStaffList([newStaff, ...staffList]);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.eyebrow}>Kor Ocakbaşı — Yönetim Paneli</span>
        <h2 className={styles.title}>
          Personel <span className={styles.titleHighlight}> Yönetimi</span>
        </h2>
      </div>
      
      {/* Form ve Tablo Alanı */}
      <div className={styles.contentGrid}>
        <WaiterForm onAdd={handleAddStaff} />
        <WaiterTable waiters={staffList} />
      </div>
    </div>
  );
}