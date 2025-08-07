import { detectSkinTone } from './imageProcessing'

// Enhanced skin tone analysis using real image processing
export const analyzeSkinTone = async (imageData) => {
  await new Promise(resolve => setTimeout(resolve, 1500))
  
  const img = new Image()
  
  return new Promise((resolve) => {
    img.onload = () => {
      const result = detectSkinTone(img)
      const analysis = getDetailedAnalysis(result)
      
      resolve({
        name: analysis.name,
        type: result.undertone,
        hex: result.hex,
        confidence: result.confidence,
        season: analysis.season,
        bestColors: analysis.bestColors,
        avoidColors: analysis.avoidColors,
        description: analysis.description
      })
    }
    
    img.src = imageData
  })
}

const getDetailedAnalysis = (result) => {
  const { undertone, confidence, hsl } = result
  
  const analysis = {
    warm: {
      name: hsl?.l > 60 ? 'Light Warm' : 'Deep Warm',
      description: 'You have warm undertones with golden, peachy, or yellow hues',
      bestColors: ['coral', 'warm red', 'golden yellow', 'olive green', 'warm brown'],
      avoidColors: ['cool blue', 'silver', 'cool pink', 'pure white']
    },
    cool: {
      name: hsl?.l > 60 ? 'Light Cool' : 'Deep Cool',
      description: 'You have cool undertones with pink, red, or blue hues',
      bestColors: ['cool blue', 'emerald green', 'cool pink', 'purple', 'true red'],
      avoidColors: ['orange', 'golden yellow', 'warm brown', 'peach']
    },
    neutral: {
      name: hsl?.l > 60 ? 'Light Neutral' : 'Medium Neutral',
      description: 'You have balanced undertones that work with both warm and cool colors',
      bestColors: ['navy', 'soft pink', 'sage green', 'cream', 'burgundy'],
      avoidColors: ['very bright colors', 'neon shades']
    }
  }
  
  const baseAnalysis = analysis[undertone] || analysis.neutral
  
  return {
    ...baseAnalysis,
    season: getColorSeason(undertone, hsl)
  }
}

const getColorSeason = (undertone, hsl) => {
  if (!hsl) return 'Unknown'
  
  const { l } = hsl
  
  if (undertone === 'warm') {
    return l > 60 ? 'Spring' : 'Autumn'
  } else if (undertone === 'cool') {
    return l > 60 ? 'Summer' : 'Winter'
  }
  return 'Neutral'
}

const determineUndertone = (r, g, b) => {
  // Simplified undertone detection
  const yellowness = (r + g) / 2 - b
  const pinkness = (r + b) / 2 - g
  
  return yellowness > pinkness ? 'warm' : 'cool'
}

const classifySkinTone = (r, g, b, undertone) => {
  const brightness = (r + g + b) / 3
  
  const tones = {
    warm: [
      { name: 'Fair Warm', hex: '#F2D2A9', range: [200, 255] },
      { name: 'Light Warm', hex: '#DDB180', range: [160, 199] },
      { name: 'Medium Warm', hex: '#B08155', range: [120, 159] },
      { name: 'Deep Warm', hex: '#6F4E37', range: [80, 119] }
    ],
    cool: [
      { name: 'Fair Cool', hex: '#F7E7CE', range: [200, 255] },
      { name: 'Light Cool', hex: '#E8C5A0', range: [160, 199] },
      { name: 'Medium Cool', hex: '#C8956D', range: [120, 159] },
      { name: 'Deep Cool', hex: '#8B5A3C', range: [80, 119] }
    ]
  }
  
  const toneGroup = tones[undertone]
  for (const tone of toneGroup) {
    if (brightness >= tone.range[0] && brightness <= tone.range[1]) {
      return tone
    }
  }
  
  return toneGroup[1] // Default to light
}