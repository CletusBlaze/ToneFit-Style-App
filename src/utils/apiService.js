// API service for backend communication
class ApiService {
  constructor() {
    this.baseURL = '/api'
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    }

    try {
      const response = await fetch(url, config)
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
      return await response.json()
    } catch (error) {
      throw new Error(`API request failed: ${error.message}`)
    }
  }

  // Auth endpoints
  async login(credentials) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    })
  }

  // Outfit endpoints
  async getOutfits() {
    return this.request('/outfits')
  }

  async saveOutfit(outfit) {
    return this.request('/outfits', {
      method: 'POST',
      body: JSON.stringify(outfit),
    })
  }

  // Community endpoints
  async getCommunityPosts() {
    return this.request('/community/posts')
  }

  async createPost(post) {
    return this.request('/community/posts', {
      method: 'POST',
      body: JSON.stringify(post),
    })
  }

  // Upload endpoints
  async uploadImage(file) {
    const formData = new FormData()
    formData.append('image', file)
    
    return fetch(`${this.baseURL}/upload/image`, {
      method: 'POST',
      body: formData,
    }).then(res => res.json())
  }
}

export const apiService = new ApiService()