// Real image processing utilities
export const analyzeImageColors = (imageElement) => {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  
  canvas.width = imageElement.width
  canvas.height = imageElement.height
  ctx.drawImage(imageElement, 0, 0)
  
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
  const data = imageData.data
  
  const colors = []
  for (let i = 0; i < data.length; i += 4) {
    colors.push({
      r: data[i],
      g: data[i + 1],
      b: data[i + 2]
    })
  }
  
  return getDominantColors(colors)
}

const getDominantColors = (colors) => {
  const colorMap = new Map()
  
  colors.forEach(color => {
    const key = `${Math.floor(color.r/10)*10}-${Math.floor(color.g/10)*10}-${Math.floor(color.b/10)*10}`
    colorMap.set(key, (colorMap.get(key) || 0) + 1)
  })
  
  return Array.from(colorMap.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([key, count]) => {
      const [r, g, b] = key.split('-').map(Number)
      return { r, g, b, count, hex: rgbToHex(r, g, b) }
    })
}

export const detectSkinTone = (imageElement) => {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  
  canvas.width = imageElement.width
  canvas.height = imageElement.height
  ctx.drawImage(imageElement, 0, 0)
  
  // Sample face area (center 30% of image)
  const centerX = canvas.width * 0.35
  const centerY = canvas.height * 0.25
  const width = canvas.width * 0.3
  const height = canvas.height * 0.4
  
  const imageData = ctx.getImageData(centerX, centerY, width, height)
  const data = imageData.data
  
  const skinPixels = []
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i]
    const g = data[i + 1]
    const b = data[i + 2]
    
    if (isSkinColor(r, g, b)) {
      skinPixels.push({ r, g, b })
    }
  }
  
  if (skinPixels.length === 0) {
    return { undertone: 'neutral', confidence: 0.3, hex: '#D4A574' }
  }
  
  const avgSkin = skinPixels.reduce((acc, pixel) => ({
    r: acc.r + pixel.r,
    g: acc.g + pixel.g,
    b: acc.b + pixel.b
  }), { r: 0, g: 0, b: 0 })
  
  avgSkin.r = Math.round(avgSkin.r / skinPixels.length)
  avgSkin.g = Math.round(avgSkin.g / skinPixels.length)
  avgSkin.b = Math.round(avgSkin.b / skinPixels.length)
  
  return analyzeSkinUndertone(avgSkin)
}

const isSkinColor = (r, g, b) => {
  return (r > 95 && g > 40 && b > 20) &&
         (Math.max(r, g, b) - Math.min(r, g, b) > 15) &&
         (Math.abs(r - g) > 15) && (r > g) && (r > b)
}

const analyzeSkinUndertone = ({ r, g, b }) => {
  const hex = rgbToHex(r, g, b)
  const hsl = rgbToHsl(r, g, b)
  
  let undertone = 'neutral'
  let confidence = 0.7
  
  if (hsl.h >= 15 && hsl.h <= 35) {
    undertone = r > g + 10 ? 'warm' : 'cool'
    confidence = 0.8
  } else if (hsl.h < 15 || hsl.h > 35) {
    undertone = 'cool'
    confidence = 0.75
  }
  
  return { undertone, confidence, hex, hsl }
}

export const analyzeOutfitPhoto = (imageElement) => {
  const colors = analyzeImageColors(imageElement)
  const harmony = analyzeColorHarmony(colors)
  const composition = analyzeComposition(imageElement)
  
  return {
    colors,
    harmony,
    composition,
    overall: calculateOverallScore(harmony, composition)
  }
}

const analyzeColorHarmony = (colors) => {
  if (colors.length < 2) return { score: 60, feedback: 'Limited color palette' }
  
  const hues = colors.map(color => rgbToHsl(color.r, color.g, color.b).h)
  const complementary = hues.some((h1, i) => 
    hues.some((h2, j) => i !== j && Math.abs(h1 - h2) > 150 && Math.abs(h1 - h2) < 210)
  )
  
  const analogous = hues.some((h1, i) => 
    hues.some((h2, j) => i !== j && Math.abs(h1 - h2) < 60)
  )
  
  let score = 70
  let feedback = 'Good color coordination'
  
  if (complementary) {
    score += 15
    feedback = 'Excellent complementary colors'
  } else if (analogous) {
    score += 10
    feedback = 'Nice analogous color scheme'
  }
  
  return { score: Math.min(score, 100), feedback }
}

const analyzeComposition = (imageElement) => {
  const aspectRatio = imageElement.width / imageElement.height
  const isPortrait = aspectRatio < 1
  
  return {
    score: isPortrait ? 85 : 75,
    feedback: isPortrait ? 'Good full-body composition' : 'Consider portrait orientation'
  }
}

const calculateOverallScore = (harmony, composition) => {
  return Math.round((harmony.score * 0.6) + (composition.score * 0.4))
}

const rgbToHex = (r, g, b) => {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
}

const rgbToHsl = (r, g, b) => {
  r /= 255
  g /= 255
  b /= 255
  
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h, s, l = (max + min) / 2
  
  if (max === min) {
    h = s = 0
  } else {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break
      case g: h = (b - r) / d + 2; break
      case b: h = (r - g) / d + 4; break
    }
    h /= 6
  }
  
  return { h: h * 360, s: s * 100, l: l * 100 }
}