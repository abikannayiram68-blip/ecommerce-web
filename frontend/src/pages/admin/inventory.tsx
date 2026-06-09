import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/client';

export function AdminInventory() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [categoryId, setCategoryId] = useState('1');
  const [file, setFile] = useState<File | null>(null);

  const loadProducts = () => {
    setLoading(true);
    api.get('/products?limit=100').then(({ data }) => {
      setProducts(data.products || []);
      setLoading(false);
    }).catch(() => setLoading(false));
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data: product } = await api.post('/admin/products', { name, price: Number(price), stock: Number(stock), categoryId: Number(categoryId), isActive: true, description: 'New product' });
      
      if (file) {
        const formData = new FormData();
        formData.append('image', file);
        await api.post(`/products/${product.id}/images`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }

      setShowForm(false);
      setName(''); setPrice(''); setStock(''); setFile(null);
      loadProducts();
    } catch {
      alert('Failed to create product');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this product?')) return;
    try {
      await api.delete(`/admin/products/${id}`);
      loadProducts();
    } catch {
      alert('Failed to delete product');
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Global Inventory</h1>
        <div className="flex gap-4">
          <button onClick={() => setShowForm(!showForm)} className="bg-primary text-white px-4 py-2 rounded">
            {showForm ? 'Cancel' : 'Add Product'}
          </button>
          <Link to="/admin" className="text-primary hover:underline flex items-center">&larr; Dashboard</Link>
        </div>
      </div>

      {showForm && (
        <form onSubmit={handleCreate} className="bg-white p-6 rounded-lg shadow-sm border mb-6 space-y-4">
          <h2 className="font-semibold text-lg">Create Product</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1">Name</label>
              <input required className="w-full border p-2 rounded" value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm mb-1">Category</label>
              <select className="w-full border p-2 rounded" value={categoryId} onChange={e => setCategoryId(e.target.value)}>
                <option value="1">Electronics</option>
                <option value="2">Clothing</option>
                <option value="3">Home & Garden</option>
                <option value="4">Sports</option>
                <option value="5">Books</option>
              </select>
            </div>
            <div>
              <label className="block text-sm mb-1">Price</label>
              <input required type="number" step="0.01" className="w-full border p-2 rounded" value={price} onChange={e => setPrice(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm mb-1">Stock</label>
              <input required type="number" className="w-full border p-2 rounded" value={stock} onChange={e => setStock(e.target.value)} />
            </div>
            <div className="col-span-2">
              <label className="block text-sm mb-1">Product Image</label>
              <input type="file" accept="image/*" className="w-full border p-2 rounded" onChange={e => setFile(e.target.files?.[0] || null)} />
            </div>
          </div>
          <button type="submit" className="bg-primary text-white px-4 py-2 rounded w-full">Save Product</button>
        </form>
      )}

      {loading ? <p>Loading inventory...</p> : (
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="p-4">Product</th>
                <th className="p-4">SKU</th>
                <th className="p-4">Price</th>
                <th className="p-4">Stock Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {products.map(p => (
                <tr key={p.id}>
                  <td className="p-4 font-medium">{p.name}</td>
                  <td className="p-4 text-gray-500">{p.sku}</td>
                  <td className="p-4">${Number(p.price).toFixed(2)}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${p.stock > 10 ? 'bg-green-500' : p.stock > 0 ? 'bg-yellow-500' : 'bg-red-500'}`} />
                      <span className={p.stock > 10 ? 'text-green-700' : p.stock > 0 ? 'text-yellow-700' : 'text-red-700'}>
                        {p.stock} in stock
                      </span>
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <button onClick={() => handleDelete(p.id)} className="text-red-500 hover:underline">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
