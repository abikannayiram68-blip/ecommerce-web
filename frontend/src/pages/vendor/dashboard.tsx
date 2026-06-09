import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../../api/client'

export default function VendorDashboard() {
  const [dashboard, setDashboard] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/vendors/my/dashboard').then(({ data }) => {
      setDashboard(data)
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  if (loading) return <div className="p-8 text-center">Loading dashboard...</div>
  if (!dashboard) return (
    <div className="p-8 text-center">
      <p className="mb-4">You are not registered as a vendor yet.</p>
      <Link to="/vendor/register" className="text-primary hover:underline">Register your store</Link>
    </div>
  )

  const activeProducts = dashboard.vendorProducts?.filter((p: any) => p.status === 'active').length || 0

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">{dashboard.storeName}</h1>
        <span className={`px-3 py-1 rounded text-sm ${dashboard.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
          {dashboard.status}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-500">Total Sales</p>
          <p className="text-2xl font-bold">${Number(dashboard.totalSales).toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-500">Total Payout</p>
          <p className="text-2xl font-bold">${Number(dashboard.totalPayout).toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-500">Rating</p>
          <p className="text-2xl font-bold">{dashboard.rating} ({dashboard.reviewCount} reviews)</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-500">Active Products</p>
          <p className="text-2xl font-bold">{activeProducts}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-500">Balance</p>
          <p className="text-2xl font-bold">${(Number(dashboard.totalSales) - Number(dashboard.totalPayout)).toLocaleString()}</p>
        </div>
      </div>

      <div className="flex gap-4">
        <Link to="/vendor/products" className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90">Manage Products</Link>
        <Link to="/vendor/payouts" className="bg-secondary text-white px-4 py-2 rounded hover:bg-secondary/90">Payout History</Link>
      </div>
    </div>
  )
}
