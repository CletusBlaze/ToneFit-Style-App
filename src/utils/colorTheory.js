// Enhanced color theory logic with seasonal analysis
export const colorTheoryRules = {
  warm: {
    primary: ['#FF6B35', '#F7931E', '#FFD23F', '#D2691E', '#CD853F'],
    secondary: ['#FF9F1C', '#E71D36', '#2EC4B6', '#8B4513', '#A0522D'],
    neutrals: ['#F5E6D3', '#E6D2B5', '#D4C4A8', '#C8B99C'],
    avoid: ['#0077BE', '#6A4C93', '#4169E1', '#000080', '#483D8B'],
    description: 'Warm undertones work best with golden, coral, and earth tones',
    season: 'Spring/Autumn',
    metals: ['gold', 'copper', 'bronze']
  },
  cool: {
    primary: ['#0077BE', '#6A4C93', '#4169E1', '#8A2BE2', '#9370DB'],
    secondary: ['#8338EC', '#3A86FF', '#20B2AA', '#4682B4', '#5F9EA0'],
    neutrals: ['#F8F8FF', '#E6E6FA', '#D8BFD8', '#DDA0DD'],
    avoid: ['#FF6B35', '#F7931E', '#FFD700', '#FF4500', '#DC143C'],
    description: 'Cool undertones complement blues, purples, and jewel tones',
    season: 'Winter/Summer',
    metals: ['silver', 'platinum', 'white gold']
  }
}

export const analyzeColorHarmony = (skinTone, bodyShape) => {
  const toneType = skinTone.type
  const colors = colorTheoryRules[toneType]
  
  const recommendations = {
    bestColors: colors.primary,
    accentColors: colors.secondary,
    neutralColors: colors.neutrals,
    avoidColors: colors.avoid,
    description: colors.description,
    season: colors.season,
    recommendedMetals: colors.metals,
    bodyShapeAdvice: getColorAdviceForShape(bodyShape, toneType),
    colorPsychology: getColorPsychology(toneType),
    seasonalTips: getSeasonalTips(toneType)
  }
  
  return recommendations
}

const getColorAdviceForShape = (bodyShape, toneType) => {
  const advice = {
    Pear: {
      warm: 'Use bright warm colors on top to draw attention upward. Golden yellows and coral pinks work beautifully.',
      cool: 'Cool jewel tones on your upper body create perfect balance. Try sapphire blues and emerald greens.'
    },
    Apple: {
      warm: 'Warm earth tones create a flattering silhouette. Rust, terracotta, and warm browns are perfect.',
      cool: 'Cool blues and purples elongate your torso beautifully. Navy and royal purple are excellent choices.'
    },
    Rectangle: {
      warm: 'Warm colors add curves and dimension to your frame. Use contrasting warm tones to create definition.',
      cool: 'Cool contrasting colors create the illusion of curves. Try pairing cool blues with silver accents.'
    },
    Hourglass: {
      warm: 'Warm tones enhance your natural curves perfectly. Embrace rich golds and warm reds.',
      cool: 'Cool colors highlight your balanced proportions. Jewel tones will make you shine.'
    }
  }
  
  return advice[bodyShape]?.[toneType] || 'Colors that complement your skin tone will enhance your natural beauty'
}

const getColorPsychology = (toneType) => {
  const psychology = {
    warm: 'Warm colors boost confidence and energy. They make you appear approachable and vibrant.',
    cool: 'Cool colors convey sophistication and calm. They create a polished, professional appearance.'
  }
  return psychology[toneType]
}

const getSeasonalTips = (toneType) => {
  const tips = {
    warm: {
      spring: 'Light, clear warm colors like peach and golden yellow',
      summer: 'Warm but muted tones like dusty rose and sage green',
      fall: 'Rich, deep warm colors like burgundy and forest green',
      winter: 'Add warm accessories to cool winter outfits'
    },
    cool: {
      spring: 'Add cool accessories to warm spring trends',
      summer: 'Perfect season for pastels and soft cool tones',
      fall: 'Cool jewel tones work beautifully in autumn',
      winter: 'Your ideal season - embrace deep cool colors'
    }
  }
  return tips[toneType]
}