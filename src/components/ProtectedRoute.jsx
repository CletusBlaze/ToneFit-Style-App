import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useStore } from '../store/useStore'

export default function ProtectedRoute({ children }) {
  const router = useRouter()
  const { auth } = useStore()

  useEffect(() => {
    if (!auth.isLoading && !auth.isAuthenticated) {
      router.push('/login')
    }
  }, [auth.isAuthenticated, auth.isLoading, router])

  if (auth.isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    )
  }

  if (!auth.isAuthenticated) {
    return null
  }

  return children
}