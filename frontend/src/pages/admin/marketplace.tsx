import { useState, useEffect } from 'react'
import api from '../../api/client'
import { Badge } from '../../components/ui/badge'

type Tab = 'payouts' | 'disputes' | 'commissions'

export default function AdminMarketplace() {
  const [tab, setTab] = useState<Tab>('payouts')
  const [payouts, setPayouts] = useState<any[]>([])
  const [disputes, setDisputes] = useState<any[]>([])
  const [plans, setPlans] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      api.get('/payouts'),
      api.get('/marketplace/disputes').catch(() => ({ data: [] })),
      api.get('/commission/plans'),
    ]).then(([pData, dData, cData]) => {
      setPayouts(pData.data.payouts || [])
      setDisputes(dData.data || [])
      setPlans(cData.data || [])
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  async function updatePayoutStatus(id: number, status: string) {
    const { data } = await api.put(`/payouts/${id}/status`, { status })
    setPayouts((prev) => prev.map((p) => p.id === id ? data : p))
  }

  if (loading) return <div className="p-8 text-center">Loading marketplace...</div>

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Marketplace Management</h1>

      <div className="flex gap-2 mb-6">
        {(['payouts', 'disputes', 'commissions'] as Tab[]).map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-4 py-2 rounded capitalize ${tab === t ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-gray-200'}`}>
            {t}
          </button>
        ))}
      </div>

      {tab === 'payouts' && (
        <div className="space-y-3">
          <h2 className="text-lg font-semibold">Payout Requests</h2>
          {payouts.length === 0 ? <p className="text-gray-500">No payouts.</p> : (
            payouts.map((p: any) => (
              <div key={p.id} className="bg-white rounded-lg shadow p-4 flex items-center justify-between">
                <div>
                  <p className="font-semibold">${Number(p.amount).toLocaleString()}</p>
                  <p className="text-sm text-gray-500">{p.vendor?.storeName} &middot; {new Date(p.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={p.status === 'completed' ? 'primary' : p.status === 'pending' ? 'accent' : 'secondary'}>
                    {p.status}
                  </Badge>
                  {p.status === 'pending' && (
                    <button onClick={() => updatePayoutStatus(p.id, 'completed')}
                      className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600">Complete</button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {tab === 'disputes' && (
        <div className="space-y-3">
          <h2 className="text-lg font-semibold">Disputes</h2>
          {disputes.length === 0 ? <p className="text-gray-500">No disputes.</p> : (
            disputes.map((d: any) => (
              <div key={d.id} className="bg-white rounded-lg shadow p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-semibold">{d.reason}</p>
                  <Badge variant={d.status === 'open' ? 'accent' : d.status === 'resolved' ? 'primary' : 'secondary'}>{d.status}</Badge>
                </div>
                <p className="text-sm text-gray-500">Raised by: {d.raisedBy} &middot; Order #{d.orderId}</p>
              </div>
            ))
          )}
        </div>
      )}

      {tab === 'commissions' && (
        <div className="space-y-3">
          <h2 className="text-lg font-semibold">Commission Plans</h2>
          {plans.length === 0 ? <p className="text-gray-500">No commission plans.</p> : (
            <div className="grid gap-3">
              {plans.map((p: any) => (
                <div key={p.id} className="bg-white rounded-lg shadow p-4 flex items-center justify-between">
                  <div>
                    <p className="font-semibold">{p.name} {p.isDefault && <Badge variant="accent">Default</Badge>}</p>
                    <p className="text-sm text-gray-500">Rate: {p.rate}% &middot; Min Payout: ${Number(p.minPayout).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
