import { mlEngine } from './mlRecommendations'

// Enhanced AI Style Coach with ML recommendations
export const getAIStyleAdvice = (query, userProfile) => {
  const { bodyShape, skinTone, personality, savedOutfits } = userProfile
  
  // Parse query intent
  const intent = parseIntent(query.toLowerCase())
  
  // Generate ML-powered recommendations
  const context = extractContext(query, intent)
  const mlRecommendations = mlEngine.generateRecommendations(userProfile, context)
  
  // Generate contextual response
  const response = generateResponse(intent, query, userProfile, mlRecommendations)
  
  return {
    message: response.message,
    suggestions: response.suggestions,
    confidence: response.confidence,
    followUp: response.followUp,
    mlRecommendations: mlRecommendations.slice(0, 3)
  }
}

const parseIntent = (query) => {
  const intents = {
    occasion: ['wear to', 'going to', 'outfit for', 'dress for'],
    color: ['color', 'colours', 'what color', 'which color'],
    style: ['style', 'look', 'fashion', 'trendy'],
    body: ['body', 'shape', 'figure', 'flattering'],
    confidence: ['confident', 'feel good', 'look good', 'boost'],
    weather: ['weather', 'cold', 'hot', 'rain', 'sunny'],
    budget: ['cheap', 'affordable', 'expensive', 'budget']
  }
  
  for (const [intent, keywords] of Object.entries(intents)) {
    if (keywords.some(keyword => query.includes(keyword))) {
      return intent
    }
  }
  
  return 'general'
}

const extractContext = (query, intent) => {
  const context = { occasion: 'casual', weather: 'mild' }
  
  if (query.includes('work') || query.includes('office')) context.occasion = 'work'
  if (query.includes('date') || query.includes('romantic')) context.occasion = 'date'
  if (query.includes('party') || query.includes('event')) context.occasion = 'formal'
  if (query.includes('cold') || query.includes('winter')) context.weather = 'cold'
  if (query.includes('hot') || query.includes('summer')) context.weather = 'hot'
  
  return context
}

const generateResponse = (intent, query, userProfile, mlRecommendations = []) => {
  const responses = {
    occasion: generateOccasionAdvice(query, userProfile),
    color: generateColorAdvice(userProfile),
    style: generateStyleAdvice(userProfile),
    body: generateBodyAdvice(userProfile),
    confidence: generateConfidenceAdvice(userProfile),
    weather: generateWeatherAdvice(query, userProfile),
    budget: generateBudgetAdvice(userProfile),
    general: generateGeneralAdvice(userProfile)
  }
  
  return responses[intent] || responses.general
}

const generateOccasionAdvice = (query, userProfile, mlRecommendations = []) => {
  const occasions = {
    'work': 'Professional blazer with tailored pants',
    'date': 'Something that makes you feel confident and beautiful',
    'party': 'Statement piece that shows your personality',
    'casual': 'Comfortable yet put-together basics',
    'wedding': 'Elegant dress that complements the celebration'
  }
  
  const occasion = Object.keys(occasions).find(occ => query.includes(occ))
  const baseAdvice = occasions[occasion] || 'Choose something that reflects your personal style'
  
  const mlSuggestions = mlRecommendations.length > 0 
    ? mlRecommendations.map(rec => rec.name)
    : getPersonalizedSuggestions(userProfile, occasion)
  
  return {
    message: `For this occasion, I recommend: ${baseAdvice}. Based on your ${userProfile.bodyShape?.type} shape and ${userProfile.personality} style, here's what would work perfectly:`,
    suggestions: mlSuggestions,
    confidence: mlRecommendations.length > 0 ? mlRecommendations[0]?.confidence || 0.85 : 0.85,
    followUp: "Would you like specific color recommendations for this outfit?"
  }
}

const generateColorAdvice = (userProfile) => {
  const toneAdvice = userProfile.skinTone?.type === 'warm' 
    ? 'warm golds, corals, and earth tones'
    : 'cool blues, purples, and jewel tones'
    
  return {
    message: `With your ${userProfile.skinTone?.name} skin tone, you look amazing in ${toneAdvice}. These colors will make you glow!`,
    suggestions: ['Try a coral blouse', 'Add gold accessories', 'Experiment with earth tone layers'],
    confidence: 0.9,
    followUp: "Want me to suggest specific outfit combinations with these colors?"
  }
}

const generateStyleAdvice = (userProfile) => {
  const personalityStyles = {
    classic: 'timeless pieces like blazers, pearls, and tailored fits',
    bold: 'statement pieces, bright colors, and eye-catching accessories',
    romantic: 'soft fabrics, floral prints, and delicate details',
    edgy: 'leather jackets, bold cuts, and unique accessories',
    minimalist: 'clean lines, neutral colors, and quality basics'
  }
  
  const style = personalityStyles[userProfile.personality] || 'pieces that make you feel confident'
  
  return {
    message: `Your ${userProfile.personality} personality shines with ${style}. Let's build outfits that reflect your unique vibe!`,
    suggestions: getStyleSuggestions(userProfile.personality),
    confidence: 0.88,
    followUp: "Should I create a shopping list for your style personality?"
  }
}

