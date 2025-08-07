import { create } from 'zustand'
import { getCurrentSession } from '../utils/auth'
import { db, collections } from '../utils/database'

export const useStore = create((set, get) => ({
  // Authentication state
  auth: {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    token: null
  },
  // User profile data
  user: {
    bodyShape: null,
    skinTone: null,
    measurements: null,
    personality: null,
  },
  savedOutfits: [],
  styleJournal: [],
  activeChallenges: [],
  wardrobeItems: [],
  communityPosts: [],
  outfitCalendar: {},
  darkMode: false,
  setBodyShape: (shape) => set((state) => ({ 
    user: { ...state.user, bodyShape: shape } 
  })),
  setSkinTone: (tone) => set((state) => ({ 
    user: { ...state.user, skinTone: tone } 
  })),
  setMeasurements: (measurements) => set((state) => ({ 
    user: { ...state.user, measurements } 
  })),
  setPersonality: (personality) => set((state) => ({ 
    user: { ...state.user, personality } 
  })),
  saveOutfit: (outfit) => {
    const savedOutfit = db.push(collections.OUTFITS, { ...outfit, savedAt: new Date() })
    set((state) => ({ savedOutfits: [...state.savedOutfits, savedOutfit] }))
  },
  removeOutfit: (id) => set((state) => ({ 
    savedOutfits: state.savedOutfits.filter(outfit => outfit.id !== id) 
  })),
  addJournalEntry: (entry) => set((state) => ({ 
    styleJournal: [entry, ...state.styleJournal] 
  })),
  updateJournalEntry: (id, updates) => set((state) => ({ 
    styleJournal: state.styleJournal.map(entry => 
      entry.id === id ? { ...entry, ...updates } : entry
    ) 
  })),
  startChallenge: (challenge) => set((state) => ({ 
    activeChallenges: [...state.activeChallenges, challenge] 
  })),
  updateChallenge: (id, log) => set((state) => ({ 
    activeChallenges: state.activeChallenges.map(challenge => 
      challenge.id === id 
        ? { ...challenge, progress: challenge.progress + 1, dailyLogs: [...challenge.dailyLogs, log] }
        : challenge
    ) 
  })),
  completeChallenge: (id) => set((state) => ({ 
    activeChallenges: state.activeChallenges.filter(challenge => challenge.id !== id) 
  })),
  addWardrobeItem: (item) => {
    const wardrobeItem = db.push(collections.WARDROBE, item)
    set((state) => ({ wardrobeItems: [...state.wardrobeItems, wardrobeItem] }))
  },
  removeWardrobeItem: (id) => set((state) => ({ 
    wardrobeItems: state.wardrobeItems.filter(item => item.id !== id) 
  })),
  addCommunityPost: (post) => {
    const communityPost = db.push(collections.COMMUNITY_POSTS, post)
    set((state) => ({ communityPosts: [communityPost, ...state.communityPosts] }))
  },
  scheduleOutfit: (dateKey, outfit) => set((state) => ({ 
    outfitCalendar: { ...state.outfitCalendar, [dateKey]: outfit } 
  })),
  removeScheduledOutfit: (dateKey) => set((state) => ({ 
    outfitCalendar: Object.fromEntries(
      Object.entries(state.outfitCalendar).filter(([key]) => key !== dateKey)
    ) 
  })),
  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
  
  // Authentication actions
  setAuth: (authData) => set({ auth: authData }),
  setAuthLoading: (loading) => set((state) => ({ 
    auth: { ...state.auth, isLoading: loading } 
  })),
  initializeAuth: () => {
    const session = getCurrentSession()
    if (session) {
      set({
        auth: {
          user: session.user,
          isAuthenticated: true,
          isLoading: false,
          token: session.token
        }
      })
    }
  },
  logout: () => set({
    auth: {
      user: null,
      isAuthenticated: false,
      isLoading: false,
      token: null
    }
  }),
  
  // Social features
  userProfiles: {},
  followers: {},
  following: {},
  
  setUserProfile: (userId, profile) => set((state) => ({
    userProfiles: { ...state.userProfiles, [userId]: profile }
  })),
  
  followUser: (followerId, followingId) => set((state) => {
    const newFollowers = { ...state.followers }
    const newFollowing = { ...state.following }
    
    if (!newFollowers[followingId]) newFollowers[followingId] = []
    if (!newFollowing[followerId]) newFollowing[followerId] = []
    
    if (!newFollowers[followingId].includes(followerId)) {
      newFollowers[followingId].push(followerId)
      newFollowing[followerId].push(followingId)
    }
    
    return { followers: newFollowers, following: newFollowing }
  }),
  
  unfollowUser: (followerId, followingId) => set((state) => {
    const newFollowers = { ...state.followers }
    const newFollowing = { ...state.following }
    
    if (newFollowers[followingId]) {
      newFollowers[followingId] = newFollowers[followingId].filter(id => id !== followerId)
    }
    if (newFollowing[followerId]) {
      newFollowing[followerId] = newFollowing[followerId].filter(id => id !== followingId)
    }
    
    return { followers: newFollowers, following: newFollowing }
  })
}))