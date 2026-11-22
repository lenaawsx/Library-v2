
import { useState } from 'react'
import { useNavigate } from 'react-router'
import type { FormEvent } from 'react'
import { supabase } from '../../lib/supabase'

export function AuthPage() {
  const navigate = useNavigate()

  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setMessage('')
    setError('')
    setLoading(true)

    try {
      if (isSignUp) {
        const { data, error } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: {
            emailRedirectTo: window.location.origin,
          },
        })

        if (error) throw error

        if (!data.session) {
          setMessage(
            'Регистрация прошла успешно. Проверьте почту и подтвердите адрес.',
          )
        } else {
          navigate('/books', { replace: true })
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        })

        if (error) throw error

        navigate('/books', { replace: true })
      }
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : 'Произошла ошибка. Попробуйте ещё раз.',
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <main>
      <h1>{isSignUp ? 'Регистрация' : 'Вход'}</h1>

      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </label>

        <label>
          Пароль
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            minLength={6}
          />
        </label>

        <button type="submit" disabled={loading}>
          {loading
            ? 'Подождите...'
            : isSignUp
              ? 'Зарегистрироваться'
              : 'Войти'}
        </button>
      </form>

      {message && <p>{message}</p>}
      {error && <p role="alert">{error}</p>}

      <button
        type="button"
        onClick={() => {
          setIsSignUp(!isSignUp)
          setMessage('')
          setError('')
        }}
      >
        {isSignUp
          ? 'Уже есть аккаунт? Войти'
          : 'Нет аккаунта? Зарегистрироваться'}
      </button>
    </main>
  )
}
