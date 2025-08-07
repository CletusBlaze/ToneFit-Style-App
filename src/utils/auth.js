// Authentication utility functions
export const AUTH_STORAGE_KEY = 'tonefit_auth'
export const RESET_TOKEN_KEY = 'tonefit_reset_token'

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

// Mock user database (in real app, this would be backend)
const getMockUsers = () => {
  if (typeof window !== 'undefined') {
    return JSON.parse(localStorage.getItem('tonefit_users') || '[]')
  }
  return []
}

const saveUsers = (users) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('tonefit_users', JSON.stringify(users))
  }
}

// Generate random token
const generateToken = () => Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)

// Email validation
export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

// Password validation
export const validatePassword = (password) => {
  return password.length >= 6
}

// Register user
export const registerUser = async (userData) => {
  await delay(1000)
  
  const { name, email, password } = userData
  
  // Check if user exists
  const mockUsers = getMockUsers()
  const existingUser = mockUsers.find(user => user.email === email)
  if (existingUser) {
    throw new Error('User already exists with this email')
  }
  
  // Create new user
  const newUser = {
    id: Date.now().toString(),
    name,
    email,
    password, // In real app, this would be hashed
    createdAt: new Date().toISOString(),
    isVerified: false,
    verificationToken: generateToken()
  }
  
  mockUsers.push(newUser)
  saveUsers(mockUsers)
  
  // Send verification email (simulated)
  console.log(`Verification email sent to ${email} with token: ${newUser.verificationToken}`)
  
  return {
    success: true,
    message: 'Registration successful. Please check your email for verification.',
    user: { id: newUser.id, name: newUser.name, email: newUser.email }
  }
}

// Login user
export const loginUser = async (credentials) => {
  await delay(1000)
  
  const { email, password } = credentials
  
  // Find user
  const mockUsers = getMockUsers()
  const user = mockUsers.find(u => u.email === email && u.password === password)
  if (!user) {
    throw new Error('Invalid email or password')
  }
  
  // Create session
  const session = {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      isVerified: user.isVerified
    },
    token: generateToken(),
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours
  }
  
  if (typeof window !== 'undefined') {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session))
  }
  
  return session
}

// Get current session
export const getCurrentSession = () => {
  if (typeof window === 'undefined') return null
  
  try {
    const session = JSON.parse(localStorage.getItem(AUTH_STORAGE_KEY) || 'null')
    if (!session) return null
    
    // Check if session expired
    if (new Date() > new Date(session.expiresAt)) {
      localStorage.removeItem(AUTH_STORAGE_KEY)
      return null
    }
    
    return session
  } catch {
    return null
  }
}

// Logout user
export const logoutUser = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(AUTH_STORAGE_KEY)
    localStorage.removeItem(RESET_TOKEN_KEY)
  }
}

// Request password reset
export const requestPasswordReset = async (email) => {
  await delay(1000)
  
  const mockUsers = getMockUsers()
  const user = mockUsers.find(u => u.email === email)
  if (!user) {
    throw new Error('No account found with this email address')
  }
  
  const resetToken = generateToken()
  const resetExpiry = new Date(Date.now() + 60 * 60 * 1000).toISOString() // 1 hour
  
  // Store reset token
  if (typeof window !== 'undefined') {
    localStorage.setItem(RESET_TOKEN_KEY, JSON.stringify({
      email,
      token: resetToken,
      expiresAt: resetExpiry
    }))
  }
  
  // Simulate sending email
  console.log(`Password reset email sent to ${email} with token: ${resetToken}`)
  
  return {
    success: true,
    message: 'Password reset instructions sent to your email'
  }
}

// Reset password
export const resetPassword = async (token, newPassword) => {
  await delay(1000)
  
  if (typeof window === 'undefined') {
    throw new Error('Invalid or expired reset token')
  }
  
  const resetData = JSON.parse(localStorage.getItem(RESET_TOKEN_KEY) || 'null')
  if (!resetData || resetData.token !== token) {
    throw new Error('Invalid or expired reset token')
  }
  
  if (new Date() > new Date(resetData.expiresAt)) {
    localStorage.removeItem(RESET_TOKEN_KEY)
    throw new Error('Reset token has expired')
  }
  
  // Update user password
  const mockUsers = getMockUsers()
  const userIndex = mockUsers.findIndex(u => u.email === resetData.email)
  if (userIndex === -1) {
    throw new Error('User not found')
  }
  
  mockUsers[userIndex].password = newPassword
  saveUsers(mockUsers)
  
  // Clean up reset token
  if (typeof window !== 'undefined') {
    localStorage.removeItem(RESET_TOKEN_KEY)
  }
  
  return {
    success: true,
    message: 'Password reset successful'
  }
}

// Verify email
export const verifyEmail = async (token) => {
  await delay(1000)
  
  const mockUsers = getMockUsers()
  const userIndex = mockUsers.findIndex(u => u.verificationToken === token)
  if (userIndex === -1) {
    throw new Error('Invalid verification token')
  }
  
  mockUsers[userIndex].isVerified = true
  mockUsers[userIndex].verificationToken = null
  saveUsers(mockUsers)
  
  return {
    success: true,
    message: 'Email verified successfully'
  }
}

// Resend verification email
export const resendVerification = async (email) => {
  await delay(1000)
  
  const mockUsers = getMockUsers()
  const userIndex = mockUsers.findIndex(u => u.email === email)
  if (userIndex === -1) {
    throw new Error('User not found')
  }
  
  if (mockUsers[userIndex].isVerified) {
    throw new Error('Email is already verified')
  }
  
  const newToken = generateToken()
  mockUsers[userIndex].verificationToken = newToken
  saveUsers(mockUsers)
  
  console.log(`Verification email resent to ${email} with token: ${newToken}`)
  
  return {
    success: true,
    message: 'Verification email sent'
  }
}