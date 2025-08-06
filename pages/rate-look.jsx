import { useState } from 'react'
import Navbar from '../src/components/Navbar'
import { useStore } from '../src/store/useStore'

export default function RateLook() {
  const { user } = useStore()
  const [outfitPhoto, setOutfitPhoto] = useState(null)
  const [analyzing, setAnalyzing] = useState(false)
  const [aiRating, setAiRating] = useState(null)

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setOutfitPhoto(e.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const analyzeOutfit = async () => {
    setAnalyzing(true)
    
    // Simulate AI analysis
    setTimeout(() => {
      const rating = {
        overall: Math.floor(Math.random() * 30) + 70, // 70-100
        color: Math.floor(Math.random() * 30) + 70,
        fit: Math.floor(Math.random() * 30) + 70,
        style: Math.floor(Math.random() * 30) + 70,
        occasion: Math.floor(Math.random() * 30) + 70,
        feedback: [
          'Great color coordination!',
          'The fit complements your body shape well',
          'Consider adding a statement accessory',
          'Perfect for the occasion you described'
        ],
        improvements: [
          'Try tucking in the top for a more polished look',
          'A belt would help define your waist',
          'Consider switching to nude shoes for versatility'
        ],
        confidence: Math.random() * 0.2 + 0.8 // 80-100%
      }
      
      setAiRating(rating)
      setAnalyzing(false)
    }, 3000)
  }

  const getRatingColor = (score) => {
    if (score >= 85) return 'text-green-600 bg-green-100'
    if (score >= 70) return 'text-yellow-600 bg-yellow-100'
    return 'text-red-600 bg-red-100'
  }

  const getRatingEmoji = (score) => {
    if (score >= 90) return '🔥'
    if (score >= 80) return '✨'
    if (score >= 70) return '👍'
    return '💡'
  }

  return (
    <div>
      <Navbar />
      <div className="min-h-screen py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Rate Your Look
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Get AI feedback on your outfit choices
            </p>
          </div>

          {!outfitPhoto ? (
            <div className="card text-center">
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 mb-6">
                <div className="text-6xl mb-4">📸</div>
                <h2 className="text-2xl font-semibold mb-4">Upload Your Outfit Photo</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Take a full-body photo of your current outfit for AI analysis
                </p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                  id="outfit-upload"
                />
                <label 
                  htmlFor="outfit-upload" 
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-4 px-8 rounded-xl cursor-pointer transition-all transform hover:scale-105"
                >
                  Choose Photo
                </label>
              </div>
              
              <div className="text-sm text-gray-500">
                <p>Tips for best results:</p>
                <ul className="mt-2 space-y-1">
                  <li>• Use good lighting</li>
                  <li>• Show full outfit</li>
                  <li>• Stand straight</li>
                  <li>• Clear background</li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Photo Preview */}
              <div className="card">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <img 
                      src={outfitPhoto} 
                      alt="Your outfit" 
                      className="w-full max-w-sm mx-auto rounded-xl shadow-lg"
                    />
                  </div>
                  
                  <div className="flex flex-col justify-center">
                    <h2 className="text-2xl font-bold mb-4">Ready for Analysis</h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                      Our AI will analyze your outfit based on color coordination, fit, style, and appropriateness.
                    </p>
                    
                    {!analyzing && !aiRating && (
                      <div className="space-y-4">
                        <button 
                          onClick={analyzeOutfit}
                          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-4 px-6 rounded-xl transition-all transform hover:scale-105"
                        >
                          🤖 Analyze My Look
                        </button>
                        <button 
                          onClick={() => setOutfitPhoto(null)}
                          className="w-full bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 font-semibold py-3 px-6 rounded-xl hover:bg-gray-400 dark:hover:bg-gray-500 transition-all"
                        >
                          Choose Different Photo
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Analysis Loading */}
              {analyzing && (
                <div className="card text-center">
                  <div className="text-6xl mb-4 animate-spin">🤖</div>
                  <h3 className="text-2xl font-semibold mb-4">AI is analyzing your look...</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Checking color harmony, fit, style, and overall coordination
                  </p>
                  <div className="w-64 mx-auto bg-gray-200 rounded-full h-3">
                    <div className="bg-gradient-to-r from-purple-600 to-pink-600 h-3 rounded-full animate-pulse" style={{width: '75%'}}></div>
                  </div>
                </div>
              )}

              {/* AI Rating Results */}
              {aiRating && !analyzing && (
                <div className="card bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900 dark:to-purple-900 border-2 border-blue-200 dark:border-blue-700">
                  <div className="text-center mb-8">
                    <div className="text-6xl mb-4">{getRatingEmoji(aiRating.overall)}</div>
                    <h2 className="text-3xl font-bold text-blue-800 dark:text-blue-200 mb-2">
                      Overall Rating: {aiRating.overall}/100
                    </h2>
                    <p className="text-blue-600 dark:text-blue-300">
                      AI Confidence: {Math.round(aiRating.confidence * 100)}%
                    </p>
                  </div>

                  {/* Detailed Scores */}
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {[
                      { label: 'Color Harmony', score: aiRating.color },
                      { label: 'Fit & Silhouette', score: aiRating.fit },
                      { label: 'Style Coherence', score: aiRating.style },
                      { label: 'Occasion Match', score: aiRating.occasion }
                    ].map((item, index) => (
                      <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center">
                        <div className={`text-2xl font-bold mb-1 px-3 py-1 rounded-full ${getRatingColor(item.score)}`}>
                          {item.score}
                        </div>
                        <p className="text-sm font-medium">{item.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Feedback */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-green-50 dark:bg-green-900 p-6 rounded-xl">
                      <h3 className="text-lg font-bold text-green-800 dark:text-green-200 mb-3">
                        ✅ What's Working
                      </h3>
                      <div className="space-y-2">
                        {aiRating.feedback.map((item, index) => (
                          <p key={index} className="text-green-700 dark:text-green-300 text-sm">
                            • {item}
                          </p>
                        ))}
                      </div>
                    </div>

                    <div className="bg-yellow-50 dark:bg-yellow-900 p-6 rounded-xl">
                      <h3 className="text-lg font-bold text-yellow-800 dark:text-yellow-200 mb-3">
                        💡 Suggestions
                      </h3>
                      <div className="space-y-2">
                        {aiRating.improvements.map((item, index) => (
                          <p key={index} className="text-yellow-700 dark:text-yellow-300 text-sm">
                            • {item}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 flex gap-4 justify-center">
                    <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-xl transition-all">
                      Save to Journal
                    </button>
                    <button 
                      onClick={() => {
                        setOutfitPhoto(null)
                        setAiRating(null)
                      }}
                      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-xl transition-all"
                    >
                      Rate Another Look
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