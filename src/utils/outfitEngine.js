// Enhanced outfit recommendation engine with static rules
export const outfitDatabase = {
  Pear: {
    casual: [
      { 
        top: 'Bright Striped Top', 
        bottom: 'Dark Skinny Jeans', 
        accessory: 'Statement Necklace',
        colors: ['bright', 'neutral'],
        occasion: 'casual',
        image: '/outfits/pear-casual-1.jpg'
      },
      { 
        top: 'Embellished Blouse', 
        bottom: 'A-line Skirt', 
        accessory: 'Wide Belt',
        colors: ['jewel', 'neutral'],
        occasion: 'casual',
        image: '/outfits/pear-casual-2.jpg'
      }
    ],
    work: [
      { 
        top: 'Structured Blazer', 
        bottom: 'Straight Leg Trousers', 
        accessory: 'Pearl Earrings',
        colors: ['professional', 'neutral'],
        occasion: 'work',
        image: '/outfits/pear-work-1.jpg'
      }
    ],
    date: [
      { 
        top: 'Off-shoulder Top', 
        bottom: 'High-waisted Jeans', 
        accessory: 'Delicate Jewelry',
        colors: ['romantic', 'soft'],
        occasion: 'date',
        image: '/outfits/pear-date-1.jpg'
      }
    ]
  },
  Apple: {
    casual: [
      { 
        top: 'V-neck Tunic', 
        bottom: 'Leggings', 
        accessory: 'Long Cardigan',
        colors: ['flowing', 'neutral'],
        occasion: 'casual',
        image: '/outfits/apple-casual-1.jpg'
      }
    ],
    work: [
      { 
        top: 'Wrap Dress', 
        bottom: '', 
        accessory: 'Structured Jacket',
        colors: ['professional', 'solid'],
        occasion: 'work',
        image: '/outfits/apple-work-1.jpg'
      }
    ]
  },
  Rectangle: {
    casual: [
      { 
        top: 'Peplum Top', 
        bottom: 'Skinny Jeans', 
        accessory: 'Wide Belt',
        colors: ['curve-creating', 'contrast'],
        occasion: 'casual',
        image: '/outfits/rectangle-casual-1.jpg'
      }
    ]
  },
  Hourglass: {
    casual: [
      { 
        top: 'Fitted Blouse', 
        bottom: 'High-waisted Skirt', 
        accessory: 'Thin Belt',
        colors: ['fitted', 'balanced'],
        occasion: 'casual',
        image: '/outfits/hourglass-casual-1.jpg'
      }
    ]
  }
}

export const generateOutfitRecommendations = (bodyShape, skinTone, occasion = 'casual') => {
  const shapeOutfits = outfitDatabase[bodyShape] || {}
  const occasionOutfits = shapeOutfits[occasion] || shapeOutfits.casual || []
  
  return occasionOutfits.map(outfit => ({
    ...outfit,
    styleReason: getStyleReason(bodyShape, outfit),
    colorMatch: getColorMatch(skinTone, outfit.colors),
    confidenceBoost: getConfidenceBoost(bodyShape, outfit)
  }))
}

const getStyleReason = (bodyShape, outfit) => {
  const reasons = {
    Pear: 'Draws attention to your upper body and balances your silhouette',
    Apple: 'Creates a flattering line and emphasizes your best features',
    Rectangle: 'Adds curves and creates the illusion of an hourglass figure',
    Hourglass: 'Accentuates your natural curves and maintains perfect proportions'
  }
  return reasons[bodyShape] || 'Flatters your unique body shape'
}

const getColorMatch = (skinTone, outfitColors) => {
  if (!skinTone) return 'Choose colors that complement your skin tone'
  
  const toneType = skinTone.type
  if (toneType === 'warm') {
    return 'These warm tones will make your skin glow'
  } else {
    return 'These cool tones perfectly complement your undertones'
  }
}

const getConfidenceBoost = (bodyShape, outfit) => {
  const boosts = [
    'You\'ll feel amazing in this combination!',
    'This outfit will boost your confidence instantly',
    'Perfect for showcasing your personal style',
    'You\'ll turn heads with this stunning look'
  ]
  return boosts[Math.floor(Math.random() * boosts.length)]
}