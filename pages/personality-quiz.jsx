import { useState } from 'react'
import { useRouter } from 'next/router'
import Navbar from '../src/components/Navbar'
import { useStore } from '../src/store/useStore'

const personalityQuestions = [
  {
    question: "What's your ideal weekend outfit?",
    options: [
      { text: "Tailored blazer and trousers", personality: "classic", points: 3 },
      { text: "Bright dress with statement jewelry", personality: "bold", points: 3 },
      { text: "Flowy dress with delicate accessories", personality: "romantic", points: 3 },
      { text: "Black leather jacket and jeans", personality: "edgy", points: 3 },
      { text: "Simple white tee and clean lines", personality: "minimalist", points: 3 }
    ]
  },
  {
    question: "Your favorite colors are:",
    options: [
      { text: "Navy, beige, and white", personality: "classic", points: 2 },
      { text: "Bright reds, oranges, and pinks", personality: "bold", points: 2 },
      { text: "Soft pastels and florals", personality: "romantic", points: 2 },
      { text: "Black, dark purple, and metallics", personality: "edgy", points: 2 },
      { text: "Neutrals and monochrome", personality: "minimalist", points: 2 }
    ]
  },
  {
    question: "Your shopping style:",
    options: [
      { text: "Investment pieces that last", personality: "classic", points: 2 },
      { text: "Eye-catching statement pieces", personality: "bold", points: 2 },
      { text: "Feminine and pretty details", personality: "romantic", points: 2 },
      { text: "Unique and unconventional finds", personality: "edgy", points: 2 },
      { text: "Quality basics and essentials", personality: "minimalist", points: 2 }
    ]
  }
]

const personalityDescriptions = {
  classic: {
    name: "Classic Elegance",
    description: "You love timeless, sophisticated pieces that never go out of style",
    icon: "👔",
    traits: ["Timeless", "Sophisticated", "Professional", "Refined"]
  },
  bold: {
    name: "Bold & Vibrant",
    description: "You're not afraid to stand out with bright colors and statement pieces",
    icon: "🌈",
    traits: ["Confident", "Energetic", "Creative", "Expressive"]
  },
  romantic: {
    name: "Romantic Feminine",
    description: "You adore soft, feminine touches and delicate details",
    icon: "🌸",
    traits: ["Gentle", "Graceful", "Dreamy", "Elegant"]
  },
  edgy: {
    name: "Edgy & Modern",
    description: "You prefer bold, unconventional styles with an edge",
    icon: "⚡",
    traits: ["Rebellious", "Modern", "Unique", "Confident"]
  },
  minimalist: {
    name: "Minimalist Chic",
    description: "You believe in the power of simplicity and clean lines",
    icon: "⚪",
    traits: ["Simple", "Clean", "Functional", "Refined"]
  }
}

export default function PersonalityQuiz() {
  const router = useRouter()
  const { user, setPersonality } = useStore()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [scores, setScores] = useState({
    classic: 0,
    bold: 0,
    romantic: 0,
    edgy: 0,
    minimalist: 0
  })
  const [result, setResult] = useState(null)

  const handleAnswer = (option) => {
    const newScores = { ...scores }
    newScores[option.personality] += option.points
    setScores(newScores)

    if (currentQuestion < personalityQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      // Calculate result
      const topPersonality = Object.keys(newScores).reduce((a, b) => 
        newScores[a] > newScores[b] ? a : b
      )
      setResult(topPersonality)
      setPersonality(topPersonality)
    }
  }

  const restartQuiz = () => {
    setCurrentQuestion(0)
    setScores({ classic: 0, bold: 0, romantic: 0, edgy: 0, minimalist: 0 })
    setResult(null)
  }

  return (
    <div>
      <Navbar />
      <div className="min-h-screen py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Discover Your Style Personality
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Answer a few questions to unlock your personal style vibe
            </p>
          </div>

          {!result ? (
            <div className="card">
              <div className="mb-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-gray-500">
                    Question {currentQuestion + 1} of {personalityQuestions.length}
                  </span>
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full transition-all"
                      style={{ width: `${((currentQuestion + 1) / personalityQuestions.length) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                <h2 className="text-xl font-semibold mb-6">
                  {personalityQuestions[currentQuestion].question}
                </h2>
                
                <div className="space-y-3">
                  {personalityQuestions[currentQuestion].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswer(option)}
                      className="w-full p-4 text-left border-2 border-gray-200 dark:border-gray-600 rounded-xl hover:border-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900 transition-all"
                    >
                      {option.text}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="card text-center">
              <div className="text-6xl mb-4">
                {personalityDescriptions[result].icon}
              </div>
              
              <h2 className="text-3xl font-bold text-primary mb-4">
                {personalityDescriptions[result].name}
              </h2>
              
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                {personalityDescriptions[result].description}
              </p>
              
              <div className="flex flex-wrap justify-center gap-2 mb-8">
                {personalityDescriptions[result].traits.map((trait, index) => (
                  <span 
                    key={index}
                    className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 text-purple-800 dark:text-purple-200 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {trait}
                  </span>
                ))}
              </div>
              
              <div className="space-y-4">
                <button 
                  onClick={() => router.push('/dashboard')}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-4 px-8 rounded-xl transition-all transform hover:scale-105"
                >
                  See My Personalized Styles ✨
                </button>
                
                <button 
                  onClick={restartQuiz}
                  className="w-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold py-3 px-6 rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
                >
                  Retake Quiz
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}