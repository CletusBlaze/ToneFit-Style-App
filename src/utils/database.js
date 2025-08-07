// Local storage database simulation
class LocalDB {
  constructor() {
    this.isClient = typeof window !== 'undefined'
  }

  get(key) {
    if (!this.isClient) return null
    try {
      return JSON.parse(localStorage.getItem(key) || 'null')
    } catch {
      return null
    }
  }

  set(key, value) {
    if (!this.isClient) return
    localStorage.setItem(key, JSON.stringify(value))
  }

  push(key, item) {
    const items = this.get(key) || []
    items.push({ ...item, id: Date.now() })
    this.set(key, items)
    return items[items.length - 1]
  }

  update(key, id, updates) {
    const items = this.get(key) || []
    const index = items.findIndex(item => item.id === id)
    if (index !== -1) {
      items[index] = { ...items[index], ...updates }
      this.set(key, items)
    }
    return items[index]
  }

  delete(key, id) {
    const items = this.get(key) || []
    const filtered = items.filter(item => item.id !== id)
    this.set(key, filtered)
    return filtered
  }
}

export const db = new LocalDB()

// Database collections
export const collections = {
  USERS: 'tonefit_users',
  OUTFITS: 'tonefit_outfits',
  WARDROBE: 'tonefit_wardrobe',
  COMMUNITY_POSTS: 'tonefit_community_posts',
  STYLE_JOURNAL: 'tonefit_style_journal',
  CHALLENGES: 'tonefit_challenges'
}