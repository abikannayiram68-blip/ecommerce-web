import { useEffect, useState } from 'react';
import api from '../api/client';

export function OrderHistory() {
  const [orders, setOrders] = useState([]);

  const loadOrders = () => {
    api.get('/orders').then(({ data }) => setOrders(data.orders));
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleCancel = async (id: number) => {
    if (!confirm('Are you sure you want to cancel this order?')) return;
    try {
      await api.put(`/orders/${id}/cancel`);
      loadOrders();
    } catch (err) {
      alert('Failed to cancel order');
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900">Order History</h1>
      <div className="mt-8 space-y-4">
        {(!orders || orders.length === 0) ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <svg className="mx-auto h-16 w-16 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
            <p className="text-gray-500 mb-6">Looks like you haven't placed any orders yet.</p>
            <a href="/products" className="inline-block bg-primary-600 text-white font-medium px-6 py-2 rounded-lg hover:bg-primary-700 transition">
              Start Shopping
            </a>
          </div>
        ) : (
          orders.map((order: any) => (
            <div key={order.id} className="rounded-xl border border-gray-200 p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="mb-4 sm:mb-0">
                <div className="flex items-center gap-3">
                  <p className="font-bold text-gray-900">#{order.orderNumber}</p>
                  <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${
                    order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                    order.status === 'cancelled' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'
                  }`}>{order.status}</span>
                </div>
                <p className="mt-2 text-gray-600">Total: <span className="font-semibold text-gray-900">${order.total}</span></p>
                <p className="text-sm text-gray-400 mt-1">{new Date(order.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</p>
              </div>
              {(order.status === 'pending' || order.status === 'processing') && (
                <button
                  onClick={() => handleCancel(order.id)}
                  className="w-full sm:w-auto px-5 py-2.5 bg-red-50 text-red-600 font-medium rounded-lg text-sm hover:bg-red-100 transition-colors border border-red-100 focus:ring-2 focus:ring-red-500 focus:outline-none"
                >
                  Cancel Order
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
