export const calculateBodyShape = (measurements) => {
  const { bust, waist, hips } = measurements
  const bustWaistRatio = bust / waist
  const hipWaistRatio = hips / waist

  if (hips > bust && hipWaistRatio >= 1.05) return 'Pear'
  if (bust > hips && bustWaistRatio >= 1.05) return 'Apple'
  if (Math.abs(bust - hips) <= 1 && bustWaistRatio < 1.09) return 'Rectangle'
  if (Math.abs(bust - hips) <= 1 && bustWaistRatio >= 1.09) return 'Hourglass'
  return 'Hourglass'
}

export const getShapeAdvice = (shape) => {
  const advice = {
    Pear: 'Highlight your upper body with bright colors and patterns',
    Apple: 'Draw attention to your legs with A-line skirts',
    Rectangle: 'Create curves with belts and fitted clothing',
    Hourglass: 'Emphasize your waist with fitted styles'
  }
  return advice[shape] || 'Dress for confidence!'
}