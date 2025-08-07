import formidable from 'formidable'
import fs from 'fs'
import path from 'path'

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const form = formidable({
    uploadDir: './public/uploads',
    keepExtensions: true,
    maxFileSize: 5 * 1024 * 1024, // 5MB
  })

  try {
    // Ensure upload directory exists
    const uploadDir = './public/uploads'
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true })
    }

    const [fields, files] = await form.parse(req)
    const file = files.image?.[0]
    
    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' })
    }

    const fileName = `${Date.now()}-${file.originalFilename}`
    const filePath = `/uploads/${fileName}`
    
    res.status(200).json({
      url: filePath,
      name: fileName,
      size: file.size
    })
  } catch (error) {
    res.status(500).json({ message: 'Upload failed' })
  }
}