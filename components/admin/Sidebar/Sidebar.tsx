import Link from 'next/link';

export default function Sidebar() {
  return (
    <aside style={{ width: '260px', backgroundColor: '#1e293b', borderRight: '1px solid #334155', padding: '20px', minHeight: '100vh' }}>
      <h2 style={{ fontSize: '18px', color: '#38bdf8', marginBottom: '30px' }}>🛠️ Restoran Yönetim</h2>
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <Link href="/admin" style={{ padding: '10px 14px', backgroundColor: '#0284c7', borderRadius: '8px', color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>📊 Genel Bakış</Link>
        <Link href="/waiter" style={{ padding: '10px 14px', borderRadius: '8px', color: '#94a3b8', textDecoration: 'none' }}>🍽️ Garson Paneli</Link>
        <Link href="/" style={{ padding: '10px 14px', borderRadius: '8px', color: '#94a3b8', textDecoration: 'none' }}>🏠 Ana Siteye Dön</Link>
      </nav>
    </aside>
  );
}