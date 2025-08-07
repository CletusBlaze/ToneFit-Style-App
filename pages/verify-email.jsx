import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Navbar from '../src/components/Navbar'
import { verifyEmail, resendVerification } from '../src/utils/auth'

export default function VerifyEmail() {
  const router = useRouter()
  const { token, email } = router.query
  const [isLoading, setIsLoading] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [isVerified, setIsVerified] = useState(false)

  useEffect(() => {
    if (token) {
      handleVerification()
    }
  }, [token])

  const handleVerification = async () => {
    setIsLoading(true)
    try {
      const result = await verifyEmail(token)
      setMessage(result.message)
      setIsVerified(true)
      setTimeout(() => router.push('/login'), 3000)
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleResend = async () => {
    if (!email) {
      setError('Email address is required to resend verification')
      return
    }
    
    setIsResending(true)
    setError('')
    setMessage('')
    
    try {
      const result = await resendVerification(email)
      setMessage(result.message)
    } catch (err) {
      setError(err.message)
    } finally {
      setIsResending(false)
    }
  }

  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              {isVerified ? 'Email Verified!' : 'Verify Your Email'}
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              {isVerified 
                ? 'Your email has been successfully verified. Redirecting to login...'
                : token 
                  ? 'Verifying your email address...'
                  : 'Check your email for verification instructions'
              }
            </p>
          </div>
          
          {isLoading && (
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
              <p className="mt-2 text-gray-600 dark:text-gray-400">Verifying...</p>
            </div>
          )}
          
          {message && (
            <div className="bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700 rounded-md p-4">
              <p className="text-green-800 dark:text-green-200 text-sm">{message}</p>
            </div>
          )}
          
          {error && (
            <div className="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-md p-4">
              <p className="text-red-800 dark:text-red-200 text-sm">{error}</p>
            </div>
          )}
          
          {!token && !isVerified && (
            <div className="space-y-4">
              <p className="text-center text-gray-600 dark:text-gray-400">
                Didn't receive the email? Check your spam folder or request a new one.
              </p>
              
              {email && (
                <button
                  onClick={handleResend}
                  disabled={isResending}
                  className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50"
                >
                  {isResending ? 'Sending...' : 'Resend Verification Email'}
                </button>
              )}
            </div>
          )}
          
          <div className="text-center">
            <Link href="/login" className="font-medium text-purple-600 hover:text-purple-500">
              Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}