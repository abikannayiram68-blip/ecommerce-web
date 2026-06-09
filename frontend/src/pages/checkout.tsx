import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/client';
import { useCartStore } from '../stores/cart-store';

export function Checkout() {
  const navigate = useNavigate();
  const { items, total, clearCart } = useCartStore();
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.post('/orders', {
        shippingAddress: { street: '123 Main St', city: 'New York', zip: '10001' },
        paymentMethod: 'stripe',
      });
      await clearCart();
      navigate(`/order-confirmation/${data.id}`);
    } catch (err: any) {
      console.error('Checkout failed', err);
      setError(err.response?.data?.message || 'Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
      <div className="mt-8 space-y-4">
        {items.map((item: any) => (
          <div key={item.id} className="flex justify-between border-b pb-2">
            <span>{item.product.name} x {item.quantity}</span>
            <span>${(item.product.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        {error && (
          <div className="rounded bg-red-50 p-3 text-red-800 text-sm border border-red-200">
            {error}
          </div>
        )}
        <div className="text-right text-xl font-bold">Total: ${total.toFixed(2)}</div>
        <button
          onClick={handleSubmit}
          disabled={loading || items.length === 0}
          className="w-full rounded-md bg-blue-600 py-3 text-white hover:bg-blue-700 disabled:bg-gray-300 transition-colors"
        >
          {loading ? 'Processing...' : 'Place Order'}
        </button>
      </div>
    </div>
  );
}
