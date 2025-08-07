import { useState } from 'react'
import Navbar from '../src/components/Navbar'
import { useStore } from '../src/store/useStore'

export default function Wardrobe() {
  const { wardrobeItems, addWardrobeItem, removeWardrobeItem, user } = useStore()
  const [selectedItems, setSelectedItems] = useState([])
  const [outfitPreview, setOutfitPreview] = useState(null)
  const [filter, setFilter] = useState('all')

  const handleItemSelect = (item) => {
    if (selectedItems.find(selected => selected.id === item.id)) {
      setSelectedItems(selectedItems.filter(selected => selected.id !== item.id))
    } else {
      setSelectedItems([...selectedItems, item])
    }
  }

  const generateOutfit = () => {
    const tops = wardrobeItems.filter(item => item.category === 'Tops')
    const bottoms = wardrobeItems.filter(item => item.category === 'Bottoms')
    const accessories = wardrobeItems.filter(item => item.category === 'Accessories')
    
    const randomOutfit = {
      top: tops[Math.floor(Math.random() * tops.length)],
      bottom: bottoms[Math.floor(Math.random() * bottoms.length)],
      accessory: accessories[Math.floor(Math.random() * accessories.length)]
    }
    
    setOutfitPreview(randomOutfit)
  }

  const filteredItems = filter === 'all' 
    ? wardrobeItems 
    : wardrobeItems.filter(item => item.category === filter)

  return (
    <div>
      <Navbar />
      <div className="min-h-screen py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">My Wardrobe</h1>
            <div className="flex gap-4">
              <select 
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg"
              >
                <option value="all">All Items</option>
                <option value="Tops">Tops</option>
                <option value="Bottoms">Bottoms</option>
                <option value="Dresses">Dresses</option>
                <option value="Accessories">Accessories</option>
              </select>
              <button onClick={generateOutfit} className="btn-primary">
                Generate Outfit
              </button>
            </div>
          </div>

          {/* Outfit Preview */}
          {outfitPreview && (
            <div className="card mb-8 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900 dark:to-pink-900">
              <h2 className="text-2xl font-bold mb-4">Generated Outfit</h2>
              <div className="grid md:grid-cols-3 gap-4">
                {outfitPreview.top && (
                  <div className="text-center">
                    <div className="relative bg-gray-100 dark:bg-gray-800 rounded-lg mb-2 overflow-hidden">
                      <img 
                        src={outfitPreview.top.src} 
                        className="w-full h-auto max-h-32 object-contain rounded-lg"
                        style={{ aspectRatio: 'auto' }}
                      />
                    </div>
                    <p className="font-medium">Top</p>
                  </div>
                )}
                {outfitPreview.bottom && (
                  <div className="text-center">
                    <div className="relative bg-gray-100 dark:bg-gray-800 rounded-lg mb-2 overflow-hidden">
                      <img 
                        src={outfitPreview.bottom.src} 
                        className="w-full h-auto max-h-32 object-contain rounded-lg"
                        style={{ aspectRatio: 'auto' }}
                      />
                    </div>
                    <p className="font-medium">Bottom</p>
                  </div>
                )}
                {outfitPreview.accessory && (
                  <div className="text-center">
                    <div className="relative bg-gray-100 dark:bg-gray-800 rounded-lg mb-2 overflow-hidden">
                      <img 
                        src={outfitPreview.accessory.src} 
                        className="w-full h-auto max-h-32 object-contain rounded-lg"
                        style={{ aspectRatio: 'auto' }}
                      />
                    </div>
                    <p className="font-medium">Accessory</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Wardrobe Items */}
          {wardrobeItems.length === 0 ? (
            <div className="card text-center">
              <div className="text-6xl mb-4">👗</div>
              <h2 className="text-2xl font-semibold mb-4">Your wardrobe is empty</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Upload photos of your clothes to get started
              </p>
              <a href="/upload-clothes" className="btn-primary">
                Upload Clothes
              </a>
            </div>
          ) : (
            <div className="grid md:grid-cols-4 lg:grid-cols-5 gap-4">
              {filteredItems.map((item) => (
                <div 
                  key={item.id} 
                  className={`card cursor-pointer transition-all ${
                    selectedItems.find(selected => selected.id === item.id)
                      ? 'ring-2 ring-primary bg-purple-50 dark:bg-purple-900'
                      : 'hover:shadow-lg'
                  }`}
                  onClick={() => handleItemSelect(item)}
                >
                  <div className="relative bg-gray-100 dark:bg-gray-800 rounded-lg mb-2 overflow-hidden">
                    <img 
                      src={item.src} 
                      alt={item.name}
                      className="w-full h-auto max-h-32 object-contain rounded-lg"
                      style={{ aspectRatio: 'auto' }}
                    />
                  </div>
                  <p className="text-sm font-medium truncate">{item.name}</p>
                  <p className="text-xs text-gray-500 capitalize">{item.category}</p>
                  <div className="mt-2 flex justify-between">
                    <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                      {item.fit || 'Good'} Fit
                    </span>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation()
                        removeWardrobeItem(item.id)
                      }}
                      className="text-red-500 hover:text-red-700 text-xs"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}