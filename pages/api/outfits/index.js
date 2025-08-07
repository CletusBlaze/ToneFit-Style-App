export default function handler(req, res) {
  if (req.method === 'GET') {
    const outfits = JSON.parse(global.localStorage?.getItem('outfits') || '[]')
    res.status(200).json(outfits)
  } else if (req.method === 'POST') {
    const outfit = { id: Date.now(), ...req.body, createdAt: new Date() }
    const outfits = JSON.parse(global.localStorage?.getItem('outfits') || '[]')
    outfits.push(outfit)
    global.localStorage?.setItem('outfits', JSON.stringify(outfits))
    res.status(201).json(outfit)
  } else {
    res.status(405).json({ message: 'Method not allowed' })
  }
}