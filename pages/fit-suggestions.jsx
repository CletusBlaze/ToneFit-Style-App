import { useState } from 'react'
import Navbar from '../src/components/Navbar'
import { useStore } from '../src/store/useStore'

export default function FitSuggestions() {
  const { wardrobeItems, user } = useStore()
  const [selectedItem, setSelectedItem] = useState(null)
  const [fitAnalysis, setFitAnalysis] = useState(null)

  const analyzeFit = (item) => {
    setSelectedItem(item)
    
    // Simulate AI fit analysis
    setTimeout(() => {
      const analysis = {
        fitScore: Math.floor(Math.random() * 40) + 60, // 60-100
        issues: [
          'Sleeves appear too long',
          'Waist could be more defined',
          'Color may wash out your skin tone'
        ],
        replacements: [
          {
            type: 'Better Fit',
            suggestion: 'Try a size down for a more tailored look',
            confidence: 85
          },
          {
            type: 'Color Alternative',
            suggestion: 'A warmer tone would complement your skin better',
            confidence: 78
          },
          {
            type: 'Style Upgrade',
            suggestion: 'A wrap style would flatter your body shape more',
            confidence: 92
          }
        ],
        shoppingList: [
          'Wrap top in coral or warm pink',
          'High-waisted bottoms to balance proportions',
          'Statement belt to define waist'
        ]
      }
      
      setFitAnalysis(analysis)
    }, 2000)
  }

  const getFitColor = (score) => {
    if (score >= 80) return 'text-green-600 bg-green-100'
    if (score >= 65) return 'text-yellow-600 bg-yellow-100'
    return 'text-red-600 bg-red-100'
  }

  return (
    <div>
      <Navbar />
      <div className="min-h-screen py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Fit Analysis & Suggestions
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Get AI recommendations to improve your wardrobe pieces
            </p>
          </div>

          {!selectedItem ? (
            <div>
              <h2 className="text-2xl font-semibold mb-6">Select an item to analyze</h2>
              
              {wardrobeItems.length === 0 ? (
                <div className="card text-center">
                  <div className="text-6xl mb-4">👗</div>
                  <h3 className="text-xl font-semibold mb-4">No wardrobe items found</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Upload some clothes first to get fit analysis
                  </p>
                  <a href="/upload-clothes" className="btn-primary">
                    Upload Clothes
                  </a>
                </div>
              ) : (
                <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {wardrobeItems.map((item) => (
                    <div 
                      key={item.id}
                      onClick={() => analyzeFit(item)}
                      className="card cursor-pointer hover:shadow-xl transition-all transform hover:-translate-y-1"
                    >
                      <img 
                        src={item.src} 
                        alt={item.name}
                        className="w-full h-48 object-cover rounded-lg mb-4"
                      />
                      <h3 className="font-semibold mb-2">{item.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 capitalize mb-2">
                        {item.category}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          item.fit === 'Perfect' ? 'bg-green-100 text-green-800' :
                          item.fit === 'Good' ? 'bg-blue-100 text-blue-800' :
                          item.fit === 'Okay' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {item.fit || 'Unknown'} Fit
                        </span>
                        <button className="text-primary hover:text-purple-700 text-sm font-medium">
                          Analyze →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-8">
              {/* Selected Item */}
              <div className="card">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-bold">Analyzing: {selectedItem.name}</h2>
                  <button 
                    onClick={() => {
                      setSelectedItem(null)
                      setFitAnalysis(null)
                    }}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ← Back to Wardrobe
                  </button>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <img 
                      src={selectedItem.src} 
                      alt={selectedItem.name}
                      className="w-full max-w-sm mx-auto rounded-xl shadow-lg"
                    />
                  </div>
                  
                  <div className="flex flex-col justify-center">
                    <div className="space-y-4">
                      <div>
                        <span className="text-sm text-gray-500">Category:</span>
                        <p className="font-medium capitalize">{selectedItem.category}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Current Fit Rating:</span>
                        <p className="font-medium">{selectedItem.fit || 'Unknown'}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Your Body Shape:</span>
                        <p className="font-medium">{user.bodyShape?.type || 'Not set'}</p>
                      </div>
                    </div>
                    
                    {!fitAnalysis && (
                      <button 
                        onClick={() => analyzeFit(selectedItem)}
                        className="mt-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-xl transition-all"
                      >
                        🔍 Analyze Fit
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Analysis Results */}
              {fitAnalysis && (
                <div className="space-y-6">
                  {/* Fit Score */}
                  <div className="card bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900 dark:to-indigo-900">
                    <div className="text-center">
                      <div className={`inline-block text-4xl font-bold px-6 py-3 rounded-full mb-4 ${getFitColor(fitAnalysis.fitScore)}`}>
                        {fitAnalysis.fitScore}/100
                      </div>
                      <h3 className="text-xl font-semibold">Overall Fit Score</h3>
                    </div>
                  </div>

                  {/* Issues Identified */}
                  <div className="card bg-red-50 dark:bg-red-900 border-2 border-red-200 dark:border-red-700">
                    <h3 className="text-xl font-bold text-red-800 dark:text-red-200 mb-4">
                      🚨 Issues Identified
                    </h3>
                    <div className="space-y-2">
                      {fitAnalysis.issues.map((issue, index) => (
                        <div key={index} className="flex items-start">
                          <span className="text-red-500 mr-2">•</span>
                          <p className="text-red-700 dark:text-red-300">{issue}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Replacement Suggestions */}
                  <div className="card bg-green-50 dark:bg-green-900 border-2 border-green-200 dark:border-green-700">
                    <h3 className="text-xl font-bold text-green-800 dark:text-green-200 mb-4">
                      💡 Improvement Suggestions
                    </h3>
                    <div className="space-y-4">
                      {fitAnalysis.replacements.map((replacement, index) => (
                        <div key={index} className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-semibold text-green-800 dark:text-green-200">
                              {replacement.type}
                            </h4>
                            <span className="text-xs bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200 px-2 py-1 rounded-full">
                              {replacement.confidence}% confident
                            </span>
                          </div>
                          <p className="text-gray-700 dark:text-gray-300">{replacement.suggestion}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Shopping List */}
                  <div className="card bg-purple-50 dark:bg-purple-900 border-2 border-purple-200 dark:border-purple-700">
                    <h3 className="text-xl font-bold text-purple-800 dark:text-purple-200 mb-4">
                      🛍️ Recommended Replacements
                    </h3>
                    <div className="space-y-3">
                      {fitAnalysis.shoppingList.map((item, index) => (
                        <div key={index} className="flex items-center justify-between bg-white dark:bg-gray-800 p-3 rounded-lg">
                          <span className="text-gray-700 dark:text-gray-300">{item}</span>
                          <button className="text-purple-600 dark:text-purple-300 hover:text-purple-800 dark:hover:text-purple-100 text-sm font-medium">
                            Find Similar →
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4 justify-center">
                    <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-xl transition-all">
                      Mark as Improved
                    </button>
                    <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-xl transition-all">
                      Remove from Wardrobe
                    </button>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-xl transition-all">
                      Find Replacements
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}