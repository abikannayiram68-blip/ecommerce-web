import { Navigate } from 'react-router-dom'
import { useAuthStore } from '../../stores/auth-store'

export function VendorGuard({ children, vendorId }: { children: React.ReactNode; vendorId: number | null }) {
  const { isAuthenticated } = useAuthStore()
  if (!isAuthenticated) return <Navigate to="/" replace />
  if (!vendorId) return <Navigate to="/vendor/register" replace />
  return <>{children}</>
}
