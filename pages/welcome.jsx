import { useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'

export default function Welcome() {
  const router = useRouter()
  const [email, setEmail] = useState('')

  const handleEmailSubmit = (e) => {
    e.preventDefault()
    localStorage.setItem('userEmail', email)
    router.push('/photo-upload')
  }

  const handleSkip = () => {
    router.push('/photo-upload')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-pink-800 flex items-center justify-center px-4 relative">
      <div className="absolute inset-0 opacity-20">
        <img src="/main.jpg" alt="Fashion Background" className="w-full h-full object-cover" />
      </div>
      <div className="max-w-md w-full relative z-10">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-2xl">
              <span className="text-3xl">👗</span>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">Welcome to ToneFitStyle</h1>
          <p className="text-purple-100 text-lg">
            Discover your perfect style in just a few steps
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
          <form onSubmit={handleEmailSubmit} className="space-y-6">
            <div>
              <label className="block text-white font-medium mb-2">
                Email Address (Optional)
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full p-4 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <p className="text-purple-100 text-sm mt-2">
                Get personalized style tips and updates
              </p>
            </div>

            <div className="space-y-3">
              <button
                type="submit"
                className="w-full bg-white text-purple-800 font-semibold py-4 px-6 rounded-xl hover:bg-purple-50 transition-colors"
              >
                Continue with Email
              </button>
              
              <button
                type="button"
                onClick={handleSkip}
                className="w-full bg-transparent border-2 border-white/30 text-white font-semibold py-4 px-6 rounded-xl hover:bg-white/10 transition-colors"
              >
                Skip for Now
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-purple-100 text-sm">
              By continuing, you agree to our Terms & Privacy Policy
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}