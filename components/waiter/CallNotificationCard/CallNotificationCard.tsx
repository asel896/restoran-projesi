'use client';

interface CallNotification {
  id: number;
  table: string;
  type: string;
  time: string;
}

export default function CallNotificationCard({
  call,
  onComplete,
}: {
  call: CallNotification;
  onComplete: (id: number) => void;
}) {
  return (
    <div
      style={{
        backgroundColor: '#1e293b',
        border: '1px solid #334155',
        borderRadius: '12px',
        padding: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
          <h3 style={{ fontSize: '18px', margin: 0, color: '#f8fafc' }}>{call.table}</h3>
          <span
            style={{
              backgroundColor: '#ef4444',
              color: '#fff',
              padding: '2px 8px',
              borderRadius: '20px',
              fontSize: '11px',
              fontWeight: 'bold',
            }}
          >
            Yeni Çağrı
          </span>
        </div>
        <p style={{ color: '#38bdf8', fontSize: '14px', margin: '2px 0', fontWeight: 'bold' }}>
          Talep: {call.type}
        </p>
        <p style={{ color: '#94a3b8', fontSize: '12px', margin: '2px 0' }}>Saat: {call.time}</p>
      </div>

      <button
        onClick={() => onComplete(call.id)}
        style={{
          backgroundColor: '#10b981',
          color: '#fff',
          border: 'none',
          padding: '10px 16px',
          borderRadius: '8px',
          cursor: 'pointer',
          fontWeight: 'bold',
          fontSize: '13px',
        }}
      >
        İlgilenildi / Tamamla
      </button>
    </div>
  );
}