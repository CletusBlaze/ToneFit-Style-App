import Link from 'next/link'
import Image from 'next/image'
import Navbar from '../src/components/Navbar'
import Logo3D from '../src/components/Logo3D'

export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-8">
            <div className="relative">
              <img 
                src="/7.jfif" 
                alt="Fashion Style" 
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-2xl"
              />
              <div className="absolute -bottom-2 -right-2">
                <Logo3D size="md" />
              </div>
            </div>
          </div>
          <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent mb-6">
            ToneFitStyle
          </h1>
          <p className="text-2xl text-gray-600 dark:text-gray-300 mb-8 font-light">
            Dress smart. Feel confident. Own your tone.
          </p>
          <p className="text-lg text-gray-500 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Discover your perfect style with personalized outfit suggestions based on your body shape and skin tone
          </p>
          
          <div className="mb-12">
            <img 
              src="/main.jpg" 
              alt="Style Inspiration" 
              className="w-full max-w-4xl mx-auto rounded-2xl shadow-2xl object-contain h-[500px]"
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/welcome" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-4 px-8 rounded-2xl transition-all transform hover:scale-105 shadow-2xl hover:shadow-purple-500/25">
              ✨ Get Started
            </Link>
            <Link href="/onboarding" className="bg-white dark:bg-gray-800 text-purple-600 dark:text-purple-400 border-2 border-purple-200 dark:border-purple-700 hover:bg-purple-50 dark:hover:bg-purple-900 font-semibold py-4 px-8 rounded-2xl transition-all transform hover:scale-105 shadow-xl">
              🚀 Explore Features
            </Link>
          </div>
          
          <div className="mt-20 grid md:grid-cols-3 gap-8">
            <div className="group card bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900 dark:to-purple-800 border-2 border-purple-200 dark:border-purple-700 hover:shadow-2xl hover:shadow-purple-500/20 transition-all transform hover:-translate-y-2">
              <img src="/1.jfif" alt="Body Shape Analysis" className="w-full h-64 object-contain rounded-lg mb-4 group-hover:scale-105 transition-transform" />
              <h3 className="text-xl font-bold mb-3 text-purple-800 dark:text-purple-200">Body Shape Analysis</h3>
              <p className="text-gray-600 dark:text-gray-300">Get personalized style tips based on your measurements</p>
            </div>
            <div className="group card bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-900 dark:to-pink-800 border-2 border-pink-200 dark:border-pink-700 hover:shadow-2xl hover:shadow-pink-500/20 transition-all transform hover:-translate-y-2">
              <img src="/2.jfif" alt="Skin Tone Matching" className="w-full h-64 object-contain rounded-lg mb-4 group-hover:scale-105 transition-transform" />
              <h3 className="text-xl font-bold mb-3 text-pink-800 dark:text-pink-200">Skin Tone Matching</h3>
              <p className="text-gray-600 dark:text-gray-300">Find colors that make you glow with confidence</p>
            </div>
            <div className="group card bg-gradient-to-br from-yellow-50 to-orange-100 dark:from-yellow-900 dark:to-orange-900 border-2 border-yellow-200 dark:border-yellow-700 hover:shadow-2xl hover:shadow-yellow-500/20 transition-all transform hover:-translate-y-2">
              <img src="/3.jfif" alt="Smart Outfit Pairing" className="w-full h-48 object-cover rounded-lg mb-4 group-hover:scale-105 transition-transform" />
              <h3 className="text-xl font-bold mb-3 text-yellow-800 dark:text-yellow-200">Smart Outfit Pairing</h3>
              <p className="text-gray-600 dark:text-gray-300">Mix and match your wardrobe like a pro stylist</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}