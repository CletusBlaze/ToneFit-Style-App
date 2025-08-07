// Touch gestures for mobile interactions
export const useTouchGestures = (element, callbacks = {}) => {
  let startX, startY, startTime
  
  const handleTouchStart = (e) => {
    const touch = e.touches[0]
    startX = touch.clientX
    startY = touch.clientY
    startTime = Date.now()
  }
  
  const handleTouchEnd = (e) => {
    if (!startX || !startY) return
    
    const touch = e.changedTouches[0]
    const endX = touch.clientX
    const endY = touch.clientY
    const endTime = Date.now()
    
    const deltaX = endX - startX
    const deltaY = endY - startY
    const deltaTime = endTime - startTime
    
    // Swipe detection
    if (Math.abs(deltaX) > 50 && deltaTime < 300) {
      if (deltaX > 0 && callbacks.onSwipeRight) {
        callbacks.onSwipeRight()
      } else if (deltaX < 0 && callbacks.onSwipeLeft) {
        callbacks.onSwipeLeft()
      }
    }
    
    if (Math.abs(deltaY) > 50 && deltaTime < 300) {
      if (deltaY > 0 && callbacks.onSwipeDown) {
        callbacks.onSwipeDown()
      } else if (deltaY < 0 && callbacks.onSwipeUp) {
        callbacks.onSwipeUp()
      }
    }
    
    // Tap detection
    if (Math.abs(deltaX) < 10 && Math.abs(deltaY) < 10 && deltaTime < 200) {
      if (callbacks.onTap) {
        callbacks.onTap()
      }
    }
    
    // Long press detection
    if (Math.abs(deltaX) < 10 && Math.abs(deltaY) < 10 && deltaTime > 500) {
      if (callbacks.onLongPress) {
        callbacks.onLongPress()
      }
    }
  }
  
  element.addEventListener('touchstart', handleTouchStart, { passive: true })
  element.addEventListener('touchend', handleTouchEnd, { passive: true })
  
  return () => {
    element.removeEventListener('touchstart', handleTouchStart)
    element.removeEventListener('touchend', handleTouchEnd)
  }
}

export const enablePullToRefresh = (callback) => {
  let startY = 0
  let currentY = 0
  let isPulling = false
  
  const handleTouchStart = (e) => {
    if (window.scrollY === 0) {
      startY = e.touches[0].clientY
      isPulling = true
    }
  }
  
  const handleTouchMove = (e) => {
    if (!isPulling) return
    
    currentY = e.touches[0].clientY
    const pullDistance = currentY - startY
    
    if (pullDistance > 100) {
      document.body.style.transform = `translateY(${Math.min(pullDistance - 100, 50)}px)`
    }
  }
  
  const handleTouchEnd = () => {
    if (!isPulling) return
    
    const pullDistance = currentY - startY
    
    if (pullDistance > 100) {
      callback()
    }
    
    document.body.style.transform = ''
    isPulling = false
  }
  
  document.addEventListener('touchstart', handleTouchStart, { passive: true })
  document.addEventListener('touchmove', handleTouchMove, { passive: true })
  document.addEventListener('touchend', handleTouchEnd, { passive: true })
}