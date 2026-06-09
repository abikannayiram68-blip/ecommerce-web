import { Navigate } from 'react-router-dom'
import { useAuthStore } from '../../stores/auth-store'

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, user } = useAuthStore()
  if (!isAuthenticated || user?.role !== 'admin') return <Navigate to="/" replace />
  return <>{children}</>
}
