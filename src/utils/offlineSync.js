// Offline functionality and data synchronization
export const isOnline = () => navigator.onLine

export const cacheData = (key, data) => {
  try {
    localStorage.setItem(`offline_${key}`, JSON.stringify({
      data,
      timestamp: Date.now(),
      synced: false
    }))
  } catch (error) {
    console.error('Failed to cache data:', error)
  }
}

export const getCachedData = (key) => {
  try {
    const cached = localStorage.getItem(`offline_${key}`)
    return cached ? JSON.parse(cached) : null
  } catch (error) {
    return null
  }
}

export const syncPendingData = async () => {
  if (!isOnline()) return

  const keys = Object.keys(localStorage).filter(key => 
    key.startsWith('offline_') && !JSON.parse(localStorage.getItem(key)).synced
  )

  for (const key of keys) {
    try {
      const cached = JSON.parse(localStorage.getItem(key))
      // Simulate API sync
      await new Promise(resolve => setTimeout(resolve, 500))
      
      localStorage.setItem(key, JSON.stringify({
        ...cached,
        synced: true
      }))
    } catch (error) {
      console.error('Sync failed for:', key)
    }
  }
}

export const initializeOfflineSync = () => {
  window.addEventListener('online', syncPendingData)
  
  // Periodic sync when online
  setInterval(() => {
    if (isOnline()) {
      syncPendingData()
    }
  }, 30000) // Every 30 seconds
}