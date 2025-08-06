import Navbar from '../src/components/Navbar'
import { useStore } from '../src/store/useStore'

export default function SavedOutfits() {
  const { savedOutfits, removeOutfit } = useStore()

  return (
    <div>
      <Navbar />
      <div className="min-h-screen py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">Your Saved Outfits</h1>
          
          {savedOutfits.length === 0 ? (
            <div className="card text-center">
              <div className="text-6xl mb-4">👗</div>
              <h2 className="text-2xl font-semibold mb-4">No saved outfits yet</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Start building outfits and save your favorites!
              </p>
              <a href="/outfit-builder" className="btn-primary">
                Build Outfits
              </a>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedOutfits.map((outfit) => (
                <div key={outfit.id} className="card">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-bold text-lg">Saved Outfit</h3>
                    <button
                      onClick={() => removeOutfit(outfit.id)}
                      className="text-red-500 hover:text-red-700 text-xl"
                    >
                      ×
                    </button>
                  </div>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-purple-500 rounded-full mr-3"></div>
                      <span><strong>Top:</strong> {outfit.top}</span>
                    </div>
                    {outfit.bottom && (
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                        <span><strong>Bottom:</strong> {outfit.bottom}</span>
                      </div>
                    )}
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
                      <span><strong>Accessory:</strong> {outfit.accessory}</span>
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-500 mb-4">
                    Saved: {new Date(outfit.savedAt).toLocaleDateString()}
                  </div>
                  
                  <div className="bg-purple-50 dark:bg-purple-900 p-3 rounded-lg">
                    <p className="text-sm text-purple-700 dark:text-purple-300">
                      ✨ {outfit.confidenceBoost}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}