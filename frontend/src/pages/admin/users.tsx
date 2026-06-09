import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/client';

export function AdminUsers() {
  const [users, setUsers] = useState<any[]>([]);
  const [vendors, setVendors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Form
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('customer');

  const loadData = () => {
    setLoading(true);
    Promise.all([
      api.get('/admin/users'),
      api.get('/admin/vendors')
    ]).then(([usersRes, vendorsRes]) => {
      setUsers(usersRes.data.customers || usersRes.data || []);
      setVendors(vendorsRes.data.vendors || []);
      setLoading(false);
    }).catch(() => setLoading(false));
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/admin/users', { email, password, name, role });
      setEmail(''); setPassword(''); setName(''); setRole('customer');
      loadData();
    } catch (err) {
      alert('Failed to create user');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this user?')) return;
    try {
      await api.delete(`/admin/users/${id}`);
      loadData();
    } catch (err) {
      alert('Failed to delete user');
    }
  };

  const handleRoleChange = async (id: number, newRole: string) => {
    try {
      await api.put(`/admin/users/${id}/role`, { role: newRole });
      loadData();
    } catch {
      alert('Failed to update role');
    }
  };

  const handleVendorStatusChange = async (id: number, status: string) => {
    try {
      await api.put(`/admin/vendors/${id}/status`, { status });
      loadData();
    } catch {
      alert('Failed to update vendor status');
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">User & Vendor Management</h1>
        <Link to="/admin" className="text-primary hover:underline">&larr; Dashboard</Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="col-span-1">
          <form onSubmit={handleCreate} className="bg-white p-6 rounded-lg shadow-sm border space-y-4">
            <h2 className="font-semibold text-lg">Add New User</h2>
            <div>
              <label className="block text-sm mb-1">Name</label>
              <input required className="w-full border p-2 rounded" value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm mb-1">Email</label>
              <input required type="email" className="w-full border p-2 rounded" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm mb-1">Password</label>
              <input required type="password" className="w-full border p-2 rounded" value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm mb-1">Role</label>
              <select className="w-full border p-2 rounded" value={role} onChange={e => setRole(e.target.value)}>
                <option value="customer">Customer</option>
                <option value="vendor">Vendor</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <button type="submit" className="w-full bg-primary text-white p-2 rounded">Create User</button>
          </form>
        </div>

        <div className="col-span-2">
          {loading ? <p>Loading data...</p> : (
            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
              <div className="p-4 bg-gray-50 border-b font-semibold text-lg">System Users</div>
              <table className="w-full text-left">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="p-4">Name</th>
                    <th className="p-4">Email</th>
                    <th className="p-4">Role</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {users.map(u => (
                    <tr key={u.id}>
                      <td className="p-4">{u.name}</td>
                      <td className="p-4 text-gray-500">{u.email}</td>
                      <td className="p-4">
                        <select 
                          className="border rounded px-2 py-1 text-sm bg-gray-50"
                          value={u.role}
                          onChange={(e) => handleRoleChange(u.id, e.target.value)}
                        >
                          <option value="customer">Customer</option>
                          <option value="vendor">Vendor</option>
                          <option value="admin">Admin</option>
                        </select>
                      </td>
                      <td className="p-4 text-right">
                        <button onClick={() => handleDelete(u.id)} className="text-red-500 hover:text-red-700 text-sm">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Vendors Section */}
      {!loading && vendors.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden mb-8">
          <div className="p-4 bg-gray-50 border-b font-semibold text-lg">Vendor Stores</div>
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="p-4">Store Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {vendors.map(v => (
                <tr key={v.id}>
                  <td className="p-4 font-medium">{v.storeName}</td>
                  <td className="p-4 text-gray-500">{v.email}</td>
                  <td className="p-4">
                    <select 
                      className={`border rounded px-2 py-1 text-sm ${v.status === 'active' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-yellow-50 text-yellow-700 border-yellow-200'}`}
                      value={v.status}
                      onChange={(e) => handleVendorStatusChange(v.id, e.target.value)}
                    >
                      <option value="pending">Pending</option>
                      <option value="active">Active</option>
                      <option value="suspended">Suspended</option>
                      <option value="rejected">Rejected</option>
                    </select>
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
