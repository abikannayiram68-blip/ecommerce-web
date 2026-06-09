import { Link } from 'react-router-dom';
import { useWishlistStore } from '../../stores/wishlist-store';

interface Product {
  id: number;
  name: string;
  slug: string;
  price: number;
  categoryId?: number;
  description?: string;
  images?: { imageUrl: string }[];
}

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const items = useWishlistStore((state) => state.items);
  const addItem = useWishlistStore((state) => state.addItem);
  const removeItem = useWishlistStore((state) => state.removeItem);
  const isWishlisted = items.some((i) => i.productId === product.id);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isWishlisted) {
      removeItem(product.id);
    } else {
      addItem(product.id);
    }
  };

  return (
    <Link to={`/products/${product.slug}`} className="group relative rounded-xl border border-primary-100 bg-surface p-4 shadow-sm transition-all hover:shadow-lg hover:-translate-y-1">
      <button
        onClick={toggleWishlist}
        className={`absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full transition-all ${
          isWishlisted ? 'bg-secondary-500 text-white shadow-md' : 'bg-white/80 text-gray-400 hover:text-secondary-500 hover:bg-secondary-50'
        }`}
      >
        <svg className="h-5 w-5" fill={isWishlisted ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </button>
      <div className="aspect-square rounded-lg bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center overflow-hidden">
        {product.images && product.images.length > 0 ? (
          <img src={product.images[0].imageUrl} alt={product.name} className="h-full w-full object-cover" />
        ) : (
          <span className="text-4xl text-primary-300">✦</span>
        )}
      </div>
      <h3 className="mt-4 font-semibold text-gray-800 group-hover:text-primary-600 transition-colors">{product.name}</h3>
      <p className="mt-1 text-lg font-bold text-primary-600">${product.price}</p>
    </Link>
  );
}
