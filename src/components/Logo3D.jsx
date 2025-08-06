import { useState } from 'react'

export default function Logo3D({ size = 'md' }) {
  const [isHovered, setIsHovered] = useState(false)
  
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
    xl: 'w-32 h-32'
  }

  return (
    <div 
      className={`${sizeClasses[size]} relative cursor-pointer transition-all duration-300 transform ${
        isHovered ? 'scale-110' : 'scale-100'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 3D Base Shadow */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl transform rotate-3 opacity-30"></div>
      
      {/* 3D Middle Layer */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl transform rotate-1 opacity-60"></div>
      
      {/* Main Logo */}
      <div className={`relative w-full h-full bg-gradient-to-br from-purple-400 via-purple-500 to-pink-500 rounded-2xl shadow-2xl flex items-center justify-center transition-all duration-300 ${
        isHovered ? 'shadow-purple-500/50' : ''
      }`}>
        {/* Inner Glow */}
        <div className="absolute inset-2 bg-gradient-to-br from-white/20 to-transparent rounded-xl"></div>
        
        {/* Logo Icon */}
        <div className="relative z-10 text-white font-bold text-center">
          <div className={`${size === 'xl' ? 'text-4xl' : size === 'lg' ? 'text-2xl' : size === 'md' ? 'text-xl' : 'text-lg'} mb-1`}>
            👗
          </div>
          {size === 'xl' && (
            <div className="text-xs font-semibold tracking-wider opacity-90">
              TONE
            </div>
          )}
        </div>
        
        {/* Shine Effect */}
        <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-2xl transform -skew-x-12 transition-all duration-700 ${
          isHovered ? 'translate-x-full' : '-translate-x-full'
        }`}></div>
      </div>
      
      {/* Floating Particles */}
      {isHovered && (
        <>
          <div className="absolute -top-2 -right-2 w-2 h-2 bg-pink-400 rounded-full animate-bounce"></div>
          <div className="absolute -bottom-2 -left-2 w-1 h-1 bg-purple-400 rounded-full animate-ping"></div>
          <div className="absolute top-1/2 -right-3 w-1 h-1 bg-yellow-400 rounded-full animate-pulse"></div>
        </>
      )}
    </div>
  )
}