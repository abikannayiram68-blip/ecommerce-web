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
    <div className="min-h-screen bg-gradient-to-br from-surface via-primary-50/20 to-surface-alt py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
      <div className="max-w-md w-full mx-auto">
        <div className="text-center mb-10">
          <h2 className="mt-6 text-4xl font-extrabold text-gray-900 tracking-tight">Become a Seller</h2>
          <p className="mt-3 text-lg text-gray-500">
            Join our premium marketplace and reach millions of customers today.
          </p>
        </div>

        <div className="bg-white py-10 px-8 shadow-2xl rounded-2xl border border-primary-100 backdrop-blur-sm backdrop-filter transition-all">
          {message && (
            <div className={`p-4 rounded-xl mb-6 text-sm font-medium flex items-center gap-3 ${message.includes('successful') ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
              <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="storeName" className="block text-sm font-semibold text-gray-700 mb-2">Store Name</label>
              <input id="storeName" className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all shadow-sm" placeholder="e.g. Acme Corporation" value={form.storeName}
                onChange={(e) => setForm({ ...form, storeName: e.target.value })} />
              {errors.storeName && <p className="text-red-500 text-xs mt-2 font-medium">{errors.storeName}</p>}
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">Business Email</label>
              <input id="email" type="email" className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all shadow-sm" placeholder="contact@acme.com" value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })} />
              {errors.email && <p className="text-red-500 text-xs mt-2 font-medium">{errors.email}</p>}
            </div>
            
            <div>
              <label htmlFor="slug" className="block text-sm font-semibold text-gray-700 mb-2">Store URL Slug</label>
              <div className="flex rounded-xl shadow-sm border border-gray-200 focus-within:ring-2 focus-within:ring-primary-500 focus-within:border-transparent overflow-hidden transition-all">
                <span className="inline-flex items-center px-4 bg-gray-50 text-gray-500 text-sm font-medium border-r border-gray-200">
                  shophub.com/
                </span>
                <input id="slug" className="flex-1 px-4 py-3 text-gray-900 focus:outline-none" placeholder="acme" value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-') })} />
              </div>
              {errors.slug && <p className="text-red-500 text-xs mt-2 font-medium">{errors.slug}</p>}
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">Store Description</label>
              <textarea id="description" className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all shadow-sm resize-none" rows={4} placeholder="Tell us about what you sell..." value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })} />
            </div>

            <div className="pt-2">
              <button type="submit" disabled={submitting}
                className="w-full flex justify-center items-center py-3.5 px-4 border border-transparent rounded-xl shadow-md text-sm font-bold text-white bg-gradient-to-r from-primary-600 to-secondary-500 hover:from-primary-700 hover:to-secondary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-70 transition-all transform hover:-translate-y-0.5">
                {submitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : 'Register Store'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
