import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/client';
import { useCartStore } from '../stores/cart-store';

export function Checkout() {
  const navigate = useNavigate();
  const { items, total, clearCart } = useCartStore();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const { data } = await api.post('/orders', {
        shippingAddress: { street: '123 Main St', city: 'New York', zip: '10001' },
        paymentMethod: 'stripe',
      });
      await clearCart();
      navigate(`/order-confirmation/${data.id}`);
    } catch (err) {
      console.error('Checkout failed', err);
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
        <div className="text-right text-xl font-bold">Total: ${total.toFixed(2)}</div>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full rounded-md bg-blue-600 py-3 text-white hover:bg-blue-700 disabled:bg-gray-300"
        >
          {loading ? 'Processing...' : 'Place Order'}
        </button>
      </div>
    </div>
  );
}
