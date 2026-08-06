import styles from './KitchenDashboard.module.css';
import { Order } from './KitchenDashboard';

interface OrdersTabProps {
  orders: Order[];
  onNextStatus: (orderId: number) => void;
  onCompleteOrder: (orderId: number) => void;
}

export default function OrdersTab({ orders, onNextStatus, onCompleteOrder }: OrdersTabProps) {
  return (
    <>
      <div className={styles.contentHeader}>
        <h1 className={styles.title}>👨‍🍳 Mutfak Sipariş Ekranı (KDS)</h1>
        <span className={styles.counterBadge}>
          Aktif Sipariş: <strong>{orders.length}</strong>
        </span>
      </div>

      <div className={styles.grid}>
        {orders.map((order) => {
          let badgeClass = styles.statusBadgeNew;
          let badgeText = 'Yeni Sipariş';

          if (order.status === 'HAZIRLANIYOR') {
            badgeClass = styles.statusBadgePreparing;
            badgeText = 'Hazırlanıyor (Stoktan Düşüldü)';
          } else if (order.status === 'HAZIR') {
            badgeClass = styles.statusBadgeReady;
            badgeText = 'Hazır (Garsonu Bekliyor)';
          }

          return (
            <div key={order.id} className={styles.orderCard}>
              <div className={styles.cardHeader}>
                <span className={styles.tableNo}>{order.tableNo}</span>
                <span className={styles.time}>⏱️ {order.time}</span>
              </div>

              <div className={styles.cardBody}>
                <span className={badgeClass}>{badgeText}</span>

                <ul className={styles.itemList}>
                  {order.items.map((item) => (
                    <li key={item.id} className={styles.itemRow}>
                      <div className={styles.itemInfo}>
                        <span>{item.name}</span>
                        <strong className={styles.itemQuantity}>x{item.quantity}</strong>
                      </div>
                      {item.note && (
                        <div className={styles.itemNote}>Not: {item.note}</div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.cardFooter}>
                {order.status !== 'HAZIR' ? (
                  <button
                    onClick={() => onNextStatus(order.id)}
                    className={order.status === 'BEKLIYOR' ? styles.actionButtonPreparing : styles.actionButtonReady}
                  >
                    {order.status === 'BEKLIYOR' ? 'Hazırlamaya Başla 🍳' : 'Hazır İşaretle ✅'}
                  </button>
                ) : (
                  <button
                    onClick={() => onCompleteOrder(order.id)}
                    className={styles.actionButtonComplete}
                  >
                    Garsona Teslim Edildi 🛎️
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}