import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/client';
import { useAuthStore } from '../stores/auth-store';
import { useCartStore } from '../stores/cart-store';
import { Reviews } from '../components/product/reviews';
import { useWishlistStore } from '../stores/wishlist-store';

export function ProductDetail() {
  const { slug } = useParams();
  const [product, setProduct] = useState<any>(null);
  const { isAuthenticated } = useAuthStore();
  const { addItem } = useCartStore();
  const { addItem: addWishlist, removeItem: removeWishlist, items: wishlistItems } = useWishlistStore();

  useEffect(() => {
    api.get(`/products/${slug}`).then(({ data }) => setProduct(data));
  }, [slug]);

  if (!product) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse text-primary-400 text-lg">Loading...</div>
    </div>
  );

  const isWishlisted = wishlistItems.some((i) => i.productId === product.id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface via-primary-50/20 to-surface-alt">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center shadow-inner">
            <span className="text-7xl text-primary-300">✦</span>
          </div>

          <div>
            <h1 className="text-4xl font-bold text-gray-800">{product.name}</h1>
            <p className="mt-4 text-4xl font-bold bg-gradient-to-r from-primary-600 to-secondary-500 bg-clip-text text-transparent">
              ${product.price}
            </p>
            <p className="mt-4 text-gray-600 leading-relaxed">{product.description}</p>

            <div className="mt-6 flex items-center gap-4">
              <span className="rounded-lg bg-primary-100 px-3 py-1 text-sm font-medium text-primary-700">
                Stock: {product.stock}
              </span>
              {product.categoryId && (
                <span className="rounded-lg bg-accent-100 px-3 py-1 text-sm font-medium text-accent-700">
                  Category #{product.categoryId}
                </span>
              )}
            </div>

            <div className="mt-8 flex gap-4">
              <button
                onClick={() => addItem(product.id)}
                disabled={!isAuthenticated}
                className="rounded-xl bg-gradient-to-r from-primary-600 to-primary-700 px-10 py-3.5 font-semibold text-white hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-lg"
              >
                {isAuthenticated ? 'Add to Cart' : 'Sign in to buy'}
              </button>

              <button
                onClick={() => isWishlisted ? removeWishlist(product.id) : addWishlist(product.id)}
                className={`flex items-center gap-2 rounded-xl border px-6 py-3.5 font-medium transition-all ${
                  isWishlisted
                    ? 'border-secondary-200 bg-secondary-50 text-secondary-600'
                    : 'border-primary-200 text-gray-600 hover:border-secondary-300 hover:text-secondary-500'
                }`}
              >
                <svg className="h-5 w-5" fill={isWishlisted ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                {isWishlisted ? 'Wishlisted' : 'Wishlist'}
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <Reviews productId={product.id} />
        </div>
      </div>
    </div>
  );
}
