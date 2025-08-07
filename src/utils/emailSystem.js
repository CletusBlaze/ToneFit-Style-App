// Email system for notifications and marketing
export const sendWelcomeEmail = async (userEmail, userName) => {
  const emailData = {
    to: userEmail,
    subject: 'Welcome to ToneFitStyle! 💜',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #8B5CF6;">Welcome to ToneFitStyle, ${userName}!</h1>
        <p>We're excited to help you discover your perfect style.</p>
        <div style="background: linear-gradient(135deg, #8B5CF6, #EC4899); padding: 20px; border-radius: 10px; color: white; text-align: center; margin: 20px 0;">
          <h2>Get Started Today</h2>
          <p>Complete your style profile to get personalized recommendations</p>
          <a href="${process.env.NEXT_PUBLIC_APP_URL}/measurement" style="background: white; color: #8B5CF6; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Start Analysis</a>
        </div>
      </div>
    `
  }
  
  // Simulate email sending
  console.log('Sending welcome email:', emailData)
  return { success: true, messageId: Date.now().toString() }
}

export const sendOutfitReminder = async (userEmail, outfit, scheduledTime) => {
  const emailData = {
    to: userEmail,
    subject: `Outfit Reminder: ${outfit.occasion} look ready! ✨`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Your ${outfit.occasion} outfit is ready!</h2>
        <p>Don't forget about your scheduled outfit for ${new Date(scheduledTime).toLocaleDateString()}.</p>
        <div style="border: 1px solid #ddd; padding: 15px; border-radius: 8px; margin: 15px 0;">
          <h3>${outfit.name || 'Your Outfit'}</h3>
          <p><strong>Occasion:</strong> ${outfit.occasion}</p>
          <p><strong>Items:</strong> ${outfit.items?.join(', ') || 'Custom outfit'}</p>
        </div>
      </div>
    `
  }
  
  console.log('Sending outfit reminder:', emailData)
  return { success: true }
}