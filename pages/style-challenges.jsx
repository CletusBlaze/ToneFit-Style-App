import { useState, useEffect } from 'react'
import Navbar from '../src/components/Navbar'
import { useStore } from '../src/store/useStore'
import { getChallengeLeaderboard, updateChallengeScore } from '../src/utils/leaderboards'

const challengeTemplates = [
  {
    id: 1,
    title: "No Black This Week",
    description: "Challenge yourself to avoid black clothing for 7 days",
    duration: 7,
    difficulty: "Easy",
    icon: "🚫",
    color: "from-red-500 to-pink-500"
  },
  {
    id: 2,
    title: "Color Pop Challenge",
    description: "Add one bright color to every outfit for 5 days",
    duration: 5,
    difficulty: "Medium",
    icon: "🌈",
    color: "from-yellow-500 to-orange-500"
  },
  {
    id: 3,
    title: "Minimalist Week",
    description: "Create outfits using only 3 colors maximum",
    duration: 7,
    difficulty: "Medium",
    icon: "⚪",
    color: "from-gray-500 to-gray-600"
  },
  {
    id: 4,
    title: "Pattern Mix Master",
    description: "Mix different patterns in one outfit each day",
    duration: 5,
    difficulty: "Hard",
    icon: "🎨",
    color: "from-purple-500 to-indigo-500"
  },
  {
    id: 5,
    title: "Accessory Focus",
    description: "Make accessories the star of every outfit",
    duration: 7,
    difficulty: "Easy",
    icon: "💎",
    color: "from-pink-500 to-rose-500"
  },
  {
    id: 6,
    title: "Monochrome Magic",
    description: "Wear different shades of the same color family",
    duration: 5,
    difficulty: "Medium",
    icon: "🎭",
    color: "from-blue-500 to-cyan-500"
  }
]

