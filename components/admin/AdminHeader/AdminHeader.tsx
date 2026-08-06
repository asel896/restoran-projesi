export default function AdminHeader() {
  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', backgroundColor: '#1e293b', padding: '16px 20px', borderRadius: '12px', border: '1px solid #334155' }}>
      <h1 style={{ fontSize: '20px', margin: 0, color: '#f8fafc' }}>Yönetici Kontrol Paneli</h1>
      <div style={{ fontSize: '14px', color: '#94a3b8' }}>
        Admin: <strong style={{ color: '#fff' }}>Yılmaz A.</strong>
      </div>
    </header>
  );
}