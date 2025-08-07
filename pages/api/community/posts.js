export default function handler(req, res) {
  if (req.method === 'GET') {
    const posts = JSON.parse(global.localStorage?.getItem('communityPosts') || '[]')
    res.status(200).json(posts)
  } else if (req.method === 'POST') {
    const post = { id: Date.now(), ...req.body, createdAt: new Date(), likes: 0 }
    const posts = JSON.parse(global.localStorage?.getItem('communityPosts') || '[]')
    posts.unshift(post)
    global.localStorage?.setItem('communityPosts', JSON.stringify(posts))
    res.status(201).json(post)
  } else {
    res.status(405).json({ message: 'Method not allowed' })
  }
}