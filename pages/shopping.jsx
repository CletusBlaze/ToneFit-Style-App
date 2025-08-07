import { useState } from 'react'
import Navbar from '../src/components/Navbar'
import { useStore } from '../src/store/useStore'

const mockProducts = [
  {
    id: 1,
    name: 'Wrap Blouse',
    brand: 'Zara',
    price: '$49.99',
    image: '/Wrap Blouse.jfif',
    affiliate: 'https://zara.com/wrap-blouse',
    category: 'Tops',
    colors: ['White', 'Black', 'Navy'],
    sizes: ['XS', 'S', 'M', 'L', 'XL']
  },
  {
    id: 2,
    name: 'High-Waisted Jeans',
    brand: 'H&M',
    price: '$39.99',
    image: '/High-Waisted Jeans.jfif',
    affiliate: 'https://hm.com/high-waisted-jeans',
    category: 'Bottoms',
    colors: ['Blue', 'Black', 'White'],
    sizes: ['26', '28', '30', '32', '34']
  },
  {
    id: 3,
    name: 'Statement Necklace',
    brand: 'Accessorize',
    price: '$24.99',
    image: '/Statement Necklace.jfif',
    affiliate: 'https://accessorize.com/statement-necklace',
    category: 'Accessories',
    colors: ['Gold', 'Silver', 'Rose Gold'],
    sizes: ['One Size']
  }
]

export default function Shopping() {
  const { user } = useStore()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [priceRange, setPriceRange] = useState('all')

  const getPersonalizedRecommendations = () => {
    if (!user.bodyShape || !user.skinTone) return mockProducts
    
    // Filter based on user profile
    return mockProducts.filter(product => {
      if (user.bodyShape?.type === 'Pear' && product.category === 'Tops') return true
      if (user.skinTone?.type === 'warm' && product.colors.includes('Gold')) return true
      return Math.random() > 0.3 // Random selection for demo
    })
  }

  const filteredProducts = getPersonalizedRecommendations().filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div>
      <Navbar />
      <div className="min-h-screen py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Shop Your Style
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Personalized recommendations from top fashion brands
            </p>
          </div>

          {/* Filters */}
          <div className="card mb-8">
            <div className="grid md:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-800"
              />
              
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-800"
              >
                <option value="all">All Categories</option>
                <option value="Tops">Tops</option>
                <option value="Bottoms">Bottoms</option>
                <option value="Dresses">Dresses</option>
                <option value="Accessories">Accessories</option>
              </select>
              
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-800"
              >
                <option value="all">All Prices</option>
                <option value="under-25">Under $25</option>
                <option value="25-50">$25 - $50</option>
                <option value="50-100">$50 - $100</option>
                <option value="over-100">Over $100</option>
              </select>
            </div>
          </div>

          {/* Personalized Banner */}
          {user.bodyShape && user.skinTone && (
            <div className="card bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900 dark:to-pink-900 border-2 border-purple-200 dark:border-purple-700 mb-8">
              <div className="flex items-center">
                <div className="text-4xl mr-4">✨</div>
                <div>
                  <h2 className="text-xl font-bold text-purple-800 dark:text-purple-200 mb-2">
                    Personalized for You
                  </h2>
                  <p className="text-purple-600 dark:text-purple-300">
                    These items are specially selected for your {user.bodyShape.type} body shape and {user.skinTone.name} skin tone
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Products Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="card hover:shadow-xl transition-all transform hover:-translate-y-1">
                <div className="relative bg-gray-100 dark:bg-gray-800 h-48 rounded-lg mb-4 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-2">{product.brand}</p>
                
                <div className="flex justify-between items-center mb-4">
                  <span className="text-2xl font-bold text-primary">{product.price}</span>
                  <span className="text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                    {product.category}
                  </span>
                </div>
                
                <div className="mb-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Available Colors:</p>
                  <div className="flex space-x-2">
                    {product.colors.map((color, index) => (
                      <div
                        key={index}
                        className="w-6 h-6 rounded-full border-2 border-gray-300"
                        style={{ backgroundColor: color.toLowerCase() }}
                        title={color}
                      ></div>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <a
                    href={product.affiliate}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-2 px-4 rounded-lg text-center transition-all"
                  >
                    Shop Now
                  </a>
                  <button className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold py-2 px-4 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-all">
                    ❤️
                  </button>
                </div>
                
                <div className="mt-2 text-xs text-gray-500">
                  🔗 Affiliate link - We earn from purchases
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="card text-center">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-2">No products found</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Try adjusting your search or filters
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}