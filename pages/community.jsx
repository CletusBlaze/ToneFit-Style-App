import { useState } from 'react'
import Navbar from '../src/components/Navbar'
import { useStore } from '../src/store/useStore'

const mockPosts = [
  {
    id: 1,
    user: 'StyleQueen23',
    avatar: '👩‍🦱',
    outfit: '/4.jfif',
    caption: 'First date outfit! What do you think?',
    likes: 24,
    comments: 8,
    tags: ['date', 'casual', 'spring'],
    bodyShape: 'Pear',
    timestamp: '2 hours ago'
  },
  {
    id: 2,
    user: 'FashionLover',
    avatar: '👩‍🦰',
    outfit: '/5.jfif',
    caption: 'Work meeting ready! Professional but fun 💼',
    likes: 31,
    comments: 12,
    tags: ['work', 'professional', 'blazer'],
    bodyShape: 'Hourglass',
    timestamp: '4 hours ago'
  },
  {
    id: 3,
    user: 'ColorfulMe',
    avatar: '👩‍🦳',
    outfit: '/6.jfif',
    caption: 'Trying bold colors for the first time!',
    likes: 18,
    comments: 6,
    tags: ['bold', 'colors', 'experiment'],
    bodyShape: 'Apple',
    timestamp: '1 day ago'
  }
]

export default function Community() {
  const { user, communityPosts = [], addCommunityPost } = useStore()
  const [showUpload, setShowUpload] = useState(false)
  const [newPost, setNewPost] = useState({
    outfit: null,
    caption: '',
    tags: '',
    occasion: ''
  })

  const handlePostUpload = () => {
    if (!newPost.outfit || !newPost.caption) {
      alert('Please add a photo and caption')
      return
    }

    const post = {
      id: Date.now(),
      user: 'You',
      avatar: '👤',
      outfit: newPost.outfit,
      caption: newPost.caption,
      likes: 0,
      comments: 0,
      tags: newPost.tags.split(',').map(tag => tag.trim()),
      bodyShape: user.bodyShape?.type || 'Unknown',
      timestamp: 'Just now'
    }

    addCommunityPost(post)
    setNewPost({ outfit: null, caption: '', tags: '', occasion: '' })
    setShowUpload(false)
  }

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setNewPost({ ...newPost, outfit: e.target.result })
      }
      reader.readAsDataURL(file)
    }
  }

  const allPosts = [...communityPosts, ...mockPosts].sort((a, b) => 
    new Date(b.timestamp) - new Date(a.timestamp)
  )

  return (
    <div>
      <Navbar />
      <div className="min-h-screen py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                Style Community
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Share your looks and get styled by others
              </p>
            </div>
            <button
              onClick={() => setShowUpload(true)}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-xl transition-all transform hover:scale-105"
            >
              + Share Look
            </button>
          </div>

          {/* Upload Modal */}
          {showUpload && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
                <h2 className="text-2xl font-bold mb-6">Share Your Look</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Upload Outfit Photo</label>
                    {newPost.outfit ? (
                      <div className="relative">
                        <img src={newPost.outfit} className="w-full h-48 object-cover rounded-lg" />
                        <button
                          onClick={() => setNewPost({ ...newPost, outfit: null })}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                        >
                          ×
                        </button>
                      </div>
                    ) : (
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                        <div className="text-4xl mb-2">📸</div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileUpload}
                          className="hidden"
                          id="outfit-upload"
                        />
                        <label htmlFor="outfit-upload" className="btn-primary cursor-pointer">
                          Choose Photo
                        </label>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Caption</label>
                    <textarea
                      value={newPost.caption}
                      onChange={(e) => setNewPost({ ...newPost, caption: e.target.value })}
                      placeholder="Tell us about your look..."
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700"
                      rows="3"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Tags (comma separated)</label>
                    <input
                      type="text"
                      value={newPost.tags}
                      onChange={(e) => setNewPost({ ...newPost, tags: e.target.value })}
                      placeholder="casual, work, date, spring..."
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700"
                    />
                  </div>
                </div>
                
                <div className="flex gap-4 mt-6">
                  <button
                    onClick={handlePostUpload}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-xl transition-all"
                  >
                    Share Look
                  </button>
                  <button
                    onClick={() => setShowUpload(false)}
                    className="flex-1 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 font-semibold py-3 px-6 rounded-xl hover:bg-gray-400 dark:hover:bg-gray-500 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Community Feed */}
          <div className="space-y-6">
            {allPosts.map((post) => (
              <div key={post.id} className="card">
                {/* Post Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="text-3xl mr-3">{post.avatar}</div>
                    <div>
                      <h3 className="font-semibold">{post.user}</h3>
                      <p className="text-sm text-gray-500">
                        {post.bodyShape} • {post.timestamp}
                      </p>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">⋯</button>
                </div>

                {/* Post Image */}
                <div className="h-64 rounded-lg mb-4 overflow-hidden">
                  <img 
                    src={post.outfit} 
                    alt={`${post.user}'s outfit`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Post Content */}
                <div className="mb-4">
                  <p className="text-gray-800 dark:text-gray-200 mb-2">{post.caption}</p>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-2 py-1 rounded-full text-xs"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Post Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center space-x-6">
                    <button className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-red-500">
                      <span>❤️</span>
                      <span>{post.likes}</span>
                    </button>
                    <button className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-blue-500">
                      <span>💬</span>
                      <span>{post.comments}</span>
                    </button>
                    <button className="text-gray-600 dark:text-gray-400 hover:text-green-500">
                      📤 Share
                    </button>
                  </div>
                  <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-2 px-4 rounded-lg text-sm transition-all">
                    Style This Look
                  </button>
                </div>
              </div>
            ))}
          </div>

          {allPosts.length === 0 && (
            <div className="card text-center">
              <div className="text-6xl mb-4">👥</div>
              <h3 className="text-xl font-semibold mb-2">No posts yet</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Be the first to share your style with the community!
              </p>
              <button
                onClick={() => setShowUpload(true)}
                className="btn-primary"
              >
                Share Your First Look
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}