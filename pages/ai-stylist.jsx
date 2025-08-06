import { useState } from 'react'
import Navbar from '../src/components/Navbar'
import { useStore } from '../src/store/useStore'
import { getAIStyleAdvice } from '../src/utils/aiStyleCoach'

export default function AIStylist() {
  const { user, savedOutfits } = useStore()
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Hi! I\'m your AI Style Coach. Ask me anything about fashion - from "What should I wear to work?" to "What colors suit me best?" 💫' }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  const handleSend = async () => {
    if (!input.trim()) return
    
    const userMessage = { type: 'user', text: input }
    setMessages(prev => [...prev, userMessage])
    setIsTyping(true)
    
    // Get AI response
    setTimeout(() => {
      const userProfile = {
        bodyShape: user.bodyShape,
        skinTone: user.skinTone,
        personality: user.personality,
        savedOutfits: savedOutfits
      }
      
      const aiResponse = getAIStyleAdvice(input, userProfile)
      
      const botMessage = {
        type: 'bot',
        text: aiResponse.message,
        suggestions: aiResponse.suggestions,
        confidence: aiResponse.confidence,
        followUp: aiResponse.followUp
      }
      
      setMessages(prev => [...prev, botMessage])
      setIsTyping(false)
    }, 1500)
    
    setInput('')
  }

  return (
    <div>
      <Navbar />
      <div className="min-h-screen py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">AI Stylist Chat</h1>
          
          <div className="card h-96 flex flex-col">
            <div className="flex-1 overflow-y-auto mb-4 space-y-4">
              {messages.map((msg, index) => (
                <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-md px-4 py-3 rounded-2xl ${
                    msg.type === 'user' 
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' 
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                  }`}>
                    <p className="mb-2">{msg.text}</p>
                    
                    {msg.suggestions && (
                      <div className="mt-3 space-y-1">
                        {msg.suggestions.map((suggestion, i) => (
                          <div key={i} className="text-sm opacity-90">
                            • {suggestion}
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {msg.confidence && (
                      <div className="mt-2 text-xs opacity-75">
                        Confidence: {Math.round(msg.confidence * 100)}%
                      </div>
                    )}
                    
                    {msg.followUp && (
                      <div className="mt-2 text-sm italic opacity-80">
                        {msg.followUp}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 dark:bg-gray-700 px-4 py-3 rounded-2xl">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Try: 'What should I wear to a job interview?' or 'What colors suit me?'"
                className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                disabled={isTyping}
              />
              <button 
                onClick={handleSend} 
                disabled={isTyping || !input.trim()}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 text-white font-semibold px-6 py-3 rounded-xl transition-all"
              >
                {isTyping ? '🔄' : '➤'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}