import { useEffect, useState } from 'react';
import api from '../../api/client';
import { Badge } from '../../components/ui/badge';

interface Promotion {
  id: number;
  title: string;
  description?: string;
  discountPercent: number;
  active: boolean;
  startDate: string;
  endDate: string;
}

export function AdminPromotions() {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [discountPercent, setDiscountPercent] = useState(10);
  const [active, setActive] = useState(true);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    api.get('/promotions').then(({ data }) => setPromotions(data)).catch(() => {});
  }, []);

  const createPromotion = async () => {
    if (!title.trim() || !startDate || !endDate) return;
    const { data } = await api.post('/promotions', { title, description, discountPercent, active, startDate, endDate });
    setPromotions((prev) => [...prev, data]);
    setTitle('');
    setDescription('');
    setDiscountPercent(10);
    setActive(true);
    setStartDate('');
    setEndDate('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface via-primary-50/20 to-surface-alt">
      <div className="mx-auto max-w-5xl px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Promotions Management</h1>

        <div className="rounded-2xl bg-gradient-to-r from-accent-500 to-accent-600 p-6 shadow-lg mb-8">
          <h2 className="text-xl font-bold text-white mb-4">Create New Promotion</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <input
              placeholder="Promotion title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="rounded-lg border-0 px-4 py-2.5 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-primary-400 outline-none"
            />
            <input
              placeholder="Description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="rounded-lg border-0 px-4 py-2.5 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-primary-400 outline-none"
            />
            <input
              placeholder="Discount %"
              value={discountPercent}
              onChange={(e) => setDiscountPercent(+e.target.value)}
              type="number"
              min={0}
              max={100}
              className="rounded-lg border-0 px-4 py-2.5 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-primary-400 outline-none"
            />
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="rounded-lg border-0 px-4 py-2.5 text-gray-800 focus:ring-2 focus:ring-primary-400 outline-none"
            />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="rounded-lg border-0 px-4 py-2.5 text-gray-800 focus:ring-2 focus:ring-primary-400 outline-none"
            />
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 text-white text-sm">
                <input type="checkbox" checked={active} onChange={(e) => setActive(e.target.checked)} />
                Active
              </label>
              <button
                onClick={createPromotion}
                className="rounded-lg bg-primary-600 px-6 py-2.5 font-semibold text-white hover:bg-primary-700 transition-colors shadow-md"
              >
                Create Promotion
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {promotions.length === 0 ? (
            <div className="flex flex-col items-center py-16 text-gray-400">
              <p className="text-lg">No promotions yet</p>
              <p className="text-sm mt-1">Create your first promotion above</p>
            </div>
          ) : (
            promotions.map((p) => (
              <div key={p.id} className="rounded-xl border border-accent-100 bg-surface p-5 shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-100 text-accent-600 font-bold text-lg">
                    {p.discountPercent}%
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{p.title}</h3>
                    {p.description && <p className="text-sm text-gray-500">{p.description}</p>}
                    <div className="flex items-center gap-3 mt-1">
                      <Badge variant={p.active ? 'accent' : 'primary'} size="sm">
                        {p.active ? 'Active' : 'Inactive'}
                      </Badge>
                      <span className="text-xs text-gray-400">{new Date(p.startDate).toLocaleDateString()} - {new Date(p.endDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                <span className="text-2xl font-bold text-accent-600">-{p.discountPercent}%</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
