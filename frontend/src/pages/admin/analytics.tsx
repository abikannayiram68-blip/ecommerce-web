import { useEffect } from 'react';
import { useAnalyticsStore } from '../../stores/analytics-store';

export function AnalyticsDashboard() {
  const { analytics, fetchAnalytics } = useAnalyticsStore();

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface via-primary-50/20 to-surface-alt">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Analytics Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 p-6 shadow-lg text-white">
            <p className="text-sm opacity-80">Conversion Rate</p>
            <p className="text-3xl font-bold mt-1">{analytics?.conversionRate ?? 0}%</p>
          </div>
        </div>
        <div className="rounded-xl bg-white border border-primary-100 p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Customer Segments</h2>
          {(!analytics?.segments || analytics.segments.length === 0) && <p className="text-gray-400">No segment data available yet.</p>}
          <div className="space-y-3">{analytics?.segments?.map((s: any, i: number) => <div key={i} className="rounded-lg bg-primary-50 p-4"><p className="font-semibold">{s.name}</p><p className="text-sm text-gray-500">{s.count} customers</p></div>)}</div>
        </div>
      </div>
    </div>
  );
}
