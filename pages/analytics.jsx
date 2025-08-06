import { useState, useEffect } from 'react'
import Navbar from '../src/components/Navbar'
import { getAnalytics } from '../src/utils/analytics'

export default function Analytics() {
  const [analytics, setAnalytics] = useState(null)

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
          <h1 className="text-4xl font-bold text-center mb-8">Analytics Dashboard</h1>
          
          {/* Overview Cards */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="card text-center">
              <div className="text-3xl mb-2">📈</div>
              <div className="text-2xl font-bold text-purple-600">{analytics.totalEvents}</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Total Events</div>
            </div>
            
            <div className="card text-center">
              <div className="text-3xl mb-2">👁️</div>
              <div className="text-2xl font-bold text-blue-600">{analytics.pageViews}</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Page Views</div>
            </div>
            
            <div className="card text-center">
              <div className="text-3xl mb-2">🤖</div>
              <div className="text-2xl font-bold text-green-600">{analytics.aiInteractions}</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">AI Interactions</div>
            </div>
            
            <div className="card text-center">
              <div className="text-3xl mb-2">⏱️</div>
              <div className="text-2xl font-bold text-orange-600">
                {analytics.userEngagement.avgSessionDuration}m
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Avg Session</div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Top Pages */}
            <div className="card">
              <h2 className="text-xl font-bold mb-4">Top Pages</h2>
              <div className="space-y-3">
                {analytics.topPages.map((page, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="font-medium">{page.page}</span>
                    <span className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-2 py-1 rounded-full text-sm">
                      {page.count} views
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* User Engagement */}
            <div className="card">
              <h2 className="text-xl font-bold mb-4">User Engagement</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Total Sessions:</span>
                  <span className="font-semibold">{analytics.userEngagement.totalSessions}</span>
                </div>
                <div className="flex justify-between">
                  <span>Avg Session Duration:</span>
                  <span className="font-semibold">{analytics.userEngagement.avgSessionDuration} minutes</span>
                </div>
                <div className="flex justify-between">
                  <span>Events per Session:</span>
                  <span className="font-semibold">{Math.round(analytics.userEngagement.avgEventsPerSession)}</span>
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