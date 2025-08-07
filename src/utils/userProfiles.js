import { db } from './database'

export const createUserProfile = (userId, profileData) => {
  const profiles = db.get('user_profiles') || {}
  
  profiles[userId] = {
    id: userId,
    ...profileData,
    createdAt: new Date().toISOString(),
    followers: 0,
    following: 0,
    posts: 0
  }
  
  db.set('user_profiles', profiles)
  return profiles[userId]
}

export const getUserProfile = (userId) => {
  const profiles = db.get('user_profiles') || {}
  return profiles[userId]
}

export const updateUserProfile = (userId, updates) => {
  const profiles = db.get('user_profiles') || {}
  if (profiles[userId]) {
    profiles[userId] = { ...profiles[userId], ...updates }
    db.set('user_profiles', profiles)
  }
  return profiles[userId]
}

export const getUserStats = (userId) => {
  const followers = db.get('user_followers') || {}
  const following = db.get('user_following') || {}
  const posts = db.get('tonefit_community_posts') || []
  
  return {
    followers: (followers[userId] || []).length,
    following: (following[userId] || []).length,
    posts: posts.filter(p => p.userId === userId).length
  }
}