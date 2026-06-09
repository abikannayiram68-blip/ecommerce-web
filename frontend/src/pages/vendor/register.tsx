import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../api/client'

export default function VendorRegistration() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ storeName: '', email: '', slug: '', description: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState('')

  function validate() {
    const errs: Record<string, string> = {}
    if (!form.storeName.trim()) errs.storeName = 'Store name is required'
    if (!form.email.trim()) errs.email = 'Email is required'
    if (!form.slug.trim()) errs.slug = 'Slug is required'
    return errs
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const errs = validate()
    setErrors(errs)
    if (Object.keys(errs).length > 0) return

    setSubmitting(true)
    try {
      await api.post('/vendors/register', form)
      setMessage('Registration successful! Your store is pending approval.')
      setTimeout(() => navigate('/vendor/dashboard'), 1500)
    } catch (err: any) {
      setMessage(err.response?.data?.message || 'Registration failed')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="max-w-lg mx-auto mt-10 p-6">
      <h1 className="text-2xl font-bold mb-6">Become a Seller</h1>
      {message && (
        <div className={`p-3 rounded mb-4 ${message.includes('successful') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="storeName" className="block text-sm font-medium mb-1">Store Name</label>
          <input id="storeName" className="w-full border rounded p-2" value={form.storeName}
            onChange={(e) => setForm({ ...form, storeName: e.target.value })} />
          {errors.storeName && <p className="text-red-500 text-sm">{errors.storeName}</p>}
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
          <input id="email" type="email" className="w-full border rounded p-2" value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })} />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="slug" className="block text-sm font-medium mb-1">Store URL Slug</label>
          <input id="slug" className="w-full border rounded p-2" value={form.slug}
            onChange={(e) => setForm({ ...form, slug: e.target.value })} />
          {errors.slug && <p className="text-red-500 text-sm">{errors.slug}</p>}
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium mb-1">Description</label>
          <textarea id="description" className="w-full border rounded p-2" rows={3} value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })} />
        </div>
        <button type="submit" disabled={submitting}
          className="w-full bg-primary text-white py-2 rounded hover:bg-primary/90 disabled:opacity-50">
          {submitting ? 'Registering...' : 'Register Store'}
        </button>
      </form>
    </div>
  )
}
