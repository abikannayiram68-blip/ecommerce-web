import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { GoogleLoginButton } from '../components/auth/google-login-button';
import { useAuthStore } from '../stores/auth-store';
import api from '../api/client';

interface Promotion {
  id: number;
  title: string;
  description: string;
  discountPercent: number;
  active: boolean;
  endDate: string;
}

export function Landing() {
  const { isAuthenticated } = useAuthStore();
  const [categories, setCategories] = useState<any[]>([]);
  const [promotions, setPromotions] = useState<Promotion[]>([]);

  useEffect(() => {
    api.get('/categories').then(({ data }) => setCategories(data)).catch(() => {});
    api.get('/promotions').then(({ data }) => {
      setPromotions((data || []).filter((p: Promotion) => p.active));
    }).catch(() => {});
  }, []);

  return (
    <div>
      {promotions.length > 0 && (
        <div className="bg-gradient-to-r from-accent-400 via-accent-500 to-secondary-500">
          <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
            <p className="text-sm font-medium text-white">
              🎉 {promotions[0].title} — {promotions[0].discountPercent}% OFF! {promotions[0].description && `— ${promotions[0].description}`}
            </p>
            <Link to="/products" className="text-sm font-semibold text-white underline hover:no-underline">
              Shop Now
            </Link>
          </div>
        </div>
      )}

      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-700 py-24">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h1 className="text-5xl font-bold text-white">Discover & Shop</h1>
          <p className="mt-4 text-xl text-primary-100">Your one-stop destination for everything you need</p>
          <div className="mt-10 flex justify-center gap-4">
            <Link to="/products" className="rounded-xl bg-accent-500 px-10 py-4 font-semibold text-white hover:bg-accent-600 transition-all shadow-xl hover:shadow-2xl">
              Browse Products
            </Link>
            <Link to="/search" className="rounded-xl bg-white/20 px-10 py-4 font-semibold text-white hover:bg-white/30 transition-all backdrop-blur-sm">
              Search
            </Link>
            {!isAuthenticated && (
              <div className="w-64">
                <GoogleLoginButton />
              </div>
            )}
          </div>
        </div>
      </section>

      {promotions.length > 1 && (
        <section className="bg-gradient-to-r from-accent-50 to-accent-100/50 py-10">
          <div className="mx-auto max-w-7xl px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {promotions.slice(1, 4).map((p) => (
                <div key={p.id} className="rounded-xl bg-white p-5 shadow-sm border border-accent-200 flex items-center gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-accent-100 text-accent-600 font-bold text-xl">
                    {p.discountPercent}%
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">{p.title}</h4>
                    <p className="text-sm text-gray-500">Ends {new Date(p.endDate).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-16 bg-surface">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-3xl font-bold text-gray-800">Shop by Category</h2>
          <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-4">
            {categories.map((cat) => (
              <Link key={cat.id} to={`/products?categoryId=${cat.id}`} className="group rounded-xl border border-primary-100 bg-surface p-6 text-center transition-all hover:shadow-lg hover:-translate-y-1 hover:border-primary-300">
                <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary-100 to-primary-200 text-primary-600 text-2xl group-hover:from-primary-200 group-hover:to-primary-300 transition-all">
                  {cat.name.charAt(0)}
                </div>
                <p className="font-semibold text-gray-700 group-hover:text-primary-600 transition-colors">{cat.name}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-primary-50 to-secondary-50 py-16">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800">Why Shop With Us?</h2>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: '🚚', title: 'Free Shipping', desc: 'On orders over $50' },
              { icon: '🔒', title: 'Secure Payments', desc: '256-bit SSL encrypted' },
              { icon: '💬', title: '24/7 Support', desc: 'We are here to help' },
            ].map((f) => (
              <div key={f.title} className="rounded-xl bg-white p-8 shadow-sm border border-primary-100">
                <span className="text-4xl">{f.icon}</span>
                <h3 className="mt-4 text-lg font-bold text-gray-800">{f.title}</h3>
                <p className="mt-2 text-sm text-gray-500">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
