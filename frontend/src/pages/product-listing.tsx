import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import api from '../api/client';

export function ProductListing() {
  const [params] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.get('/products', { params: Object.fromEntries(params.entries()) })
      .then(({ data }) => setProducts(data.products))
      .finally(() => setLoading(false));
  }, [params]);

  if (loading) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900">Products</h1>
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((p: any) => (
          <Link key={p.id} to={`/products/${p.slug}`} className="group rounded-lg border p-4 hover:shadow-lg">
            <div className="aspect-square rounded-md bg-gray-100" />
            <h3 className="mt-4 font-medium text-gray-900 group-hover:text-blue-600">{p.name}</h3>
            <p className="mt-1 text-lg font-bold text-gray-900">${p.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
