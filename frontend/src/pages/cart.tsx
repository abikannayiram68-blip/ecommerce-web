import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../stores/cart-store';

export function Cart() {
  const { items, total, loading, fetchCart, updateItem, removeItem } = useCartStore();

  useEffect(() => { fetchCart(); }, []);

  if (loading) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
      {items.length === 0 ? (
        <p className="mt-8 text-gray-500">Your cart is empty</p>
      ) : (
        <div className="mt-8 space-y-4">
          {items.map((item: any) => (
            <div key={item.id} className="flex items-center justify-between rounded-lg border p-4">
              <div>
                <p className="font-medium text-gray-900">{item.product.name}</p>
                <p className="text-sm text-gray-500">${item.product.price} x {item.quantity}</p>
              </div>
              <div className="flex items-center gap-4">
                <select
                  value={item.quantity}
                  onChange={(e) => updateItem(item.id, Number(e.target.value))}
                  className="rounded border px-2 py-1"
                >
                  {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
                </select>
                <button onClick={() => removeItem(item.id)} className="text-red-600 hover:text-red-800">Remove</button>
              </div>
            </div>
          ))}
          <div className="border-t pt-4 text-right">
            <p className="text-xl font-bold">Total: ${total.toFixed(2)}</p>
            <Link to="/checkout" className="mt-4 inline-block rounded-md bg-blue-600 px-8 py-3 text-white hover:bg-blue-700">
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
