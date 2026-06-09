import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/client';

export function OrderConfirmation() {
  const { id } = useParams();
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    api.get(`/orders/${id}/confirmation`).then(({ data }) => setOrder(data.confirmation));
  }, [id]);

  if (!order) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 text-center">
      <div className="rounded-lg bg-green-50 p-8">
        <h1 className="text-3xl font-bold text-green-800">Order Confirmed!</h1>
        <p className="mt-4 text-gray-600">Order #{order.orderNumber}</p>
        <p className="mt-2 text-xl font-bold">Total: ${order.total}</p>
        <Link to="/orders" className="mt-6 inline-block rounded-md bg-blue-600 px-8 py-3 text-white hover:bg-blue-700">
          View Orders
        </Link>
      </div>
    </div>
  );
}
