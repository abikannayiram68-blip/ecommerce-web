import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useWishlistStore } from '../stores/wishlist-store';
import { Badge } from '../components/ui/badge';

export function Wishlist() {
  const { items, loading, fetch, removeItem } = useWishlistStore();

  useEffect(() => {
    fetch();
  }, [fetch]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse text-primary-400 text-lg">Loading...</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface via-primary-50/20 to-surface-alt">
      <div className="mx-auto max-w-3xl px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Your Wishlist
            {items.length > 0 && (
              <span className="ml-3 text-lg font-normal text-gray-400">({items.length} items)</span>
            )}
          </h1>
          <Link to="/products" className="rounded-lg bg-primary-600 px-5 py-2 text-sm font-medium text-white hover:bg-primary-700 transition-colors">
            Browse Products
          </Link>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <svg className="h-20 w-20 mb-4 text-primary-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <p className="text-xl font-medium">Your wishlist is empty</p>
            <p className="text-sm mt-2">Start adding your favorite products!</p>
            <Link to="/products" className="mt-6 rounded-lg bg-primary-600 px-6 py-3 text-sm font-medium text-white hover:bg-primary-700 transition-colors shadow-md">
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="rounded-xl border border-primary-100 bg-surface p-5 shadow-sm hover:shadow-md transition-all flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary-100 to-primary-200 text-primary-400 text-2xl">
                    ✦
                  </div>
                  <div>
                    <Link to={`/products/${item.product?.slug}`} className="font-semibold text-gray-800 hover:text-primary-600 transition-colors">
                      {item.product?.name || `Product #${item.productId}`}
                    </Link>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="primary" size="sm">${item.product?.price || '—'}</Badge>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => removeItem(item.productId)}
                  className="rounded-lg bg-secondary-50 px-4 py-2 text-sm font-medium text-secondary-600 hover:bg-secondary-100 transition-colors"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
