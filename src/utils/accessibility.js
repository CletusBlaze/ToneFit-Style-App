// Accessibility improvements for screen readers and keyboard navigation
export const announceToScreenReader = (message) => {
  const announcement = document.createElement('div')
  announcement.setAttribute('aria-live', 'polite')
  announcement.setAttribute('aria-atomic', 'true')
  announcement.className = 'sr-only'
  announcement.textContent = message
  
  document.body.appendChild(announcement)
  
  setTimeout(() => {
    document.body.removeChild(announcement)
  }, 1000)
}

export const trapFocus = (element) => {
  const focusableElements = element.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  )
  
  const firstElement = focusableElements[0]
  const lastElement = focusableElements[focusableElements.length - 1]
  
  const handleTabKey = (e) => {
    if (e.key === 'Tab') {
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus()
          e.preventDefault()
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus()
          e.preventDefault()
        }
      }
    }
    
    if (e.key === 'Escape') {
      element.querySelector('[data-close]')?.click()
    }
  }
  
  element.addEventListener('keydown', handleTabKey)
  firstElement?.focus()
  
  return () => element.removeEventListener('keydown', handleTabKey)
}

export const addKeyboardNavigation = (element, callbacks = {}) => {
  const handleKeyDown = (e) => {
    switch (e.key) {
      case 'Enter':
      case ' ':
        if (callbacks.onActivate) {
          e.preventDefault()
          callbacks.onActivate()
        }
        break
      case 'ArrowUp':
        if (callbacks.onUp) {
          e.preventDefault()
          callbacks.onUp()
        }
        break
      case 'ArrowDown':
        if (callbacks.onDown) {
          e.preventDefault()
          callbacks.onDown()
        }
        break
      case 'ArrowLeft':
        if (callbacks.onLeft) {
          e.preventDefault()
          callbacks.onLeft()
        }
        break
      case 'ArrowRight':
        if (callbacks.onRight) {
          e.preventDefault()
          callbacks.onRight()
        }
        break
    }
  }
  
  element.addEventListener('keydown', handleKeyDown)
  element.setAttribute('tabindex', '0')
  
  return () => element.removeEventListener('keydown', handleKeyDown)
}

export const enhanceFormAccessibility = (form) => {
  const inputs = form.querySelectorAll('input, select, textarea')
  
  inputs.forEach(input => {
    // Add required indicators
    if (input.required) {
      const label = form.querySelector(`label[for="${input.id}"]`)
      if (label && !label.textContent.includes('*')) {
        label.innerHTML += ' <span aria-label="required">*</span>'
      }
    }
    
    // Add error announcements
    input.addEventListener('invalid', () => {
      announceToScreenReader(`Error in ${input.name || input.id}: ${input.validationMessage}`)
    })
  })
}

export const initializeAccessibility = () => {
  // Add skip link
  const skipLink = document.createElement('a')
  skipLink.href = '#main-content'
  skipLink.textContent = 'Skip to main content'
  skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 bg-blue-600 text-white p-2 z-50'
  document.body.insertBefore(skipLink, document.body.firstChild)
  
  // Enhance all forms
  document.querySelectorAll('form').forEach(enhanceFormAccessibility)
  
  // Add focus indicators
  const style = document.createElement('style')
  style.textContent = `
    .focus\\:ring-2:focus {
      outline: 2px solid #3B82F6;
      outline-offset: 2px;
    }
    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }
    .focus\\:not-sr-only:focus {
      position: static;
      width: auto;
      height: auto;
      padding: inherit;
      margin: inherit;
      overflow: visible;
      clip: auto;
      white-space: normal;
    }
  `
  document.head.appendChild(style)
}