import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Navbar from '../src/components/Navbar'
import { useStore } from '../src/store/useStore'
import { calculateBodyShape, getShapeAdvice } from '../src/utils/bodyShape'

export default function Measurement() {
  const router = useRouter()
  const { setBodyShape, setMeasurements } = useStore()
  const [measurements, setMeasurementsState] = useState({
    bust: '',
    waist: '',
    hips: '',
    height: ''
  })
  const [result, setResult] = useState(null)
  const [inputMode, setInputMode] = useState('manual') // 'manual' or 'slider'
  const [selectedModel, setSelectedModel] = useState(null)

  useEffect(() => {
    const model = localStorage.getItem('selectedModel')
    if (model) {
      setSelectedModel(JSON.parse(model))
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const shape = calculateBodyShape(measurements)
    const advice = getShapeAdvice(shape)
    
    setMeasurements(measurements)
    setBodyShape({ type: shape, advice })
    setResult({ shape, advice })
  }

  return (
    <div>
      <Navbar />
      <div className="min-h-screen py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Body Shape Analysis</h1>
            {selectedModel && (
              <div className="inline-flex items-center bg-purple-100 dark:bg-purple-900 px-4 py-2 rounded-full">
                <span className="text-2xl mr-2">👤</span>
                <span className="text-purple-800 dark:text-purple-200 font-medium">
                  Using {selectedModel.bodyType} Model Reference
                </span>
              </div>
            )}
          </div>
          
          <div className="card">
            <div className="flex justify-center mb-6">
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  type="button"
                  onClick={() => setInputMode('manual')}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    inputMode === 'manual' 
                      ? 'bg-white text-primary shadow-sm' 
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  Manual Input
                </button>
                <button
                  type="button"
                  onClick={() => setInputMode('slider')}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    inputMode === 'slider' 
                      ? 'bg-white text-primary shadow-sm' 
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  Visual Sliders
                </button>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {inputMode === 'manual' ? (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bust (inches)
                    </label>
                    <input
                      type="number"
                      value={measurements.bust}
                      onChange={(e) => setMeasurementsState({...measurements, bust: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Waist (inches)
                    </label>
                    <input
                      type="number"
                      value={measurements.waist}
                      onChange={(e) => setMeasurementsState({...measurements, waist: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Hips (inches)
                    </label>
                    <input
                      type="number"
                      value={measurements.hips}
                      onChange={(e) => setMeasurementsState({...measurements, hips: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Height (inches)
                    </label>
                    <input
                      type="number"
                      value={measurements.height}
                      onChange={(e) => setMeasurementsState({...measurements, height: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      required
                    />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bust: {measurements.bust || 32} inches
                    </label>
                    <input
                      type="range"
                      min="28"
                      max="50"
                      value={measurements.bust || 32}
                      onChange={(e) => setMeasurementsState({...measurements, bust: e.target.value})}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Waist: {measurements.waist || 26} inches
                    </label>
                    <input
                      type="range"
                      min="22"
                      max="45"
                      value={measurements.waist || 26}
                      onChange={(e) => setMeasurementsState({...measurements, waist: e.target.value})}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Hips: {measurements.hips || 36} inches
                    </label>
                    <input
                      type="range"
                      min="30"
                      max="55"
                      value={measurements.hips || 36}
                      onChange={(e) => setMeasurementsState({...measurements, hips: e.target.value})}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Height: {measurements.height || 65} inches
                    </label>
                    <input
                      type="range"
                      min="58"
                      max="78"
                      value={measurements.height || 65}
                      onChange={(e) => setMeasurementsState({...measurements, height: e.target.value})}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                  </div>
                </>
              )}
              
              <button type="submit" className="w-full btn-primary">
                Analyze My Body Shape
              </button>
            </form>
            
            {result && (
              <div className="mt-8 p-8 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900 dark:to-pink-900 rounded-2xl border border-purple-200 dark:border-purple-700">
                <div className="text-center mb-6">
                  <div className="text-6xl mb-4">✨</div>
                  <h3 className="text-2xl font-bold text-primary dark:text-purple-300 mb-2">
                    Your Body Shape: {result.shape}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 text-lg mb-6">{result.advice}</p>
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-6">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Style Tips for {result.shape} Shape:</h4>
                  <ul className="text-gray-600 dark:text-gray-300 space-y-2">
                    <li>• Emphasize your best features</li>
                    <li>• Choose flattering silhouettes</li>
                    <li>• Balance your proportions</li>
                  </ul>
                </div>
                
                <div className="text-center">
                  <button 
                    onClick={() => router.push('/skintone')}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-4 px-8 rounded-xl transition-all transform hover:scale-105"
                  >
                    Next: Analyze Skin Tone →
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}