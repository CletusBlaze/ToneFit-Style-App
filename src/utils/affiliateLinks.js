// Affiliate link management
const AFFILIATE_IDS = {
  amazon: 'tonefitstyle-20',
  nordstrom: 'tonefit123',
  asos: 'TFS2024'
}

export const generateAffiliateLink = (originalUrl, brand) => {
  const affiliateId = AFFILIATE_IDS[brand.toLowerCase()]
  if (!affiliateId) return originalUrl

  try {
    const url = new URL(originalUrl)
    
    switch (brand.toLowerCase()) {
      case 'amazon':
        url.searchParams.set('tag', affiliateId)
        break
      case 'nordstrom':
        url.searchParams.set('affiliate', affiliateId)
        break
      case 'asos':
        url.searchParams.set('ref', affiliateId)
        break
      default:
        url.searchParams.set('affiliate', affiliateId)
    }
    
    return url.toString()
  } catch {
    return originalUrl
  }
}

export const trackAffiliateClick = async (productId, brand, userId) => {
  try {
    await fetch('/api/analytics/affiliate-click', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        productId,
        brand,
        userId,
        timestamp: new Date().toISOString()
      })
    })
  } catch (error) {
    console.error('Failed to track affiliate click:', error)
  }
}

export const mockProducts = [
  {
    id: 1,
    name: 'Floral Summer Dress',
    brand: 'Amazon',
    price: 49.99,
    originalUrl: 'https://amazon.com/product/123',
    image: '/1.jfif',
    category: 'dresses'
  },
  {
    id: 2,
    name: 'Classic Blazer',
    brand: 'Nordstrom',
    price: 129.99,
    originalUrl: 'https://nordstrom.com/product/456',
    image: '/2.jfif',
    category: 'blazers'
  }
]