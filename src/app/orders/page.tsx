"use client";
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getOrders, Order } from '../../utils/orderApi';

export default function OrdersPage() {
  const { data: session, status } = useSession();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (status === 'authenticated' && session?.user?.email) {
      setLoading(true);
      getOrders(session.user.email)
        .then(setOrders)
        .finally(() => setLoading(false));
    }
  }, [status, session]);

  if (status !== 'authenticated') {
    return (
      <main className="p-8">
        <h1 className="text-2xl font-bold mb-4">Order History</h1>
        <p>You must be signed in to view your orders.</p>
        <Link href="/auth/signin" className="text-blue-600 hover:underline">Sign in</Link>
      </main>
    );
  }

  return (
    <main className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Order History</h1>
      {loading ? (
        <p>Loading orders...</p>
      ) : orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul className="space-y-6">
          {orders.map(order => (
            <li key={order.id} className="border rounded p-4">
              <div className="font-semibold mb-2">Order #{order.id} - {order.createdAt?.toDate ? order.createdAt.toDate().toLocaleDateString() : ''}</div>
              <ul className="mb-2">
                {order.items.map((item, idx) => (
                  <li key={idx}>{item.name} x {item.quantity}</li>
                ))}
              </ul>
              <div className="font-bold">Total: ${order.total.toFixed(2)}</div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
