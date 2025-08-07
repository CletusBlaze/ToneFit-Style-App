// Push notifications for outfit reminders
export const requestNotificationPermission = async () => {
  if (!('Notification' in window)) {
    return false
  }

  const permission = await Notification.requestPermission()
  return permission === 'granted'
}

export const scheduleOutfitReminder = (outfit, time) => {
  if (!('serviceWorker' in navigator)) return

  const reminderTime = new Date(time).getTime() - Date.now()
  
  if (reminderTime > 0) {
    setTimeout(() => {
      new Notification('ToneFitStyle Reminder', {
        body: `Time to wear your ${outfit.occasion} outfit!`,
        icon: '/logo.png',
        badge: '/logo.png',
        tag: 'outfit-reminder'
      })
    }, reminderTime)
  }
}

export const sendDailyStyleTip = () => {
  const tips = [
    'Try mixing patterns today for a bold look!',
    'Add a pop of color with accessories',
    'Confidence is your best accessory',
    'Experiment with layering today'
  ]
  
  const randomTip = tips[Math.floor(Math.random() * tips.length)]
  
  new Notification('Daily Style Tip', {
    body: randomTip,
    icon: '/logo.png'
  })
}

export const initializeNotifications = () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
  }
}