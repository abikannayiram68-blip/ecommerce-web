import { Navigate } from 'react-router-dom'
import { useAuthStore } from '../../stores/auth-store'

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore()
  if (!isAuthenticated) return <Navigate to="/" replace />
  return <>{children}</>
}
