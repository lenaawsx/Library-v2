
import { useEffect, useState } from 'react'
import type { Session } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'

export type AuthState =
  | { status: 'checking' }
  | { status: 'guest' }
  | { status: 'authenticated'; session: Session }

function fromSession(session: Session | null): AuthState {
  return session
    ? { status: 'authenticated', session }
    : { status: 'guest' }
}

export function useAuth() {
  const [auth, setAuth] = useState<AuthState>({
    status: 'checking',
  })

  useEffect(() => {
    let active = true
    let initialized = false

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      initialized = true

      if (active) {
        setAuth(fromSession(session))
      }
    })

    supabase.auth.getSession().then(({ data, error }) => {
      if (!active || initialized) return

      if (error) {
        setAuth({ status: 'guest' })
        return
      }

      setAuth(fromSession(data.session))
    })

    return () => {
      active = false
      subscription.unsubscribe()
    }
  }, [])

  return auth
}
