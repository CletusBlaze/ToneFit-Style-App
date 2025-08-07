import { useEffect } from 'react'
import { useStore } from '../store/useStore'

export default function AuthProvider({ children }) {
  const { initializeAuth } = useStore()

  useEffect(() => {
    // Initialize authentication state on app load
    initializeAuth()
  }, [initializeAuth])

  return children
}