import { useState } from 'react'
import Navbar from '../src/components/Navbar'
import { useStore } from '../src/store/useStore'
import { getAIStyleAdvice } from '../src/utils/aiStyleCoach'

const quickPrompts = [
  "What should I wear to a job interview?",
  "What should I wear on a first date?",
  "What should I wear to a wedding?",
  "What should I wear to a casual brunch?",
  "What should I wear to a business meeting?",
  "What should I wear to a party?",
  "What should I wear for a day out shopping?",
  "What should I wear to a family dinner?"
]

export default function AskAI() {
  const { user, savedOutfits } = useStore()
  const [query, setQuery] = useState('')
  const [response, setResponse] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleAsk = async (question = query) => {
    if (!question.trim()) return
    
    setLoading(true)
    setQuery(question)
    
    setTimeout(() => {
      const userProfile = {
        bodyShape: user.bodyShape,
        skinTone: user.skinTone,
        personality: user.personality,
        savedOutfits: savedOutfits
      }
      
      const aiResponse = getAIStyleAdvice(question, userProfile)
      setResponse(aiResponse)
      setLoading(false)
    }, 2000)
  }

  return (
    <div>
      <Navbar />
      <div className="min-h-screen py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Ask Your AI Stylist
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Get instant outfit recommendations for any occasion
            </p>
          </div>

          {/* Quick Prompts */}
          <div className="card mb-8">
            <h2 className="text-xl font-semibold mb-4">Popular Questions</h2>
            <div className="grid md:grid-cols-2 gap-3">
              {quickPrompts.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => handleAsk(prompt)}
                  className="text-left p-3 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900 dark:to-pink-900 rounded-lg hover:from-purple-100 hover:to-pink-100 dark:hover:from-purple-800 dark:hover:to-pink-800 transition-all border border-purple-200 dark:border-purple-700"
                >
                  <span className="text-purple-600 dark:text-purple-300 font-medium">
                    {prompt}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Custom Question */}
          <div className="card mb-8">
            <h2 className="text-xl font-semibold mb-4">Ask Your Own Question</h2>
            <div className="flex gap-4">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAsk()}
                placeholder="What should I wear to..."
                className="flex-1 p-4 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                disabled={loading}
              />
              <button
                onClick={() => handleAsk()}
                disabled={loading || !query.trim()}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 text-white font-semibold px-8 py-4 rounded-xl transition-all"
              >
                {loading ? '🤔' : 'Ask AI'}
              </button>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="card text-center">
              <div className="text-6xl mb-4 animate-bounce">🤖</div>
              <h3 className="text-xl font-semibold mb-2">AI is thinking...</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Analyzing your style profile and the occasion
              </p>
              <div className="mt-4 w-64 mx-auto bg-gray-200 rounded-full h-2">
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full animate-pulse" style={{width: '70%'}}></div>
              </div>
            </div>
          )}

          {/* AI Response */}
          {response && !loading && (
            <div className="card bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900 dark:to-pink-900 border-2 border-purple-200 dark:border-purple-700">
              <div className="flex items-center mb-4">
                <div className="text-3xl mr-3">✨</div>
                <h3 className="text-2xl font-bold text-purple-800 dark:text-purple-200">
                  AI Recommendation
                </h3>
                <div className="ml-auto text-sm text-purple-600 dark:text-purple-300">
                  {Math.round(response.confidence * 100)}% confident
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-6">
                <p className="text-lg text-gray-800 dark:text-gray-200 mb-4">
                  {response.message}
                </p>
                
                {response.suggestions && (
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900 dark:text-white">Specific Suggestions:</h4>
                    <div className="grid md:grid-cols-2 gap-3">
                      {response.suggestions.map((suggestion, index) => (
                        <div key={index} className="flex items-center p-3 bg-purple-50 dark:bg-purple-900 rounded-lg">
                          <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                          <span className="text-gray-700 dark:text-gray-300">{suggestion}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              {response.followUp && (
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900 dark:to-orange-900 p-4 rounded-lg">
                  <p className="text-yellow-800 dark:text-yellow-200 font-medium">
                    💡 {response.followUp}
                  </p>
                </div>
              )}
              
              <div className="mt-6 flex gap-4">
                <button 
                  onClick={() => setQuery('')}
                  className="bg-white dark:bg-gray-800 text-purple-600 dark:text-purple-300 border-2 border-purple-200 dark:border-purple-700 font-semibold py-2 px-6 rounded-xl hover:bg-purple-50 dark:hover:bg-purple-900 transition-all"
                >
                  Ask Another Question
                </button>
                <button className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white font-semibold py-2 px-6 rounded-xl transition-all">
                  Save This Advice
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}