import { useState } from 'react'
import Navbar from '../src/components/Navbar'
import { useStore } from '../src/store/useStore'

const dummyModels = [
  { id: 1, name: 'Model A', bodyType: 'Pear', image: '/b1.jfif' },
  { id: 2, name: 'Model B', bodyType: 'Apple', image: '/b2.jfif' },
  { id: 3, name: 'Model C', bodyType: 'Rectangle', image: '/b3.jfif' },
  { id: 4, name: 'Model D', bodyType: 'Hourglass', image: '/b4.jfif' },
  { id: 5, name: 'Model E', bodyType: 'Athletic', image: '/b5.jfif' },
  { id: 6, name: 'Model F', bodyType: 'Curvy', image: '/b6.jfif' }
]

export default function VirtualTryOn() {
  const { wardrobeItems, user } = useStore()
  const [selectedModel, setSelectedModel] = useState(null)
  const [selectedOutfit, setSelectedOutfit] = useState({ top: null, bottom: null, accessory: null })
  const [tryOnResult, setTryOnResult] = useState(null)

  const handleTryOn = () => {
    if (!selectedModel || (!selectedOutfit.top && !selectedOutfit.bottom)) {
      alert('Please select a model and at least one clothing item')
      return
    }

    // Simulate virtual try-on processing
    setTimeout(() => {
      setTryOnResult({
        model: selectedModel,
        outfit: selectedOutfit,
        fitScore: Math.floor(Math.random() * 30) + 70, // 70-100%
        recommendations: [
          'This outfit complements your body shape well',
          'The colors work harmoniously together',
          'Consider adding a belt to define the waist'
        ]
      })
    }, 2000)
  }

  const getItemsByCategory = (category) => {
    return wardrobeItems.filter(item => item.category === category)
  }

  return (
    <div>
      <Navbar />
      <div className="min-h-screen py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Virtual Try-On
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              See how your clothes look on different body types
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-4 lg:gap-8">
            {/* Model Selection */}
            <div className="card">
              <h2 className="text-xl font-semibold mb-4">Choose Model</h2>
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {dummyModels.map((model) => (
                  <div
                    key={model.id}
                    onClick={() => setSelectedModel(model)}
                    className={`cursor-pointer rounded-lg border-2 transition-all ${
                      selectedModel?.id === model.id
                        ? 'border-primary ring-2 ring-primary ring-opacity-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="h-32 sm:h-40 rounded-lg overflow-hidden">
                      <img 
                        src={model.image} 
                        alt={model.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-2 sm:p-3 text-center">
                      <p className="font-medium text-sm sm:text-base">{model.name}</p>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{model.bodyType} Shape</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Outfit Selection */}
            <div className="card">
              <h2 className="text-xl font-semibold mb-4">Select Outfit</h2>
              
              <div className="space-y-4">
                {/* Tops */}
                <div>
                  <h3 className="font-medium mb-2 text-sm sm:text-base">Tops</h3>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {getItemsByCategory('Tops').map((item) => (
                      <div
                        key={item.id}
                        onClick={() => setSelectedOutfit({...selectedOutfit, top: item})}
                        className={`cursor-pointer rounded border-2 ${
                          selectedOutfit.top?.id === item.id
                            ? 'border-primary'
                            : 'border-gray-200'
                        }`}
                      >
                        <img src={item.src} className="w-full h-12 sm:h-16 object-cover rounded" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottoms */}
                <div>
                  <h3 className="font-medium mb-2 text-sm sm:text-base">Bottoms</h3>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {getItemsByCategory('Bottoms').map((item) => (
                      <div
                        key={item.id}
                        onClick={() => setSelectedOutfit({...selectedOutfit, bottom: item})}
                        className={`cursor-pointer rounded border-2 ${
                          selectedOutfit.bottom?.id === item.id
                            ? 'border-primary'
                            : 'border-gray-200'
                        }`}
                      >
                        <img src={item.src} className="w-full h-12 sm:h-16 object-cover rounded" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Accessories */}
                <div>
                  <h3 className="font-medium mb-2 text-sm sm:text-base">Accessories</h3>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {getItemsByCategory('Accessories').map((item) => (
                      <div
                        key={item.id}
                        onClick={() => setSelectedOutfit({...selectedOutfit, accessory: item})}
                        className={`cursor-pointer rounded border-2 ${
                          selectedOutfit.accessory?.id === item.id
                            ? 'border-primary'
                            : 'border-gray-200'
                        }`}
                      >
                        <img src={item.src} className="w-full h-12 sm:h-16 object-cover rounded" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <button 
                onClick={handleTryOn}
                className="w-full mt-4 sm:mt-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-xl transition-all text-sm sm:text-base"
              >
                Try On Outfit
              </button>
            </div>
          </div>

          {/* Try-On Result */}
          {tryOnResult && (
            <div className="card mt-6 sm:mt-8 bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900 dark:to-teal-900 border-2 border-green-200 dark:border-green-700">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center">Virtual Try-On Result</h2>
              
              <div className="grid md:grid-cols-2 gap-4 sm:gap-8">
                {/* Virtual Model */}
                <div className="text-center">
                  <div className="relative bg-gray-100 dark:bg-gray-800 rounded-xl p-4 sm:p-8 mb-4">
                    <div className="text-6xl sm:text-8xl mb-2 sm:mb-4">👤</div>
                    <div className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-white dark:bg-gray-700 rounded-lg p-1 sm:p-2">
                      <p className="text-xs font-medium">{tryOnResult.model.bodyType}</p>
                    </div>
                    
                    {/* Outfit Overlay Simulation */}
                    <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 space-y-1 sm:space-y-2">
                      {tryOnResult.outfit.top && (
                        <div className="w-12 sm:w-16 h-6 sm:h-8 bg-purple-200 rounded opacity-80"></div>
                      )}
                      {tryOnResult.outfit.bottom && (
                        <div className="w-8 sm:w-12 h-8 sm:h-12 bg-blue-200 rounded opacity-80"></div>
                      )}
                    </div>
                  </div>
                  <p className="font-medium text-sm sm:text-base">Virtual Try-On Preview</p>
                </div>

                {/* Analysis */}
                <div>
                  <div className="mb-4 sm:mb-6">
                    <h3 className="text-lg sm:text-xl font-semibold mb-2">Fit Analysis</h3>
                    <div className="flex items-center mb-2">
                      <span className="text-lg font-bold text-green-600 mr-2">
                        {tryOnResult.fitScore}%
                      </span>
                      <span className="text-gray-600 dark:text-gray-300">Overall Fit Score</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-green-500 to-teal-500 h-3 rounded-full"
                        style={{ width: `${tryOnResult.fitScore}%` }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-base sm:text-lg font-semibold mb-3">AI Recommendations</h3>
                    <div className="space-y-2">
                      {tryOnResult.recommendations.map((rec, index) => (
                        <div key={index} className="flex items-start">
                          <span className="text-green-500 mr-2">•</span>
                          <p className="text-gray-700 dark:text-gray-300 text-sm">{rec}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row gap-2 sm:gap-3">
                    <button className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg text-sm sm:text-base">
                      Save Look
                    </button>
                    <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg text-sm sm:text-base">
                      Try Different Model
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}