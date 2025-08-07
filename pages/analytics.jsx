import { useState, useEffect } from 'react'
import Navbar from '../src/components/Navbar'
import { useStore } from '../src/store/useStore'
import { getAnalytics } from '../src/utils/analytics'

export default function Analytics() {
  const { styleJournal, savedOutfits, wardrobeItems, activeChallenges, user } = useStore()
  const [analytics, setAnalytics] = useState(null)
  const [timeRange, setTimeRange] = useState('7d')

  useEffect(() => {
    setAnalytics(getAnalytics())
  }, [])

  if (!analytics) {
    return (
      <div>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="text-4xl mb-4">📊</div>
            <p>Loading analytics...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <Navbar />
      <div className="min-h-screen py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Analytics Dashboard</h1>
            <select 
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
            </select>
          </div>
          
          {/* Personal Stats */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="card text-center bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900 dark:to-pink-900">
              <div className="text-3xl mb-2">📔</div>
              <div className="text-2xl font-bold text-purple-600">{styleJournal.length}</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Journal Entries</div>
            </div>
            
            <div className="card text-center bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900 dark:to-cyan-900">
              <div className="text-3xl mb-2">👗</div>
              <div className="text-2xl font-bold text-blue-600">{wardrobeItems.length}</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Wardrobe Items</div>
            </div>
            
            <div className="card text-center bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900 dark:to-emerald-900">
              <div className="text-3xl mb-2">💾</div>
              <div className="text-2xl font-bold text-green-600">{savedOutfits.length}</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Saved Outfits</div>
            </div>
            
            <div className="card text-center bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900 dark:to-red-900">
              <div className="text-3xl mb-2">🏆</div>
              <div className="text-2xl font-bold text-orange-600">{activeChallenges.length}</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Active Challenges</div>
            </div>
          </div>
          
          {/* Style Insights */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            <div className="card">
              <h2 className="text-xl font-bold mb-4">Style Profile</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Body Shape:</span>
                  <span className="font-semibold capitalize">{user.bodyShape?.type || 'Not set'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Skin Tone:</span>
                  <span className="font-semibold">{user.skinTone?.name || 'Not set'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Style Personality:</span>
                  <span className="font-semibold">{user.personality?.type || 'Not set'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Profile Completion:</span>
                  <span className="font-semibold">
                    {Math.round(((user.bodyShape ? 1 : 0) + (user.skinTone ? 1 : 0) + (user.personality ? 1 : 0)) / 3 * 100)}%
                  </span>
                </div>
              </div>
            </div>
            
            <div className="card">
              <h2 className="text-xl font-bold mb-4">Confidence Trends</h2>
              {styleJournal.length > 0 ? (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Average Confidence:</span>
                    <span className="font-semibold">
                      {(styleJournal.reduce((acc, entry) => acc + entry.confidence, 0) / styleJournal.length).toFixed(1)}/10
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Average Comfort:</span>
                    <span className="font-semibold">
                      {(styleJournal.reduce((acc, entry) => acc + entry.comfort, 0) / styleJournal.length).toFixed(1)}/10
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Total Compliments:</span>
                    <span className="font-semibold">
                      {styleJournal.reduce((acc, entry) => acc + entry.compliments, 0)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Best Occasion:</span>
                    <span className="font-semibold capitalize">
                      {styleJournal.length > 0 ? 
                        (() => {
                          const occasions = styleJournal.reduce((acc, entry) => {
                            acc[entry.occasion] = (acc[entry.occasion] || 0) + 1
                            return acc
                          }, {})
                          const sorted = Object.entries(occasions).sort((a, b) => b[1] - a[1])
                          return sorted[0]?.[0] || 'None'
                        })()
                        : 'None'
                      }
                    </span>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">Start journaling to see trends</p>
              )}
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Wardrobe Analytics */}
            <div className="card">
              <h2 className="text-xl font-bold mb-4">Wardrobe Breakdown</h2>
              {wardrobeItems.length > 0 ? (
                <div className="space-y-3">
                  {Object.entries(
                    wardrobeItems.reduce((acc, item) => {
                      acc[item.category] = (acc[item.category] || 0) + 1
                      return acc
                    }, {})
                  ).map(([category, count]) => (
                    <div key={category} className="flex justify-between items-center">
                      <span className="font-medium capitalize">{category}</span>
                      <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full text-sm">
                        {count} items
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">Upload clothes to see breakdown</p>
              )}
            </div>

            {/* Usage Patterns */}
            <div className="card">
              <h2 className="text-xl font-bold mb-4">Usage Patterns</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Most Active Day:</span>
                  <span className="font-semibold">Monday</span>
                </div>
                <div className="flex justify-between">
                  <span>Favorite Feature:</span>
                  <span className="font-semibold">AI Stylist</span>
                </div>
                <div className="flex justify-between">
                  <span>App Usage:</span>
                  <span className="font-semibold">Daily</span>
                </div>
                <div className="flex justify-between">
                  <span>Style Growth:</span>
                  <span className="font-semibold text-green-600">+15% this month</span>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Events */}
          <div className="card mt-8">
            <h2 className="text-xl font-bold mb-4">Recent Events</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Event</th>
                    <th className="text-left py-2">Page</th>
                    <th className="text-left py-2">Time</th>
                    <th className="text-left py-2">User</th>
                  </tr>
                </thead>
                <tbody>
                  {analytics.recentEvents.map((event, index) => (
                    <tr key={index} className="border-b">
                      <td className="py-2">{event.name}</td>
                      <td className="py-2">{event.properties.page || event.properties.action || '-'}</td>
                      <td className="py-2">
                        {new Date(event.properties.timestamp).toLocaleTimeString()}
                      </td>
                      <td className="py-2">{event.properties.userId}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}