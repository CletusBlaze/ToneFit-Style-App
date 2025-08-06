import { useState } from 'react'
import { useRouter } from 'next/router'
import Navbar from '../src/components/Navbar'

const slides = [
  {
    title: "Discover Your Body Shape",
    description: "Get personalized style recommendations based on your unique measurements",
    icon: "🧍",
    color: "bg-purple-100"
  },
  {
    title: "Find Your Perfect Colors",
    description: "Match your skin tone to colors that make you glow with confidence",
    icon: "🎨",
    color: "bg-pink-100"
  },
  {
    title: "Build Amazing Outfits",
    description: "Mix and match your wardrobe like a professional stylist",
    icon: "👗",
    color: "bg-yellow-100"
  },
  {
    title: "Get AI Style Advice",
    description: "Chat with our AI stylist for real-time fashion guidance",
    icon: "🤖",
    color: "bg-blue-100"
  }
]

export default function Onboarding() {
  const router = useRouter()
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1)
    } else {
      router.push('/measurement')
    }
  }

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1)
    }
  }

  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className={`${slides[currentSlide].color} rounded-2xl p-12 mb-8`}>
            <div className="text-6xl mb-6">{slides[currentSlide].icon}</div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {slides[currentSlide].title}
            </h1>
            <p className="text-lg text-gray-600">
              {slides[currentSlide].description}
            </p>
          </div>

          <div className="flex justify-center space-x-2 mb-8">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentSlide ? 'bg-primary' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          <div className="flex justify-between items-center">
            <button
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                currentSlide === 0
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Previous
            </button>

            <span className="text-gray-500">
              {currentSlide + 1} of {slides.length}
            </span>

            <button
              onClick={nextSlide}
              className="btn-primary"
            >
              {currentSlide === slides.length - 1 ? 'Get Started' : 'Next'}
            </button>
          </div>

          <div className="mt-8">
            <button
              onClick={() => router.push('/measurement')}
              className="text-gray-500 hover:text-gray-700 underline"
            >
              Skip walkthrough
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}