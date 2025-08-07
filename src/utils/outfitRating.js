import { analyzeOutfitPhoto } from './imageProcessing'
import { mlEngine } from './mlRecommendations'

export const analyzeOutfitRating = async (imageElement, userProfile) => {
  const imageAnalysis = analyzeOutfitPhoto(imageElement)
  const mlRecommendations = mlEngine.generateRecommendations(userProfile, { 
    colors: imageAnalysis.colors 
  })
  
  return {
    overall: imageAnalysis.overall,
    breakdown: {
      colorHarmony: imageAnalysis.harmony.score,
      composition: imageAnalysis.composition.score,
      styleCoherence: calculateStyleCoherence(imageAnalysis, userProfile),
      occasionMatch: calculateOccasionMatch(imageAnalysis, userProfile)
    },
    feedback: generateDetailedFeedback(imageAnalysis, userProfile),
    improvements: generateImprovements(imageAnalysis, mlRecommendations),
    confidence: calculateConfidence(imageAnalysis)
  }
}

const calculateStyleCoherence = (imageAnalysis, userProfile) => {
  const { colors } = imageAnalysis
  const { personality, skinTone } = userProfile
  
  let score = 70
  
  // Check if colors match personality
  if (personality?.type === 'bold' && colors.some(c => c.count > 100)) {
    score += 15
  } else if (personality?.type === 'minimalist' && colors.length <= 3) {
    score += 15
  } else if (personality?.type === 'classic' && colors.some(c => isNeutralColor(c))) {
    score += 10
  }
  
  // Check skin tone compatibility
  if (skinTone && colors.some(c => isCompatibleWithSkinTone(c, skinTone))) {
    score += 10
  }
  
  return Math.min(score, 100)
}

const calculateOccasionMatch = (imageAnalysis, userProfile) => {
  // Base score for general appropriateness
  let score = 75
  
  const { colors, composition } = imageAnalysis
  const brightness = colors.reduce((acc, c) => acc + (c.r + c.g + c.b), 0) / (colors.length * 3)
  
  // Formal occasions prefer darker, more composed looks
  if (brightness < 120 && composition.score > 80) {
    score += 15
  }
  
  // Casual occasions allow brighter, more relaxed compositions
  if (brightness > 150 && colors.length > 3) {
    score += 10
  }
  
  return Math.min(score, 100)
}

const generateDetailedFeedback = (imageAnalysis, userProfile) => {
  const feedback = []
  
  // Color feedback
  if (imageAnalysis.harmony.score > 85) {
    feedback.push('Excellent color coordination!')
  } else if (imageAnalysis.harmony.score > 70) {
    feedback.push('Good color balance')
  } else {
    feedback.push('Consider adjusting color combinations')
  }
  
  // Composition feedback
  if (imageAnalysis.composition.score > 80) {
    feedback.push('Great photo composition and fit')
  } else {
    feedback.push('Photo could be improved for better analysis')
  }
  
  // Personality match
  if (userProfile.personality) {
    feedback.push(`Matches your ${userProfile.personality.type} style personality`)
  }
  
  // Skin tone compatibility
  if (userProfile.skinTone) {
    const compatible = imageAnalysis.colors.some(c => 
      isCompatibleWithSkinTone(c, userProfile.skinTone)
    )
    if (compatible) {
      feedback.push('Colors complement your skin tone well')
    } else {
      feedback.push('Some colors might not be optimal for your skin tone')
    }
  }
  
  return feedback
}

const generateImprovements = (imageAnalysis, mlRecommendations) => {
  const improvements = []
  
  // Color improvements
  if (imageAnalysis.harmony.score < 70) {
    improvements.push('Try using colors from the same family or complementary pairs')
  }
  
  // Composition improvements
  if (imageAnalysis.composition.score < 75) {
    improvements.push('Take a full-body photo in good lighting for better analysis')
  }
  
  // ML-based suggestions
  if (mlRecommendations.length > 0) {
    const topRec = mlRecommendations[0]
    improvements.push(`Consider trying a ${topRec.name} style for better results`)
  }
  
  // General styling tips
  improvements.push('Add accessories to enhance the overall look')
  improvements.push('Ensure proper fit - tailoring can make a big difference')
  
  return improvements
}

const calculateConfidence = (imageAnalysis) => {
  const factors = [
    imageAnalysis.colors.length > 2 ? 0.2 : 0.1,
    imageAnalysis.harmony.score > 70 ? 0.3 : 0.2,
    imageAnalysis.composition.score > 75 ? 0.3 : 0.2,
    0.2 // Base confidence
  ]
  
  return factors.reduce((acc, factor) => acc + factor, 0)
}

const isNeutralColor = (color) => {
  const { r, g, b } = color
  const diff = Math.max(r, g, b) - Math.min(r, g, b)
  return diff < 30 // Low saturation indicates neutral
}

const isCompatibleWithSkinTone = (color, skinTone) => {
  const { r, g, b } = color
  const warmth = (r + (g * 0.5)) - b
  
  if (skinTone.type === 'warm') {
    return warmth > 0
  } else if (skinTone.type === 'cool') {
    return warmth < 0
  }
  
  return true // Neutral skin tones work with most colors
}