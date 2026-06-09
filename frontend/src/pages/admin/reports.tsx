import { useEffect, useState } from 'react';
import api from '../../api/client';

export function SalesReports() {
  const [reports, setReports] = useState<any>({ summaries: [] });

  useEffect(() => {
    api.get('/reports/revenue?period=2026-06').then(({ data }) => setReports(data)).catch(() => {});
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface via-primary-50/20 to-surface-alt">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Sales Reports</h1>
        <div className="rounded-xl bg-white border border-primary-100 p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Revenue Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="rounded-xl bg-gradient-to-br from-secondary-500 to-secondary-600 p-5 shadow text-white">
              <p className="text-sm opacity-80">Total Revenue</p>
              <p className="text-2xl font-bold mt-1">${(reports as any).totalRevenue ?? 0}</p>
            </div>
            <div className="rounded-xl bg-gradient-to-br from-accent-500 to-accent-600 p-5 shadow text-white">
              <p className="text-sm opacity-80">Total Orders</p>
              <p className="text-2xl font-bold mt-1">{(reports as any).totalOrders ?? 0}</p>
            </div>
            <div className="rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 p-5 shadow text-white">
              <p className="text-sm opacity-80">Products Sold</p>
              <p className="text-2xl font-bold mt-1">{(reports as any).totalProducts ?? 0}</p>
            </div>
            <div className="rounded-xl bg-gradient-to-br from-primary-600 to-secondary-600 p-5 shadow text-white">
              <p className="text-sm opacity-80">Avg Order Value</p>
              <p className="text-2xl font-bold mt-1">${(reports as any).avgOrderValue ?? 0}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
