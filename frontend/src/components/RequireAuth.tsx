
import { Navigate, Outlet } from 'react-router'
import type { AuthState } from '../hooks/useAuth'

type RequireAuthProps = {
  auth: AuthState
}

export function RequireAuth({ auth }: RequireAuthProps) {
  if (auth.status === 'checking') {
    return <p>Проверка авторизации...</p>
  }

  if (auth.status === 'guest') {
    return <Navigate to="/auth" replace />
  }

  return <Outlet />
}
