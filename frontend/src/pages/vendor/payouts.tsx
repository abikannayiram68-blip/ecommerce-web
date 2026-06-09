import { useState, useEffect } from 'react'
import api from '../../api/client'

export default function VendorPayouts() {
  const [payouts, setPayouts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [amount, setAmount] = useState('')

  useEffect(() => {
    api.get('/payouts/my').then(({ data }) => {
      setPayouts(data.payouts || [])
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  async function requestPayout() {
    if (!amount || isNaN(Number(amount))) return
    try {
      const { data } = await api.post('/payouts/request', { amount: Number(amount) })
      setPayouts((prev) => [data, ...prev])
      setAmount('')
    } catch (err: any) {
      alert(err.response?.data?.message || 'Request failed')
    }
  }

  if (loading) return <div className="p-8 text-center">Loading payouts...</div>

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Payout History</h1>

      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <h2 className="font-semibold mb-3">Request Payout</h2>
        <div className="flex gap-2">
          <input type="number" className="border rounded p-2 flex-1" placeholder="Amount" value={amount}
            onChange={(e) => setAmount(e.target.value)} />
          <button onClick={requestPayout} className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90">Request</button>
        </div>
      </div>

      {payouts.length === 0 ? (
        <p className="text-gray-500">No payouts yet.</p>
      ) : (
        <div className="space-y-3">
          {payouts.map((p: any) => (
            <div key={p.id} className="bg-white rounded-lg shadow p-4 flex items-center justify-between">
              <div>
                <p className="font-semibold">${Number(p.amount).toLocaleString()}</p>
                <p className="text-sm text-gray-500">{new Date(p.createdAt).toLocaleDateString()}</p>
              </div>
              <span className={`px-2 py-1 rounded text-sm ${p.status === 'completed' ? 'bg-green-100 text-green-800' : p.status === 'pending' ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'}`}>
                {p.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