export default function StyleChallenges() {
  const { user, activeChallenges = [], startChallenge, updateChallenge, completeChallenge, auth } = useStore()
  const [showCustomForm, setShowCustomForm] = useState(false)
  const [selectedLeaderboard, setSelectedLeaderboard] = useState(null)
  const [leaderboardData, setLeaderboardData] = useState([])
  const [customChallenge, setCustomChallenge] = useState({
    title: '',
    description: '',
    duration: 7,
    rules: ''
  })

  const handleStartChallenge = (template) => {
    const challenge = {
      ...template,
      id: Date.now(),
      startDate: new Date().toISOString(),
      progress: 0,
      status: 'active',
      dailyLogs: []
    }
    startChallenge(challenge)
  }

  const handleCreateCustom = () => {
    const challenge = {
      ...customChallenge,
      id: Date.now(),
      startDate: new Date().toISOString(),
      progress: 0,
      status: 'active',
      dailyLogs: [],
      difficulty: 'Custom',
      icon: '⭐',
      color: 'from-green-500 to-teal-500'
    }
    startChallenge(challenge)
    setCustomChallenge({ title: '', description: '', duration: 7, rules: '' })
    setShowCustomForm(false)
  }

  const logProgress = (challengeId, day, success, notes) => {
    const log = { day, success, notes, date: new Date().toISOString() }
    updateChallenge(challengeId, log)
    
    // Update leaderboard score
    if (auth.user && success) {
      const score = day * 10 // 10 points per completed day
      updateChallengeScore(challengeId, auth.user.id, score, day)
    }
  }

  const viewLeaderboard = (challengeId) => {
    const leaderboard = getChallengeLeaderboard(challengeId)
    setLeaderboardData(leaderboard)
    setSelectedLeaderboard(challengeId)
  }

  const getDaysRemaining = (challenge) => {
    const startDate = new Date(challenge.startDate)
    const endDate = new Date(startDate.getTime() + challenge.duration * 24 * 60 * 60 * 1000)
    const today = new Date()
    const diffTime = endDate - today
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return Math.max(0, diffDays)
  }

  return (
    <div>
      <Navbar />
      <div className="min-h-screen py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Style Challenges
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Push your style boundaries and discover new looks
            </p>
          </div>

          {/* Active Challenges */}
          {activeChallenges.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Your Active Challenges</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {activeChallenges.map((challenge) => (
                  <div key={challenge.id} className="card bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900 dark:to-pink-900 border-2 border-purple-200 dark:border-purple-700">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-bold flex items-center">
                          <span className="text-2xl mr-2">{challenge.icon}</span>
                          {challenge.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{challenge.description}</p>
                      </div>
                      <span className="bg-purple-100 dark:bg-purple-800 text-purple-800 dark:text-purple-200 px-2 py-1 rounded-full text-xs font-medium">
                        {getDaysRemaining(challenge)} days left
                      </span>
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Progress</span>
                        <span>{challenge.progress}/{challenge.duration} days</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full transition-all"
                          style={{ width: `${(challenge.progress / challenge.duration) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <button 
                        onClick={() => logProgress(challenge.id, challenge.progress + 1, true, '')}
                        className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition-all"
                      >
                        ✅ Completed Today
                      </button>
                      <button 
                        onClick={() => viewLeaderboard(challenge.id)}
                        className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-all"
                      >
                        🏆 Leaderboard
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Challenge Templates */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Available Challenges</h2>
              <button
                onClick={() => setShowCustomForm(true)}
                className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white font-semibold py-2 px-6 rounded-xl transition-all"
              >
                Create Custom Challenge
              </button>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {challengeTemplates.map((template) => (
                <div key={template.id} className="card hover:shadow-xl transition-all transform hover:-translate-y-1">
                  <div className={`w-full h-32 bg-gradient-to-r ${template.color} rounded-lg mb-4 flex items-center justify-center`}>
                    <span className="text-6xl">{template.icon}</span>
                  </div>
                  
                  <h3 className="text-lg font-bold mb-2">{template.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{template.description}</p>
                  
                  <div className="flex justify-between items-center mb-4 text-sm">
                    <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                      {template.duration} days
                    </span>
                    <span className={`px-2 py-1 rounded-full ${
                      template.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                      template.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {template.difficulty}
                    </span>
                  </div>
                  
                  <button
                    onClick={() => handleStartChallenge(template)}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-4 rounded-xl transition-all transform hover:scale-105"
                  >
                    Start Challenge
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Leaderboard Modal */}
          {selectedLeaderboard && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">Challenge Leaderboard</h2>
                  <button 
                    onClick={() => setSelectedLeaderboard(null)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ×
                  </button>
                </div>
                
                <div className="space-y-3">
                  {leaderboardData.map((participant, index) => (
                    <div key={participant.userId} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">
                          {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${participant.rank}`}
                        </span>
                        <div>
                          <p className="font-semibold">User {participant.userId}</p>
                          <p className="text-sm text-gray-500">{participant.completedDays} days completed</p>
                        </div>
                      </div>
                      <span className="font-bold text-purple-600">{participant.score} pts</span>
                    </div>
                  ))}
                </div>
                
                {leaderboardData.length === 0 && (
                  <p className="text-center text-gray-500 py-8">No participants yet</p>
                )}
              </div>
            </div>
          )}

          {/* Custom Challenge Modal */}
          {showCustomForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6">Create Custom Challenge</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Challenge Title</label>
                    <input
                      type="text"
                      value={customChallenge.title}
                      onChange={(e) => setCustomChallenge({...customChallenge, title: e.target.value})}
                      placeholder="My Style Challenge"
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Description</label>
                    <textarea
                      value={customChallenge.description}
                      onChange={(e) => setCustomChallenge({...customChallenge, description: e.target.value})}
                      placeholder="What's this challenge about?"
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700"
                      rows="3"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Duration (days)</label>
                    <input
                      type="number"
                      min="1"
                      max="30"
                      value={customChallenge.duration}
                      onChange={(e) => setCustomChallenge({...customChallenge, duration: parseInt(e.target.value)})}
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Rules & Guidelines</label>
                    <textarea
                      value={customChallenge.rules}
                      onChange={(e) => setCustomChallenge({...customChallenge, rules: e.target.value})}
                      placeholder="What are the rules for this challenge?"
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700"
                      rows="3"
                    />
                  </div>
                </div>
                
                <div className="flex gap-4 mt-6">
                  <button
                    onClick={handleCreateCustom}
                    className="flex-1 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white font-semibold py-3 px-6 rounded-xl transition-all"
                  >
                    Create Challenge
                  </button>
                  <button
                    onClick={() => setShowCustomForm(false)}
                    className="flex-1 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 font-semibold py-3 px-6 rounded-xl hover:bg-gray-400 dark:hover:bg-gray-500 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}