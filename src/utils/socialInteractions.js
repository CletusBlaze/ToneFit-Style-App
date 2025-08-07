import { db, collections } from './database'

// Real-time social interactions
export const likePost = (postId, userId) => {
  const posts = db.get(collections.COMMUNITY_POSTS) || []
  const postIndex = posts.findIndex(p => p.id === postId)
  
  if (postIndex !== -1) {
    const post = posts[postIndex]
    const likes = post.likes || []
    
    if (likes.includes(userId)) {
      post.likes = likes.filter(id => id !== userId)
    } else {
      post.likes = [...likes, userId]
    }
    
    posts[postIndex] = post
    db.set(collections.COMMUNITY_POSTS, posts)
    
    // Simulate real-time update
    window.dispatchEvent(new CustomEvent('postUpdated', { detail: post }))
    
    return post
  }
}

export const commentOnPost = (postId, userId, comment) => {
  const posts = db.get(collections.COMMUNITY_POSTS) || []
  const postIndex = posts.findIndex(p => p.id === postId)
  
  if (postIndex !== -1) {
    const post = posts[postIndex]
    const newComment = {
      id: Date.now(),
      userId,
      text: comment,
      timestamp: new Date().toISOString()
    }
    
    post.comments = [...(post.comments || []), newComment]
    posts[postIndex] = post
    db.set(collections.COMMUNITY_POSTS, posts)
    
    window.dispatchEvent(new CustomEvent('postUpdated', { detail: post }))
    
    return post
  }
}

export const sharePost = (postId, platform) => {
  const posts = db.get(collections.COMMUNITY_POSTS) || []
  const post = posts.find(p => p.id === postId)
  
  if (post) {
    const shareUrls = {
      instagram: `https://www.instagram.com/`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.description)}&url=${encodeURIComponent(window.location.href)}`,
      pinterest: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(window.location.href)}&description=${encodeURIComponent(post.description)}`
    }
    
    if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400')
      
      // Track share
      post.shares = (post.shares || 0) + 1
      const postIndex = posts.findIndex(p => p.id === postId)
      posts[postIndex] = post
      db.set(collections.COMMUNITY_POSTS, posts)
    }
  }
}

export const followUser = (followerId, followingId) => {
  const followers = db.get('user_followers') || {}
  const following = db.get('user_following') || {}
  
  if (!followers[followingId]) followers[followingId] = []
  if (!following[followerId]) following[followerId] = []
  
  if (!followers[followingId].includes(followerId)) {
    followers[followingId].push(followerId)
    following[followerId].push(followingId)
    
    db.set('user_followers', followers)
    db.set('user_following', following)
    
    return true
  }
  
  return false
}

export const unfollowUser = (followerId, followingId) => {
  const followers = db.get('user_followers') || {}
  const following = db.get('user_following') || {}
  
  if (followers[followingId]) {
    followers[followingId] = followers[followingId].filter(id => id !== followerId)
  }
  
  if (following[followerId]) {
    following[followerId] = following[followerId].filter(id => id !== followingId)
  }
  
  db.set('user_followers', followers)
  db.set('user_following', following)
  
  return true
}