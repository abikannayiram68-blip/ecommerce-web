import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import api from '../../api/client'
import { StarRating } from '../../components/ui/star-rating'
import { Badge } from '../../components/ui/badge'

export default function Storefront() {
  const { slug } = useParams()
  const [store, setStore] = useState<any>(null)
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!slug) return
    api.get(`/stores/${slug}`).then(({ data }) => {
      setStore(data)
      return api.get(`/stores/${slug}/products`)
    }).then(({ data }) => {
      setProducts(data.products || [])
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [slug])

  if (loading) return <div className="p-8 text-center">Loading store...</div>
  if (!store) return <div className="p-8 text-center">Store not found.</div>

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h1 className="text-3xl font-bold mb-2">{store.storeName}</h1>
        {store.description && <p className="text-gray-600 mb-4">{store.description}</p>}
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <StarRating rating={store.rating} readonly /> {store.rating}
          </span>
          <span>{store.reviewCount} reviews</span>
          {store.email && <span>{store.email}</span>}
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-4">Products</h2>
      {products.length === 0 ? (
        <p className="text-gray-500">No products available in this store.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((vp: any) => {
            const p = vp.product || {}
            return (
              <Link key={vp.id} to={`/products/${p.slug}`} className="bg-white rounded-lg shadow p-4 hover:shadow-md transition">
                <div className="h-32 bg-gray-100 rounded mb-3 flex items-center justify-center text-gray-400">Image</div>
                <h3 className="font-semibold">{p.name}</h3>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-lg font-bold">${Number(vp.price || p.price).toFixed(2)}</span>
                  <Badge variant={vp.status === 'active' ? 'primary' : 'secondary'}>{vp.status}</Badge>
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