const generateBodyAdvice = (userProfile) => {
  const shapeAdvice = {
    Pear: 'highlight your upper body with bright tops and statement accessories',
    Apple: 'create definition with wrap styles and empire waists',
    Rectangle: 'add curves with belts, peplum tops, and layering',
    Hourglass: 'emphasize your waist with fitted styles and belts'
  }
  
  const advice = shapeAdvice[userProfile.bodyShape?.type] || 'choose styles that make you feel amazing'
  
  return {
    message: `For your ${userProfile.bodyShape?.type} body shape, the key is to ${advice}. You have so many flattering options!`,
    suggestions: getBodyShapeSuggestions(userProfile.bodyShape?.type),
    confidence: 0.92,
    followUp: "Want me to show you specific outfit examples for your body shape?"
  }
}

const generateConfidenceAdvice = (userProfile) => {
  return {
    message: "Confidence comes from wearing what makes YOU feel amazing! Based on your profile, here's how to boost your style confidence:",
    suggestions: [
      'Wear colors that complement your skin tone',
      'Choose fits that flatter your body shape',
      'Add one piece that reflects your personality',
      'Practice good posture - it changes everything!'
    ],
    confidence: 0.95,
    followUp: "Tell me about a time you felt really confident in an outfit - let's recreate that feeling!"
  }
}

const generateWeatherAdvice = (query, userProfile) => {
  const weather = query.includes('cold') ? 'cold' : query.includes('hot') ? 'hot' : 'mild'
  
  const weatherAdvice = {
    cold: 'Layer with style! Start with a base, add a cozy sweater, and top with a chic coat',
    hot: 'Keep it cool and breezy with lightweight fabrics and breathable styles',
    mild: 'Perfect weather for versatile pieces - light layers you can adjust'
  }
  
  return {
    message: weatherAdvice[weather],
    suggestions: getWeatherSuggestions(weather, userProfile),
    confidence: 0.8,
    followUp: "Need specific fabric recommendations for this weather?"
  }
}

const generateBudgetAdvice = (userProfile) => {
  return {
    message: "Great style doesn't have to break the bank! Here are my budget-friendly tips:",
    suggestions: [
      'Invest in quality basics that mix and match',
      'Add personality with affordable accessories',
      'Shop your closet first - try new combinations',
      'Look for versatile pieces that work multiple ways'
    ],
    confidence: 0.87,
    followUp: "Want me to help you create multiple outfits from pieces you already own?"
  }
}

const generateGeneralAdvice = (userProfile) => {
  return {
    message: "I'm here to help you look and feel amazing! What specific style question can I help you with today?",
    suggestions: [
      'Ask me about outfit ideas for any occasion',
      'Get color recommendations for your skin tone',
      'Learn what styles flatter your body shape',
      'Discover how to express your personality through fashion'
    ],
    confidence: 0.9,
    followUp: "Try asking me something like 'What should I wear to a job interview?' or 'What colors look best on me?'"
  }
}

// Helper functions
const getPersonalizedSuggestions = (userProfile, occasion) => {
  return [
    `A ${userProfile.skinTone?.type || 'flattering'} colored top`,
    `Bottoms that complement your ${userProfile.bodyShape?.type || 'beautiful'} shape`,
    `Accessories that match your ${userProfile.personality || 'unique'} style`
  ]
}

const getStyleSuggestions = (personality) => {
  const suggestions = {
    classic: ['Navy blazer', 'White button-down', 'Pearl accessories'],
    bold: ['Statement necklace', 'Bright colored dress', 'Bold print scarf'],
    romantic: ['Floral blouse', 'Soft cardigan', 'Delicate jewelry'],
    edgy: ['Leather jacket', 'Dark jeans', 'Statement boots'],
    minimalist: ['White tee', 'Black trousers', 'Simple gold jewelry']
  }
  
  return suggestions[personality] || ['Pieces that reflect your unique style']
}

const getBodyShapeSuggestions = (bodyShape) => {
  const suggestions = {
    Pear: ['Bright colored tops', 'Statement necklaces', 'A-line skirts'],
    Apple: ['V-neck tops', 'Empire waist dresses', 'Long cardigans'],
    Rectangle: ['Peplum tops', 'Wide belts', 'Textured fabrics'],
    Hourglass: ['Wrap dresses', 'Fitted blazers', 'High-waisted bottoms']
  }
  
  return suggestions[bodyShape] || ['Styles that make you feel confident']
}

const getWeatherSuggestions = (weather, userProfile) => {
  const suggestions = {
    cold: ['Cozy sweater', 'Stylish coat', 'Warm accessories'],
    hot: ['Breathable fabrics', 'Light colors', 'Minimal layers'],
    mild: ['Light cardigan', 'Versatile pieces', 'Comfortable shoes']
  }
  
  return suggestions[weather] || ['Weather-appropriate pieces']
}