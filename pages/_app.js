import { useEffect } from 'react'
import '../src/globals.css'
import Footer from '../src/components/Footer'
import AuthProvider from '../src/components/AuthProvider'
import { initializeNotifications } from '../src/utils/notifications'
import { initializeOfflineSync } from '../src/utils/offlineSync'
import { initializeAccessibility } from '../src/utils/accessibility'
import { initializeI18n } from '../src/utils/i18n'

export default function App({ Component, pageProps }) {
  useEffect(() => {
    // Initialize mobile and accessibility features
    initializeNotifications()
    initializeOfflineSync()
    initializeAccessibility()
    initializeI18n()
    
    // Register service worker for PWA
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then(() => console.log('Service Worker registered'))
        .catch(() => console.log('Service Worker registration failed'))
    }
    
    // Add mobile viewport meta tag
    const viewport = document.querySelector('meta[name="viewport"]')
    if (!viewport) {
      const meta = document.createElement('meta')
      meta.name = 'viewport'
      meta.content = 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no'
      document.head.appendChild(meta)
    }
  }, [])

  return (
    <AuthProvider>
      <div id="main-content">
        <Component {...pageProps} />
      </div>
      <Footer />
    </AuthProvider>
  )
}