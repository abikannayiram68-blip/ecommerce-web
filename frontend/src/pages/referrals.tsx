import { useEffect } from 'react';
import { useAuthStore } from '../stores/auth-store';
import { useReferralStore } from '../stores/referral-store';

export function ReferralPage() {
  const user = useAuthStore((s: any) => s.user);
  const { referrals, rewards, fetchReferrals } = useReferralStore();

  useEffect(() => {
    if (user?.id) {
      fetchReferrals(user.id);
    }
  }, [user, fetchReferrals]);

  const referralLink = user ? `${window.location.origin}/register?ref=${user.id}` : '';

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface via-primary-50/20 to-surface-alt">
      <div className="mx-auto max-w-3xl px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Referral Program</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 p-6 shadow-lg text-white">
            <p className="text-sm opacity-80">Total Referrals</p>
            <p className="text-3xl font-bold mt-1">{rewards?.referralCount ?? 0}</p>
          </div>
          <div className="rounded-xl bg-gradient-to-br from-secondary-500 to-secondary-600 p-6 shadow-lg text-white">
            <p className="text-sm opacity-80">Reward Points Earned</p>
            <p className="text-3xl font-bold mt-1">{rewards?.totalRewards ?? 0}</p>
          </div>
        </div>
        <div className="rounded-xl bg-white border border-primary-100 p-6 shadow-sm mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Your Referral Link</h2>
          <div className="flex gap-3">
            <input className="flex-1 rounded-xl border border-primary-200 p-3 text-sm bg-gray-50" readOnly value={referralLink} />
            <button className="rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 px-6 py-3 text-white font-semibold shadow hover:opacity-90" onClick={() => navigator.clipboard.writeText(referralLink)}>Copy</button>
          </div>
        </div>
        <div className="rounded-xl bg-white border border-primary-100 p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Your Referrals</h2>
          {(!referrals || referrals.length === 0) && <p className="text-gray-400">No referrals yet. Share your link to earn rewards!</p>}
          <div className="space-y-3">{(referrals || []).map((r: any, i: number) => <div key={i} className="flex justify-between rounded-lg bg-primary-50 p-4"><span className="font-semibold">Referee #{r.refereeId}</span><span className={`text-sm font-medium ${r.status === 'completed' ? 'text-green-600' : 'text-yellow-600'}`}>{r.status}</span></div>)}</div>
        </div>
      </div>
    </div>
  );
}
