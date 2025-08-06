import { useState } from 'react'
import Navbar from '../src/components/Navbar'

export default function UploadClothes() {
  const [uploadedItems, setUploadedItems] = useState([])
  const [dragActive, setDragActive] = useState(false)

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files)
    }
  }

  const handleFiles = (files) => {
    Array.from(files).forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onload = (e) => {
          const newItem = {
            id: Date.now() + Math.random(),
            src: e.target.result,
            name: file.name,
            category: 'Uncategorized',
            color: 'Unknown'
          }
          setUploadedItems(prev => [...prev, newItem])
        }
        reader.readAsDataURL(file)
      }
    })
  }

  const categorizeItem = (id, category) => {
    setUploadedItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, category } : item
      )
    )
  }

  return (
    <div>
      <Navbar />
      <div className="min-h-screen py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">Upload Your Clothes</h1>
          
          <div className="card mb-8">
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive 
                  ? 'border-primary bg-purple-50' 
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <div className="text-6xl mb-4">📷</div>
              <h3 className="text-xl font-semibold mb-2">Upload Your Wardrobe</h3>
              <p className="text-gray-600 mb-4">
                Drag and drop photos of your clothes or click to browse
              </p>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => handleFiles(e.target.files)}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="btn-primary cursor-pointer">
                Choose Files
              </label>
            </div>
          </div>

          {uploadedItems.length > 0 && (
            <div className="card">
              <h2 className="text-xl font-semibold mb-4">Your Wardrobe ({uploadedItems.length} items)</h2>
              
              <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
                {uploadedItems.map((item) => (
                  <div key={item.id} className="border rounded-lg p-3">
                    <img 
                      src={item.src} 
                      alt={item.name}
                      className="w-full h-32 object-cover rounded mb-2"
                    />
                    <p className="text-sm font-medium truncate">{item.name}</p>
                    <select
                      value={item.category}
                      onChange={(e) => categorizeItem(item.id, e.target.value)}
                      className="w-full mt-2 p-1 border rounded text-sm"
                    >
                      <option value="Uncategorized">Category</option>
                      <option value="Tops">Tops</option>
                      <option value="Bottoms">Bottoms</option>
                      <option value="Dresses">Dresses</option>
                      <option value="Outerwear">Outerwear</option>
                      <option value="Accessories">Accessories</option>
                      <option value="Shoes">Shoes</option>
                    </select>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 text-center">
                <button className="btn-primary mr-4">
                  Generate Outfit Combinations
                </button>
                <button className="btn-secondary">
                  Save Wardrobe
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}