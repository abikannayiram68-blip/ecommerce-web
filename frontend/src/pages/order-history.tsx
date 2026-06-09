import { useEffect, useState } from 'react';
import api from '../api/client';

export function OrderHistory() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.get('/orders').then(({ data }) => setOrders(data.orders));
  }, []);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900">Order History</h1>
      <div className="mt-8 space-y-4">
        {orders.map((order: any) => (
          <div key={order.id} className="rounded-lg border p-4">
            <div className="flex justify-between">
              <p className="font-medium">#{order.orderNumber}</p>
              <span className={`rounded-full px-3 py-1 text-xs ${
                order.status === 'delivered' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
              }`}>{order.status}</span>
            </div>
            <p className="mt-2 text-gray-600">Total: ${order.total}</p>
            <p className="text-sm text-gray-400">{new Date(order.createdAt).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
