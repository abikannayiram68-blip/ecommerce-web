import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../../api/client'
import { Badge } from '../../components/ui/badge'

export default function VendorProducts() {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    api.get('/vendors/my/profile').then(({ data: vendor }) => {
      return api.get(`/stores/${vendor.slug}/products`)
    }).then(({ data }) => {
      setProducts(data.products || [])
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  if (loading) return <div className="p-8 text-center">Loading products...</div>

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">My Products</h1>
        <Link to="/vendor/dashboard" className="text-primary hover:underline">&larr; Dashboard</Link>
      </div>

      {products.length === 0 ? (
        <p className="text-gray-500">No products assigned to your store yet.</p>
      ) : (
        <div className="space-y-3">
          {products.map((vp: any) => (
            <div key={vp.id} className="bg-white rounded-lg shadow p-4 flex items-center justify-between">
              <div>
                <p className="font-semibold">{vp.product?.name || `Product #${vp.productId}`}</p>
                {vp.price && <p className="text-sm text-gray-500">${Number(vp.price).toFixed(2)}</p>}
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={vp.status === 'active' ? 'primary' : vp.status === 'inactive' ? 'secondary' : 'accent'}>
                  {vp.status}
                </Badge>
                <span className="text-sm text-gray-500">Stock: {vp.stock ?? 'N/A'}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
