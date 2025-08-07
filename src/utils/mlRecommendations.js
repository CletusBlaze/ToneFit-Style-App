// Advanced ML-style recommendation engine
export class RecommendationEngine {
  constructor() {
    this.weights = {
      bodyShape: 0.3,
      skinTone: 0.25,
      personality: 0.2,
      history: 0.15,
      trends: 0.1
    }
  }

  generateRecommendations(userProfile, context = {}) {
    const features = this.extractFeatures(userProfile, context)
    const scores = this.calculateScores(features)
    return this.rankRecommendations(scores)
  }

  extractFeatures(userProfile, context) {
    return {
      bodyShape: this.encodeBodyShape(userProfile.bodyShape),
      skinTone: this.encodeSkinTone(userProfile.skinTone),
      personality: this.encodePersonality(userProfile.personality),
      occasion: this.encodeOccasion(context.occasion),
      weather: this.encodeWeather(context.weather),
      history: this.encodeHistory(userProfile.styleJournal)
    }
  }

  encodeBodyShape(bodyShape) {
    const shapeMap = {
      'pear': [1, 0, 0, 0],
      'apple': [0, 1, 0, 0],
      'rectangle': [0, 0, 1, 0],
      'hourglass': [0, 0, 0, 1]
    }
    return shapeMap[bodyShape?.type] || [0.25, 0.25, 0.25, 0.25]
  }

  encodeSkinTone(skinTone) {
    const toneMap = {
      'warm': [1, 0, 0],
      'cool': [0, 1, 0],
      'neutral': [0, 0, 1]
    }
    return toneMap[skinTone?.undertone] || [0.33, 0.33, 0.33]
  }

  encodePersonality(personality) {
    const personalityMap = {
      'classic': [1, 0, 0, 0, 0],
      'bold': [0, 1, 0, 0, 0],
      'romantic': [0, 0, 1, 0, 0],
      'edgy': [0, 0, 0, 1, 0],
      'minimalist': [0, 0, 0, 0, 1]
    }
    return personalityMap[personality?.type] || [0.2, 0.2, 0.2, 0.2, 0.2]
  }

  encodeOccasion(occasion) {
    const occasionMap = {
      'work': [1, 0, 0, 0],
      'casual': [0, 1, 0, 0],
      'formal': [0, 0, 1, 0],
      'date': [0, 0, 0, 1]
    }
    return occasionMap[occasion] || [0.25, 0.25, 0.25, 0.25]
  }

  encodeWeather(weather) {
    const weatherMap = {
      'hot': [1, 0, 0],
      'mild': [0, 1, 0],
      'cold': [0, 0, 1]
    }
    return weatherMap[weather] || [0.33, 0.33, 0.33]
  }

  encodeHistory(styleJournal = []) {
    if (styleJournal.length === 0) return [0, 0, 0]
    
    const avgConfidence = styleJournal.reduce((acc, entry) => acc + entry.confidence, 0) / styleJournal.length
    const avgCompliments = styleJournal.reduce((acc, entry) => acc + entry.compliments, 0) / styleJournal.length
    
    return [avgConfidence / 10, avgCompliments / 5, styleJournal.length / 50]
  }

  calculateScores(features) {
    const outfitTemplates = this.getOutfitTemplates()
    
    return outfitTemplates.map(template => {
      let score = 0
      
      // Body shape compatibility
      score += this.dotProduct(features.bodyShape, template.bodyShapeScore) * this.weights.bodyShape
      
      // Skin tone compatibility
      score += this.dotProduct(features.skinTone, template.skinToneScore) * this.weights.skinTone
      
      // Personality match
      score += this.dotProduct(features.personality, template.personalityScore) * this.weights.personality
      
      // Occasion appropriateness
      score += this.dotProduct(features.occasion, template.occasionScore) * this.weights.history
      
      // Trend factor
      score += template.trendScore * this.weights.trends
      
      return {
        ...template,
        score: Math.min(score * 100, 100),
        confidence: this.calculateConfidence(score)
      }
    })
  }

  dotProduct(a, b) {
    return a.reduce((sum, val, i) => sum + val * b[i], 0)
  }

  calculateConfidence(score) {
    return Math.min(0.6 + (score * 0.4), 0.95)
  }

  rankRecommendations(scores) {
    return scores
      .sort((a, b) => b.score - a.score)
      .slice(0, 10)
      .map((item, index) => ({
        ...item,
        rank: index + 1,
        reasoning: this.generateReasoning(item)
      }))
  }

  generateReasoning(recommendation) {
    const reasons = []
    
    if (recommendation.score > 85) {
      reasons.push('Perfect match for your style profile')
    }
    if (recommendation.bodyShapeScore.some(s => s > 0.8)) {
      reasons.push('Flatters your body shape')
    }
    if (recommendation.skinToneScore.some(s => s > 0.8)) {
      reasons.push('Complements your skin tone')
    }
    if (recommendation.trendScore > 0.7) {
      reasons.push('Currently trending')
    }
    
    return reasons.length > 0 ? reasons : ['Good overall match']
  }

  getOutfitTemplates() {
    return [
      {
        id: 1,
        name: 'Classic Blazer Look',
        items: ['blazer', 'blouse', 'trousers'],
        bodyShapeScore: [0.8, 0.9, 0.7, 0.8],
        skinToneScore: [0.7, 0.8, 0.9],
        personalityScore: [0.9, 0.3, 0.5, 0.2, 0.7],
        occasionScore: [0.9, 0.3, 0.8, 0.6],
        trendScore: 0.7
      },
      {
        id: 2,
        name: 'Casual Chic',
        items: ['jeans', 'sweater', 'sneakers'],
        bodyShapeScore: [0.7, 0.6, 0.8, 0.7],
        skinToneScore: [0.8, 0.7, 0.8],
        personalityScore: [0.5, 0.6, 0.4, 0.7, 0.8],
        occasionScore: [0.2, 0.9, 0.3, 0.7],
        trendScore: 0.8
      },
      {
        id: 3,
        name: 'Elegant Dress',
        items: ['dress', 'heels', 'accessories'],
        bodyShapeScore: [0.6, 0.7, 0.5, 0.9],
        skinToneScore: [0.9, 0.8, 0.7],
        personalityScore: [0.7, 0.8, 0.9, 0.5, 0.4],
        occasionScore: [0.6, 0.4, 0.9, 0.9],
        trendScore: 0.6
      }
    ]
  }
}

export const mlEngine = new RecommendationEngine()