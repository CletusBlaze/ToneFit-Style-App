import { useState, useRef } from 'react'
import { useRouter } from 'next/router'
import Navbar from '../src/components/Navbar'
import { useStore } from '../src/store/useStore'
import { calculateBodyShape, getShapeAdvice } from '../src/utils/bodyShape'
import { initializeCamera, capturePhoto, measureBodyFromPhoto } from '../src/utils/cameraCapture'
import { useTouchGestures } from '../src/utils/touchGestures'

export default function CameraMeasurement() {
  const router = useRouter()
  const { setBodyShape, setMeasurements } = useStore()
  const videoRef = useRef(null)
  const [capturedImage, setCapturedImage] = useState(null)
  const [analyzing, setAnalyzing] = useState(false)
  const [result, setResult] = useState(null)

  const startCamera = async () => {
    try {
      await initializeCamera(videoRef.current)
    } catch (error) {
      console.error('Camera access failed:', error)
    }
  }

  const handleCapture = () => {
    const imageData = capturePhoto(videoRef.current)
    setCapturedImage(imageData)
  }

  const analyzeImage = async () => {
    setAnalyzing(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // AI simulation
    const aiMeasurements = {
      bust: Math.floor(Math.random() * 10 + 32),
      waist: Math.floor(Math.random() * 8 + 24),
      hips: Math.floor(Math.random() * 10 + 34),
      height: Math.floor(Math.random() * 12 + 60)
    }
    
    const shape = calculateBodyShape(aiMeasurements)
    const advice = getShapeAdvice(shape)
    
    setMeasurements(aiMeasurements)
    setBodyShape({ type: shape, advice })
    setResult({ shape, advice, measurements: aiMeasurements })
    setAnalyzing(false)
  }

  return (
    <div>
      <Navbar />
      <div className="min-h-screen py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">AI Body Measurement</h1>
          
          <div className="card text-center">
            {!capturedImage ? (
              <div>
                <div className="relative">
                  <video ref={videoRef} autoPlay playsInline className="w-full mb-4 rounded-lg"></video>
                  <div 
                    className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center cursor-pointer md:hidden"
                    onClick={handleCapture}
                    ref={el => el && useTouchGestures(el, { onTap: handleCapture })}
                  >
                    <div className="w-12 h-12 bg-white rounded-full"></div>
                  </div>
                </div>
                <div className="space-x-4">
                  <button onClick={startCamera} className="btn-primary">Start Camera</button>
                  <button onClick={handleCapture} className="btn-secondary hidden md:inline-block">Capture</button>
                </div>
              </div>
            ) : analyzing ? (
              <div>
                <div className="text-4xl mb-4">🔄</div>
                <p>AI analyzing your measurements...</p>
              </div>
            ) : result ? (
              <div>
                <h2 className="text-xl font-bold mb-4">Your Body Shape: {result.shape}</h2>
                <p className="mb-4">{result.advice}</p>
                <button onClick={() => router.push('/skintone')} className="btn-primary">
                  Next: Skin Tone
                </button>
              </div>
            ) : (
              <div>
                <img src={capturedImage} className="w-full mb-4 rounded-lg" />
                <button onClick={analyzeImage} className="btn-primary">Analyze with AI</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}