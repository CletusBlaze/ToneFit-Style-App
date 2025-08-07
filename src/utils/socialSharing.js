export const shareToSocialMedia = (platform, content) => {
  const { image, description, hashtags = [] } = content
  const url = window.location.href
  const text = `${description} ${hashtags.map(tag => `#${tag}`).join(' ')}`
  
  const shareUrls = {
    instagram: () => {
      // Instagram doesn't support direct sharing, copy to clipboard
      navigator.clipboard.writeText(`${text}\n\nShared from ToneFitStyle`)
      alert('Caption copied! Open Instagram and paste in a new post.')
    },
    
    facebook: () => {
      const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`
      window.open(fbUrl, '_blank', 'width=600,height=400')
    },
    
    twitter: () => {
      const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`
      window.open(twitterUrl, '_blank', 'width=600,height=400')
    },
    
    pinterest: () => {
      const pinterestUrl = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&media=${encodeURIComponent(image)}&description=${encodeURIComponent(text)}`
      window.open(pinterestUrl, '_blank', 'width=600,height=400')
    },
    
    whatsapp: () => {
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${text}\n${url}`)}`
      window.open(whatsappUrl, '_blank')
    }
  }
  
  if (shareUrls[platform]) {
    shareUrls[platform]()
    return true
  }
  
  return false
}

export const generateShareableContent = (outfit, userProfile) => {
  return {
    image: outfit.image,
    description: `Check out my ${outfit.occasion || 'stylish'} outfit! 💫`,
    hashtags: [
      'ToneFitStyle',
      'OOTD',
      'StyleInspo',
      userProfile.bodyShape?.type,
      userProfile.skinTone?.type,
      outfit.occasion
    ].filter(Boolean)
  }
}