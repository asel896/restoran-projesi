'use client';

interface HistoryItem {
  id: number;
  table: string;
  type: string;
  completedAt: string;
}

export default function CallHistoryList({ history }: { history: HistoryItem[] }) {
  return (
    <div style={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '12px', padding: '20px' }}>
      <h3 style={{ fontSize: '16px', color: '#f8fafc', marginBottom: '16px' }}>📋 Tamamlanan Çağrı Geçmişi</h3>
      {history.length === 0 ? (
        <p style={{ color: '#94a3b8', fontSize: '14px' }}>Henüz geçmiş kayıt bulunmuyor.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {history.map((item) => (
            <div
              key={item.id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '10px 14px',
                backgroundColor: '#0f172a',
                borderRadius: '8px',
                border: '1px solid #334155',
                fontSize: '13px',
              }}
            >
              <span style={{ color: '#f8fafc', fontWeight: 'bold' }}>{item.table} - <span style={{ color: '#94a3b8', fontWeight: 'normal' }}>{item.type}</span></span>
              <span style={{ color: '#10b981' }}>{item.completedAt}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}