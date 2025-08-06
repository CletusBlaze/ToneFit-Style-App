import { create } from 'zustand'

export const useStore = create((set) => ({
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
  saveOutfit: (outfit) => set((state) => ({ 
    savedOutfits: [...state.savedOutfits, { ...outfit, id: Date.now(), savedAt: new Date() }] 
  })),
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
  addWardrobeItem: (item) => set((state) => ({ 
    wardrobeItems: [...state.wardrobeItems, { ...item, id: Date.now() }] 
  })),
  removeWardrobeItem: (id) => set((state) => ({ 
    wardrobeItems: state.wardrobeItems.filter(item => item.id !== id) 
  })),
  addCommunityPost: (post) => set((state) => ({ 
    communityPosts: [post, ...state.communityPosts] 
  })),
  scheduleOutfit: (dateKey, outfit) => set((state) => ({ 
    outfitCalendar: { ...state.outfitCalendar, [dateKey]: outfit } 
  })),
  removeScheduledOutfit: (dateKey) => set((state) => ({ 
    outfitCalendar: Object.fromEntries(
      Object.entries(state.outfitCalendar).filter(([key]) => key !== dateKey)
    ) 
  })),
  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
}))