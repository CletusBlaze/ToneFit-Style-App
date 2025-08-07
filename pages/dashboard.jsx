import Link from 'next/link'
import Navbar from '../src/components/Navbar'
import { useStore } from '../src/store/useStore'

export default function Dashboard() {
  const { user } = useStore()

  return (
    <div>
      <Navbar />
      <div className="min-h-screen py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <img 
              src="/3.jfif" 
              alt="Style Dashboard" 
              className="w-32 h-32 object-cover rounded-full mx-auto mb-4 border-4 border-purple-200 shadow-xl"
            />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Your Style Dashboard</h1>
          </div>
          
          {user.bodyShape && (
            <div className="card mb-8">
              <h2 className="text-xl font-semibold mb-4">Your Profile</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600">Body Shape:</p>
                  <p className="font-semibold text-primary">{user.bodyShape.type}</p>
                </div>
                {user.skinTone && (
                  <div>
                    <p className="text-gray-600">Skin Tone:</p>
                    <p className="font-semibold text-secondary">{user.skinTone.name}</p>
                  </div>
                )}
              </div>
            </div>
          )}
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="card">
              <h3 className="text-xl font-semibold mb-3">✨ Today's Style Picks</h3>
              <p className="text-gray-600 mb-4">Curated outfits just for you</p>
              <Link href="/outfit-builder" className="btn-primary text-sm">
                View Picks
              </Link>
            </div>
            
            <div className="card">
              <h3 className="text-xl font-semibold mb-3">🧥 Outfit Builder</h3>
              <p className="text-gray-600 mb-4">Mix and match your wardrobe</p>
              <Link href="/outfit-builder" className="btn-secondary text-sm">
                Start Building
              </Link>
            </div>
            
            <div className="card">
              <h3 className="text-xl font-semibold mb-3">🎨 Color Guide</h3>
              <p className="text-gray-600 mb-4">Your perfect color palette</p>
              <Link href="/skintone" className="btn-primary text-sm">
                View Colors
              </Link>
            </div>
            
            <div className="card">
              <h3 className="text-xl font-semibold mb-3">🧍 Shape Guide</h3>
              <p className="text-gray-600 mb-4">Style tips for your body type</p>
              <Link href="/measurement" className="btn-secondary text-sm">
                View Guide
              </Link>
            </div>
            
            <div className="card">
              <h3 className="text-xl font-semibold mb-3">📷 Upload Clothes</h3>
              <p className="text-gray-600 mb-4">Add items to your virtual closet</p>
              <Link href="/upload-clothes" className="btn-primary text-sm">
                Upload Now
              </Link>
            </div>
            
            <div className="card">
              <h3 className="text-xl font-semibold mb-3">🛍️ Brand Matches</h3>
              <p className="text-gray-600 mb-4">Brands that fit your style</p>
              <Link href="/brands" className="btn-secondary text-sm">
                Explore Brands
              </Link>
            </div>
            
            <div className="card">
              <h3 className="text-xl font-semibold mb-3">🤖 AI Stylist</h3>
              <p className="text-gray-600 mb-4">Get real-time fashion advice</p>
              <Link href="/ai-stylist" className="btn-primary text-sm">
                Chat Now
              </Link>
            </div>
            
            <div className="card">
              <h3 className="text-xl font-semibold mb-3">📝 Style Tips</h3>
              <p className="text-gray-600 mb-4">Personalized styling advice</p>
              <Link href="/style-tips" className="btn-secondary text-sm">
                View Tips
              </Link>
            </div>
          </div>
          
          {user.bodyShape && (
            <div className="card mt-8">
              <h3 className="text-xl font-semibold mb-3">💡 Your Style Tip of the Day</h3>
              <p className="text-gray-700">{user.bodyShape.advice}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}