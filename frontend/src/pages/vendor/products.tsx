import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../../api/client'
import { Badge } from '../../components/ui/badge'

export default function VendorProducts() {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  
  // Form state
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [stock, setStock] = useState('')
  const [categoryId, setCategoryId] = useState('1')
  const [file, setFile] = useState<File | null>(null)

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = () => {
    setLoading(true)
    api.get('/vendors/my/dashboard').then(({ data }) => {
      setProducts(data.vendorProducts || [])
      setLoading(false)
    }).catch(() => setLoading(false))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('name', name)
    formData.append('description', description)
    formData.append('price', price)
    formData.append('stock', stock)
    formData.append('categoryId', categoryId)
    if (file) {
      formData.append('image', file)
    }

    try {
      await api.post('/vendors/my/products', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      setShowForm(false)
      loadProducts()
      setName(''); setDescription(''); setPrice(''); setStock(''); setFile(null);
    } catch (err) {
      alert('Failed to create product')
    }
  }

  if (loading && !products.length) return <div className="p-8 text-center">Loading products...</div>

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">My Products</h1>
        <div className="flex gap-4">
          <button onClick={() => setShowForm(!showForm)} className="px-4 py-2 bg-primary text-white rounded">
            {showForm ? 'Cancel' : 'Add Product'}
          </button>
          <Link to="/vendor/dashboard" className="text-primary hover:underline flex items-center">&larr; Dashboard</Link>
        </div>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow mb-6 space-y-4">
          <h2 className="text-xl font-semibold mb-4">Create New Product</h2>
          <div>
            <label className="block text-sm font-medium mb-1">Product Name</label>
            <input required type="text" className="w-full border p-2 rounded" value={name} onChange={e => setName(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea className="w-full border p-2 rounded" value={description} onChange={e => setDescription(e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Price ($)</label>
              <input required type="number" step="0.01" className="w-full border p-2 rounded" value={price} onChange={e => setPrice(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Stock</label>
              <input required type="number" className="w-full border p-2 rounded" value={stock} onChange={e => setStock(e.target.value)} />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select className="w-full border p-2 rounded" value={categoryId} onChange={e => setCategoryId(e.target.value)}>
              <option value="1">Electronics</option>
              <option value="2">Clothing</option>
              <option value="3">Home & Garden</option>
              <option value="4">Sports</option>
              <option value="5">Books</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Product Image</label>
            <input type="file" accept="image/*" onChange={e => setFile(e.target.files?.[0] || null)} className="w-full border p-2 rounded" />
          </div>
          <button type="submit" className="px-4 py-2 bg-primary text-white rounded w-full mt-4">Save Product</button>
        </form>
      )}

      {products.length === 0 && !showForm ? (
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
