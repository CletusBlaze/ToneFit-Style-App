// Analytics and metrics tracking
export const trackEvent = (eventName, properties = {}) => {
  // Simulate analytics tracking
  const event = {
    name: eventName,
    properties: {
      ...properties,
      timestamp: new Date().toISOString(),
      sessionId: getSessionId(),
      userId: getUserId()
    }
  }
  
  // Store in localStorage for demo
  const events = JSON.parse(localStorage.getItem('analytics_events') || '[]')
  events.push(event)
  localStorage.setItem('analytics_events', JSON.stringify(events.slice(-100))) // Keep last 100 events
  
  console.log('Analytics Event:', event)
}

export const trackPageView = (pageName) => {
  trackEvent('page_view', {
    page: pageName,
    url: window.location.href
  })
}

export const trackUserAction = (action, details = {}) => {
  trackEvent('user_action', {
    action,
    ...details
  })
}

export const trackAIInteraction = (feature, confidence, success) => {
  trackEvent('ai_interaction', {
    feature,
    confidence,
    success,
    timestamp: new Date().toISOString()
  })
}

export const getAnalytics = () => {
  const events = JSON.parse(localStorage.getItem('analytics_events') || '[]')
  
  return {
    totalEvents: events.length,
    pageViews: events.filter(e => e.name === 'page_view').length,
    userActions: events.filter(e => e.name === 'user_action').length,
    aiInteractions: events.filter(e => e.name === 'ai_interaction').length,
    recentEvents: events.slice(-10),
    topPages: getTopPages(events),
    userEngagement: calculateEngagement(events)
  }
}

const getSessionId = () => {
  let sessionId = sessionStorage.getItem('session_id')
  if (!sessionId) {
    sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
    sessionStorage.setItem('session_id', sessionId)
  }
  return sessionId
}

const getUserId = () => {
  const auth = JSON.parse(localStorage.getItem('userAuth') || '{}')
  return auth.email || 'anonymous'
}

const getTopPages = (events) => {
  const pageViews = events.filter(e => e.name === 'page_view')
  const pageCounts = {}
  
  pageViews.forEach(event => {
    const page = event.properties.page
    pageCounts[page] = (pageCounts[page] || 0) + 1
  })
  
  return Object.entries(pageCounts)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5)
    .map(([page, count]) => ({ page, count }))
}

const calculateEngagement = (events) => {
  const sessions = {}
  
  events.forEach(event => {
    const sessionId = event.properties.sessionId
    if (!sessions[sessionId]) {
      sessions[sessionId] = {
        events: [],
        startTime: event.properties.timestamp,
        endTime: event.properties.timestamp
      }
    }
    sessions[sessionId].events.push(event)
    sessions[sessionId].endTime = event.properties.timestamp
  })
  
  const sessionDurations = Object.values(sessions).map(session => {
    const start = new Date(session.startTime)
    const end = new Date(session.endTime)
    return (end - start) / 1000 / 60 // Duration in minutes
  })
  
  const avgSessionDuration = sessionDurations.reduce((a, b) => a + b, 0) / sessionDurations.length || 0
  
  return {
    totalSessions: Object.keys(sessions).length,
    avgSessionDuration: Math.round(avgSessionDuration * 100) / 100,
    avgEventsPerSession: events.length / Object.keys(sessions).length || 0
  }
}