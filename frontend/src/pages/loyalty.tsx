import { useEffect } from 'react';
import { useAuthStore } from '../stores/auth-store';
import { useLoyaltyStore } from '../stores/loyalty-store';

export function LoyaltyPage() {
  const user = useAuthStore((s: any) => s.user);
  const { loyalty, fetchLoyalty } = useLoyaltyStore();

  useEffect(() => {
    if (user?.id) {
      fetchLoyalty(user.id);
    }
  }, [user, fetchLoyalty]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface via-primary-50/20 to-surface-alt">
      <div className="mx-auto max-w-3xl px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Loyalty Program</h1>
        <div className="rounded-xl bg-gradient-to-br from-accent-500 to-accent-600 p-8 shadow-lg text-white mb-6">
          <p className="text-lg opacity-80">Your Points Balance</p>
          <p className="text-5xl font-bold mt-2">{loyalty?.balance ?? 0}</p>
        </div>
        <div className="rounded-xl bg-white border border-primary-100 p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-800 mb-4">How to Earn Points</h2>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-center gap-3"><span className="text-accent-500 text-xl">🛒</span> Earn 1 point for every $1 spent</li>
            <li className="flex items-center gap-3"><span className="text-accent-500 text-xl">⭐</span> Earn 50 points for writing a review</li>
            <li className="flex items-center gap-3"><span className="text-accent-500 text-xl">👥</span> Earn 100 points for each successful referral</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
