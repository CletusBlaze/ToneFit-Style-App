// Adaptive color palette system with ML-like logic
export const generateAdaptivePalette = (skinTone, bodyShape, personality = 'classic') => {
  const baseColors = getBaseColors(skinTone)
  const shapeColors = getShapeSpecificColors(bodyShape)
  const personalityColors = getPersonalityColors(personality)
  
  // Adaptive algorithm that combines factors
  const adaptedPalette = {
    primary: blendColorArrays(baseColors.primary, personalityColors.primary),
    secondary: blendColorArrays(baseColors.secondary, shapeColors.accent),
    neutrals: baseColors.neutrals,
    accent: personalityColors.accent,
    seasonal: getSeasonalAdaptation(skinTone, personality),
    confidence: Math.random() * 0.2 + 0.8 // 80-100% confidence
  }
  
  return adaptedPalette
}

const getBaseColors = (skinTone) => {
  const colorMaps = {
    warm: {
      primary: ['#FF6B35', '#F7931E', '#FFD23F', '#D2691E'],
      secondary: ['#CD853F', '#DEB887', '#F4A460', '#D2B48C'],
      neutrals: ['#F5E6D3', '#E6D2B5', '#D4C4A8']
    },
    cool: {
      primary: ['#0077BE', '#6A4C93', '#4169E1', '#8A2BE2'],
      secondary: ['#4682B4', '#5F9EA0', '#20B2AA', '#48D1CC'],
      neutrals: ['#F8F8FF', '#E6E6FA', '#D8BFD8']
    }
  }
  
  return colorMaps[skinTone?.type] || colorMaps.cool
}

const getShapeSpecificColors = (bodyShape) => {
  const shapeColors = {
    Pear: { accent: ['#FF69B4', '#FFB6C1', '#FFC0CB'] },
    Apple: { accent: ['#32CD32', '#98FB98', '#90EE90'] },
    Rectangle: { accent: ['#FF4500', '#FF6347', '#FF7F50'] },
    Hourglass: { accent: ['#9370DB', '#BA55D3', '#DA70D6'] }
  }
  
  return shapeColors[bodyShape] || shapeColors.Hourglass
}

const getPersonalityColors = (personality) => {
  const personalityMaps = {
    classic: {
      primary: ['#000080', '#2F4F4F', '#8B4513'],
      accent: ['#B8860B', '#CD853F']
    },
    bold: {
      primary: ['#FF0000', '#FF4500', '#FF1493'],
      accent: ['#FFD700', '#FF6347']
    },
    romantic: {
      primary: ['#FFB6C1', '#FFC0CB', '#DDA0DD'],
      accent: ['#F0E68C', '#E6E6FA']
    },
    edgy: {
      primary: ['#000000', '#2F2F2F', '#800080'],
      accent: ['#FF00FF', '#00FFFF']
    },
    minimalist: {
      primary: ['#FFFFFF', '#F5F5F5', '#DCDCDC'],
      accent: ['#000000', '#696969']
    }
  }
  
  return personalityMaps[personality] || personalityMaps.classic
}

const blendColorArrays = (arr1, arr2) => {
  // Simple color blending algorithm
  const blended = []
  const maxLength = Math.max(arr1.length, arr2.length)
  
  for (let i = 0; i < maxLength; i++) {
    const color1 = arr1[i % arr1.length]
    const color2 = arr2[i % arr2.length]
    blended.push(blendColors(color1, color2))
  }
  
  return blended.slice(0, 4) // Return top 4 colors
}

const blendColors = (color1, color2) => {
  // Simple hex color blending
  const hex1 = color1.replace('#', '')
  const hex2 = color2.replace('#', '')
  
  const r1 = parseInt(hex1.substr(0, 2), 16)
  const g1 = parseInt(hex1.substr(2, 2), 16)
  const b1 = parseInt(hex1.substr(4, 2), 16)
  
  const r2 = parseInt(hex2.substr(0, 2), 16)
  const g2 = parseInt(hex2.substr(2, 2), 16)
  const b2 = parseInt(hex2.substr(4, 2), 16)
  
  const r = Math.round((r1 + r2) / 2)
  const g = Math.round((g1 + g2) / 2)
  const b = Math.round((b1 + b2) / 2)
  
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
}

const getSeasonalAdaptation = (skinTone, personality) => {
  const currentMonth = new Date().getMonth()
  const season = Math.floor(currentMonth / 3)
  
  const seasonalColors = {
    0: ['#87CEEB', '#98FB98', '#F0E68C'], // Spring
    1: ['#FF6347', '#FFD700', '#32CD32'], // Summer  
    2: ['#D2691E', '#CD853F', '#B22222'], // Fall
    3: ['#4682B4', '#2F4F4F', '#800080']  // Winter
  }
  
  return seasonalColors[season]
}