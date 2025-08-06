import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import Navbar from '../../src/components/Navbar'

// Mock Next.js router
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    pathname: '/'
  })
}))

// Mock Zustand store
jest.mock('../../src/store/useStore', () => ({
  useStore: () => ({
    darkMode: false,
    toggleDarkMode: jest.fn()
  })
}))

describe('Navbar', () => {
  test('renders navbar with title', () => {
    render(<Navbar />)
    expect(screen.getByText('ToneFitStyle')).toBeInTheDocument()
  })

  test('renders navigation links', () => {
    render(<Navbar />)
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
    expect(screen.getByText('Body Shape')).toBeInTheDocument()
    expect(screen.getByText('Skin Tone')).toBeInTheDocument()
  })

  test('has dark mode toggle', () => {
    render(<Navbar />)
    const darkModeButton = screen.getAllByText('🌙')[0]
    expect(darkModeButton).toBeInTheDocument()
  })
})