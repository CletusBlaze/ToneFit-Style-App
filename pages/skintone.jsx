import { useState } from 'react'
import { useRouter } from 'next/router'
import Navbar from '../src/components/Navbar'
import { useStore } from '../src/store/useStore'
import { analyzeSkinTone } from '../src/utils/skinAnalysis'

const skinTones = [
  { name: 'Fair Cool', hex: '#F7E7CE', type: 'cool' },
  { name: 'Fair Warm', hex: '#F2D2A9', type: 'warm' },
  { name: 'Light Cool', hex: '#E8C5A0', type: 'cool' },
  { name: 'Light Warm', hex: '#DDB180', type: 'warm' },
  { name: 'Medium Cool', hex: '#C8956D', type: 'cool' },
  { name: 'Medium Warm', hex: '#B08155', type: 'warm' },
  { name: 'Deep Cool', hex: '#8B5A3C', type: 'cool' },
  { name: 'Deep Warm', hex: '#6F4E37', type: 'warm' },
]

const colorPalettes = {
  cool: ['#E8F4FD', '#B3E5FC', '#4FC3F7', '#0288D1', '#01579B'],
  warm: ['#FFF8E1', '#FFECB3', '#FFD54F', '#FF8F00', '#E65100']
}

export default function SkinTone() {
  const router = useRouter()
  const { setSkinTone } = useStore()
  const [selectedTone, setSelectedTone] = useState(null)
  const [analysisMode, setAnalysisMode] = useState('manual') // 'manual' or 'upload'
  const [analyzing, setAnalyzing] = useState(false)
  const [aiResult, setAiResult] = useState(null)

  const handleToneSelect = (tone) => {
    setSelectedTone(tone)
    setSkinTone(tone)
  }

  return (
    <div>
      <Navbar />
      <div className="min-h-screen py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">Skin Tone Analysis</h1>
          
          <div className="card mb-8">
            <div className="flex justify-center mb-6">
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  type="button"
                  onClick={() => setAnalysisMode('manual')}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    analysisMode === 'manual' 
                      ? 'bg-white text-primary shadow-sm' 
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  Select Manually
                </button>
                <button
                  type="button"
                  onClick={() => setAnalysisMode('upload')}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    analysisMode === 'upload' 
                      ? 'bg-white text-primary shadow-sm' 
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  Upload Selfie
                </button>
              </div>
            </div>
            
            {analysisMode === 'upload' ? (
              <div className="text-center">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 mb-4">
                  <div className="text-4xl mb-4">🤳</div>
                  <h3 className="text-lg font-semibold mb-2">Upload Your Selfie</h3>
                  <p className="text-gray-600 mb-4">
                    Take a selfie in natural lighting for accurate skin tone analysis
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    id="selfie-upload"
                    onChange={async (e) => {
                      if (e.target.files[0]) {
                        setAnalyzing(true)
                        const reader = new FileReader()
                        reader.onload = async (event) => {
                          try {
                            const result = await analyzeSkinTone(event.target.result)
                            setAiResult(result)
                            setSelectedTone(result)
                            setAnalyzing(false)
                          } catch (error) {
                            setAnalyzing(false)
                            alert('Analysis failed. Please try again.')
                          }
                        }
                        reader.readAsDataURL(e.target.files[0])
                      }
                    }}
                  />
                  <label htmlFor="selfie-upload" className="btn-primary cursor-pointer">
                    {analyzing ? '🔄 Analyzing...' : 'Choose Photo'}
                  </label>
                  {aiResult && (
                    <div className="mt-4 p-4 bg-green-50 dark:bg-green-900 rounded-lg">
                      <p className="text-green-800 dark:text-green-200 font-medium">
                        ✨ AI detected: {aiResult.name} ({Math.round(aiResult.confidence * 100)}% confidence)
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <>
                <h2 className="text-xl font-semibold mb-4">Select Your Skin Tone</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {skinTones.map((tone) => (
                    <button
                      key={tone.name}
                      onClick={() => handleToneSelect(tone)}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        selectedTone?.name === tone.name 
                          ? 'border-primary ring-2 ring-primary ring-opacity-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div 
                        className="w-full h-16 rounded-lg mb-2"
                        style={{ backgroundColor: tone.hex }}
                      ></div>
                      <p className="text-sm font-medium">{tone.name}</p>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
          
          {selectedTone && (
            <div className="card">
              <h3 className="text-xl font-semibold mb-4">
                Your Perfect Color Palette
              </h3>
              <p className="text-gray-600 mb-6">
                Based on your {selectedTone.name} skin tone, these colors will make you glow:
              </p>
              
              <div className="flex space-x-2 mb-6">
                {colorPalettes[selectedTone.type].map((color, index) => (
                  <div
                    key={index}
                    className="w-16 h-16 rounded-lg border border-gray-200"
                    style={{ backgroundColor: color }}
                  ></div>
                ))}
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h4 className="font-semibold mb-2">Style Tips:</h4>
                <p className="text-gray-700">
                  {selectedTone.type === 'warm' 
                    ? 'Warm tones like gold, coral, and earth tones complement your skin beautifully.'
                    : 'Cool tones like silver, jewel tones, and pastels enhance your natural radiance.'
                  }
                </p>
              </div>
              
              <button 
                onClick={() => router.push('/dashboard')}
                className="btn-primary"
              >
                Complete Setup & Go to Dashboard
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}