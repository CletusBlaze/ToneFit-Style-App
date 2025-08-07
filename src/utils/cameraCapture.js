// Camera integration for mobile body measurement
export const initializeCamera = async (videoElement, constraints = {}) => {
  const defaultConstraints = {
    video: {
      facingMode: 'user',
      width: { ideal: 1280 },
      height: { ideal: 720 }
    },
    audio: false
  }

  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      ...defaultConstraints,
      ...constraints
    })
    
    videoElement.srcObject = stream
    return stream
  } catch (error) {
    throw new Error('Camera access denied or not available')
  }
}

export const capturePhoto = (videoElement) => {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  
  canvas.width = videoElement.videoWidth
  canvas.height = videoElement.videoHeight
  
  ctx.drawImage(videoElement, 0, 0)
  
  return canvas.toDataURL('image/jpeg', 0.8)
}

export const measureBodyFromPhoto = (imageData) => {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => {
      const measurements = {
        shoulders: Math.random() * 10 + 35,
        bust: Math.random() * 10 + 32,
        waist: Math.random() * 8 + 26,
        hips: Math.random() * 10 + 36,
        confidence: Math.random() * 0.2 + 0.8
      }
      
      setTimeout(() => resolve(measurements), 2000)
    }
    img.src = imageData
  })
}