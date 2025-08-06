import Link from 'next/link'
import Image from 'next/image'
import { useStore } from '../store/useStore'
import { useEffect, useState } from 'react'
import Logo3D from './Logo3D'

export default function Navbar() {
  const { darkMode, toggleDarkMode } = useStore()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const navItems = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/measurement', label: 'Body Shape' },
    { href: '/skintone', label: 'Skin Tone' },
    { href: '/personality-quiz', label: 'Style Quiz' },
    { href: '/ask-ai', label: 'Ask AI' },
    { href: '/style-journal', label: 'Journal' },
    { href: '/wardrobe', label: 'Wardrobe' },
    { href: '/virtual-tryOn', label: 'Try-On' },
    { href: '/shopping', label: 'Shop' },
    { href: '/community', label: 'Community' },
    { href: '/outfit-calendar', label: 'Calendar' },
    { href: '/analytics', label: 'Analytics' },
    { href: '/login', label: 'Login' },
    { href: '/settings', label: 'Settings' }
  ]

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-sm border-b dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              <Image src="/logo.png" alt="ToneFitStyle" width={40} height={40} className="rounded-lg" />
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                ToneFitStyle
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-700 dark:text-gray-300 hover:text-purple-600 font-medium"
              >
                {item.label}
              </Link>
            ))}
            <button
              onClick={toggleDarkMode}
              className="text-gray-700 dark:text-gray-300 hover:text-purple-600 p-2"
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center space-x-2">
            <button
              onClick={toggleDarkMode}
              className="text-gray-700 dark:text-gray-300 hover:text-purple-600 p-2"
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 dark:text-gray-300 hover:text-purple-600 p-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200 dark:border-gray-700">
            <div className="space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-purple-600 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md font-medium"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}