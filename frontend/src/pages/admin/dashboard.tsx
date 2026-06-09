import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/client';

export function AdminDashboard() {
  const [dashboard, setDashboard] = useState<any>({});

  useEffect(() => {
    api.get('/admin/dashboard').then(({ data }) => setDashboard(data)).catch(() => {});
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface via-primary-50/20 to-surface-alt">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-4 mb-10">
          {[
            { label: 'Total Products', value: dashboard.totalProducts, gradient: 'from-primary-500 to-primary-600' },
            { label: 'Total Orders', value: dashboard.totalOrders, gradient: 'from-secondary-500 to-secondary-600' },
            { label: 'Total Customers', value: dashboard.totalCustomers, gradient: 'from-accent-500 to-accent-600' },
            { label: 'Revenue', value: `$${dashboard.totalRevenue || 0}`, gradient: 'from-primary-600 to-secondary-600' },
          ].map((card) => (
            <div key={card.label} className={`rounded-xl bg-gradient-to-br ${card.gradient} p-6 shadow-lg text-white`}>
              <p className="text-sm opacity-80">{card.label}</p>
              <p className="text-3xl font-bold mt-1">{card.value ?? '—'}</p>
            </div>
          ))}
        </div>

        <div className="rounded-xl bg-white border border-primary-100 p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Management</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link to="/admin/promotions" className="rounded-xl border border-accent-200 bg-accent-50 p-5 text-center hover:shadow-md transition-all hover:-translate-y-0.5">
              <span className="text-3xl">🏷️</span>
              <h3 className="mt-2 font-semibold text-accent-700">Promotions</h3>
              <p className="text-sm text-accent-500">Manage discounts & offers</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
