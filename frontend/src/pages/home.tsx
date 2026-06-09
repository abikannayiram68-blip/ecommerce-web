import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/client';

export function Home() {
  const [recommendations, setRecs] = useState([]);

  useEffect(() => {
    api.get('/recommendations').then(({ data }) => setRecs(data.products || [])).catch(() => {});
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900">Recommended for You</h1>
      <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-4">
        {recommendations.slice(0, 4).map((p: any) => (
          <Link key={p.id} to={`/products/${p.slug}`} className="rounded-lg border p-4 hover:shadow-lg">
            <div className="aspect-square rounded bg-gray-100" />
            <p className="mt-2 font-medium">{p.name}</p>
            <p className="text-blue-600">${p.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
