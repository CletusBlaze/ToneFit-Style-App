// Payment processing for premium features
export const PREMIUM_PLANS = {
  basic: {
    id: 'basic',
    name: 'Style Pro',
    price: 9.99,
    features: ['Unlimited AI consultations', 'Advanced outfit ratings', 'Priority support']
  },
  premium: {
    id: 'premium',
    name: 'Style Expert',
    price: 19.99,
    features: ['Everything in Pro', 'Personal stylist chat', 'Exclusive brand access', 'Custom challenges']
  }
}

export const processPayment = async (planId, paymentMethod) => {
  // Simulate payment processing
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  const plan = PREMIUM_PLANS[planId]
  if (!plan) throw new Error('Invalid plan')
  
  // Mock payment success
  const paymentResult = {
    success: true,
    transactionId: `txn_${Date.now()}`,
    plan: plan,
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
  }
  
  // Store premium status
  localStorage.setItem('premium_subscription', JSON.stringify(paymentResult))
  
  return paymentResult
}

export const checkPremiumStatus = () => {
  try {
    const subscription = JSON.parse(localStorage.getItem('premium_subscription'))
    if (!subscription) return { isPremium: false }
    
    const isExpired = new Date() > new Date(subscription.expiresAt)
    return {
      isPremium: !isExpired,
      plan: subscription.plan,
      expiresAt: subscription.expiresAt
    }
  } catch {
    return { isPremium: false }
  }
}

export const cancelSubscription = async () => {
  localStorage.removeItem('premium_subscription')
  return { success: true, message: 'Subscription cancelled' }
}