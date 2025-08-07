import { useState } from 'react'
import Navbar from '../src/components/Navbar'
import { useStore } from '../src/store/useStore'
import { generateOutfitRecommendations } from '../src/utils/outfitEngine'
import { shareToSocialMedia, generateShareableContent } from '../src/utils/socialSharing'

// Static outfit images for preview
const outfitImages = {
  Pear: ['/outfits/pear-1.jpg', '/outfits/pear-2.jpg'],
  Apple: ['/outfits/apple-1.jpg', '/outfits/apple-2.jpg'],
  Rectangle: ['/outfits/rectangle-1.jpg', '/outfits/rectangle-2.jpg'],
  Hourglass: ['/outfits/hourglass-1.jpg', '/outfits/hourglass-2.jpg']
}

export default function OutfitBuilder() {
  const { user, saveOutfit } = useStore()
  const [selectedOutfit, setSelectedOutfit] = useState(null)
  const [selectedOccasion, setSelectedOccasion] = useState('all')
  
  const occasions = ['all', 'casual', 'work', 'date', 'party']
  const suggestions = user.bodyShape ? generateOutfitRecommendations(user.bodyShape.type, user.skinTone, selectedOccasion === 'all' ? 'casual' : selectedOccasion) : []

  return (
    <div>
      <Navbar />
      <div className="min-h-screen py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">Outfit Builder</h1>
          
          {!user.bodyShape ? (
            <div className="card text-center">
              <h2 className="text-xl font-semibold mb-4">Complete Your Profile First</h2>
              <p className="text-gray-600 mb-6">
                To get personalized outfit suggestions, please complete your body shape analysis.
              </p>
              <a href="/measurement" className="btn-primary">
                Start Analysis
              </a>
            </div>
          ) : (
            <>
              <div className="card mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">
                    Perfect Outfits for {user.bodyShape.type} Shape
                  </h2>
                  <select
                    value={selectedOccasion}
                    onChange={(e) => setSelectedOccasion(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="all">All Occasions</option>
                    <option value="casual">Casual</option>
                    <option value="work">Work</option>
                    <option value="date">Date</option>
                    <option value="party">Party</option>
                  </select>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                  {suggestions.map((outfit, index) => (
                    <div 
                      key={index}
                      className={`overflow-hidden rounded-2xl border-2 cursor-pointer transition-all transform hover:scale-105 ${
                        selectedOutfit === index 
                          ? 'border-primary ring-4 ring-primary ring-opacity-30 shadow-2xl' 
                          : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 shadow-lg'
                      }`}
                      onClick={() => setSelectedOutfit(index)}
                    >
                      {/* Outfit Preview Image */}
                      <div className="relative h-64 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-6xl mb-2">👗</div>
                            <p className="text-sm text-gray-600 dark:text-gray-300">Outfit Preview</p>
                          </div>
                        </div>
                        <div className="absolute top-4 right-4">
                          <span className="bg-white dark:bg-gray-800 text-xs px-3 py-1 rounded-full font-medium capitalize shadow-lg">
                            {selectedOccasion === 'all' ? 'versatile' : selectedOccasion}
                          </span>
                        </div>
                      </div>
                      
                      {/* Outfit Details */}
                      <div className="p-6 bg-white dark:bg-gray-800">
                        <h3 className="font-bold text-lg mb-4 text-gray-900 dark:text-white">Outfit {index + 1}</h3>
                        <div className="space-y-3">
                          <div className="flex items-center">
                            <div className="w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mr-3"></div>
                            <span className="text-gray-700 dark:text-gray-300"><strong>Top:</strong> {outfit.top}</span>
                          </div>
                          {outfit.bottom && (
                            <div className="flex items-center">
                              <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full mr-3"></div>
                              <span className="text-gray-700 dark:text-gray-300"><strong>Bottom:</strong> {outfit.bottom}</span>
                            </div>
                          )}
                          <div className="flex items-center">
                            <div className="w-4 h-4 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full mr-3"></div>
                            <span className="text-gray-700 dark:text-gray-300"><strong>Accessory:</strong> {outfit.accessory}</span>
                          </div>
                        </div>
                        
                        {/* Confidence Boost */}
                        <div className="mt-4 p-3 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900 dark:to-pink-900 rounded-lg">
                          <p className="text-sm text-purple-700 dark:text-purple-300 font-medium">
                            ✨ {outfit.confidenceBoost}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {selectedOutfit !== null && suggestions[selectedOutfit] && (
                <div className="card bg-gradient-to-br from-white to-purple-50 dark:from-gray-800 dark:to-purple-900 border-2 border-purple-200 dark:border-purple-700">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Style Analysis</h3>
                    <div className="text-4xl mb-4">🎯</div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white dark:bg-gray-700 p-6 rounded-xl">
                      <h4 className="font-bold text-purple-600 dark:text-purple-300 mb-3">Why This Works</h4>
                      <p className="text-gray-700 dark:text-gray-300 mb-3">
                        {suggestions[selectedOutfit].styleReason}
                      </p>
                      <div className="text-sm text-purple-600 dark:text-purple-300 font-medium">
                        Perfect for {user.bodyShape.type} body shape
                      </div>
                    </div>
                    
                    <div className="bg-white dark:bg-gray-700 p-6 rounded-xl">
                      <h4 className="font-bold text-pink-600 dark:text-pink-300 mb-3">Color Harmony</h4>
                      <p className="text-gray-700 dark:text-gray-300 mb-3">
                        {suggestions[selectedOutfit].colorMatch}
                      </p>
                      <div className="text-sm text-pink-600 dark:text-pink-300 font-medium">
                        Complements your skin tone beautifully
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex gap-4 justify-center">
                    <button 
                      onClick={() => {
                        saveOutfit(suggestions[selectedOutfit])
                        alert('Outfit saved to your profile! ✨')
                      }}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-xl transition-all"
                    >
                      Save Outfit ❤️
                    </button>
                    <button 
                      onClick={() => {
                        const shareContent = generateShareableContent({
                          image: '/outfit-preview.jpg',
                          description: `Check out this ${selectedOccasion} outfit perfect for ${user.bodyShape?.type} body shape!`,
                          occasion: selectedOccasion
                        }, user)
                        shareToSocialMedia('instagram', shareContent)
                      }}
                      className="bg-gradient-to-r from-pink-600 to-red-600 hover:from-pink-700 hover:to-red-700 text-white font-semibold py-3 px-6 rounded-xl transition-all"
                    >
                      Share 📤
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}