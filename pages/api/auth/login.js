export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { email, password } = req.body
  
  // Mock authentication
  if (email && password) {
    res.status(200).json({
      user: { id: 1, email, name: 'User' },
      token: 'mock-jwt-token'
    })
  } else {
    res.status(401).json({ message: 'Invalid credentials' })
  }
}