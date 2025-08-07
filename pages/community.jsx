import { useState, useEffect } from 'react'
import Navbar from '../src/components/Navbar'
import { useStore } from '../src/store/useStore'
import { likePost, commentOnPost, sharePost } from '../src/utils/socialInteractions'
import { shareToSocialMedia, generateShareableContent } from '../src/utils/socialSharing'

const userProfiles = {
  'StyleQueen23': { avatar: '/b1.jfif', name: 'Sarah Johnson' },
  'FashionLover': { avatar: '/b2.jfif', name: 'Emma Wilson' },
  'ColorfulMe': { avatar: '/b3.jfif', name: 'Maya Chen' },
  'You': { avatar: '/b4.jfif', name: 'You' }
}

const mockPosts = [
  {
    id: 1,
    user: 'StyleQueen23',
    avatar: '/b1.jfif',
    outfit: '/4.jfif',
    caption: 'First date outfit! What do you think?',
    likes: 24,
    comments: [
      { id: 1, text: 'Love this look!', user: 'FashionFan', timestamp: '1h ago' },
      { id: 2, text: 'Perfect for a date!', user: 'StyleGuru', timestamp: '30m ago' }
    ],
    tags: ['date', 'casual', 'spring'],
    bodyShape: 'Pear',
    timestamp: '2 hours ago'
  },
  {
    id: 2,
    user: 'FashionLover',
    avatar: '/b2.jfif',
    outfit: '/5.jfif',
    caption: 'Work meeting ready! Professional but fun 💼',
    likes: 31,
    comments: [
      { id: 3, text: 'So professional!', user: 'WorkWear', timestamp: '2h ago' }
    ],
    tags: ['work', 'professional', 'blazer'],
    bodyShape: 'Hourglass',
    timestamp: '4 hours ago'
  },
  {
    id: 3,
    user: 'ColorfulMe',
    avatar: '/b3.jfif',
    outfit: '/6.jfif',
    caption: 'Trying bold colors for the first time!',
    likes: 18,
    comments: [],
    tags: ['bold', 'colors', 'experiment'],
    bodyShape: 'Apple',
    timestamp: '1 day ago'
  }
]

export default function Community() {
  const { user, communityPosts = [], addCommunityPost, auth } = useStore()
  const [showUpload, setShowUpload] = useState(false)
  const [showShareMenu, setShowShareMenu] = useState(null)
  const [showUserProfile, setShowUserProfile] = useState(null)
  const [editingPost, setEditingPost] = useState(null)
  const [followedUsers, setFollowedUsers] = useState([])
  const [showProfileUpload, setShowProfileUpload] = useState(false)
  const [newPost, setNewPost] = useState({
    outfit: null,
    caption: '',
    tags: '',
    occasion: ''
  })

  const [posts, setPosts] = useState(mockPosts)

  const handleLike = (postId) => {
    setPosts(prevPosts => 
      prevPosts.map(post => 
        post.id === postId 
          ? { ...post, likes: (post.likes || 0) + 1 }
          : post
      )
    )
  }

  const handleComment = (postId) => {
    const comment = prompt('Add a comment:')
    if (comment && comment.trim()) {
      setPosts(prevPosts => 
        prevPosts.map(post => 
          post.id === postId 
            ? { 
                ...post, 
                comments: Array.isArray(post.comments) 
                  ? [...post.comments, { id: Date.now(), text: comment, user: 'You', timestamp: 'now' }]
                  : [{ id: Date.now(), text: comment, user: 'You', timestamp: 'now' }]
              }
            : post
        )
      )
    }
  }

  const handleDeletePost = (postId) => {
    if (confirm('Are you sure you want to delete this post?')) {
      setPosts(prevPosts => prevPosts.filter(post => post.id !== postId))
    }
  }

  const handleEditPost = (postId) => {
    const post = posts.find(p => p.id === postId)
    const newCaption = prompt('Edit caption:', post.caption)
    if (newCaption !== null) {
      setPosts(prevPosts => 
        prevPosts.map(post => 
          post.id === postId 
            ? { ...post, caption: newCaption }
            : post
        )
      )
    }
  }

  const getUserProfile = (username) => {
    const userPosts = posts.filter(post => post.user === username)
    return {
      username,
      postsCount: userPosts.length,
      totalLikes: userPosts.reduce((sum, post) => sum + (Array.isArray(post.likes) ? post.likes.length : post.likes || 0), 0),
      followingCount: followedUsers.includes(username) ? 25 : 24,
      isFollowed: followedUsers.includes(username),
      joinedDate: 'March 2024',
      bio: `Fashion enthusiast sharing my style journey ✨`
    }
  }

  const handleFollow = (username) => {
    if (followedUsers.includes(username)) {
      setFollowedUsers(prev => prev.filter(user => user !== username))
    } else {
      setFollowedUsers(prev => [...prev, username])
    }
  }

  const handleProfileUpload = () => {
    if (!newPost.outfit || !newPost.caption) {
      alert('Please add a photo and caption')
      return
    }

    const post = {
      id: Date.now(),
      user: showUserProfile,
      avatar: userProfiles[showUserProfile]?.avatar || '/b4.jfif',
      outfit: newPost.outfit,
      caption: newPost.caption,
      likes: 0,
      comments: [],
      tags: newPost.tags.split(',').map(tag => tag.trim()),
      bodyShape: 'Unknown',
      timestamp: 'Just now'
    }

    setPosts(prev => [post, ...prev])
    setNewPost({ outfit: null, caption: '', tags: '', occasion: '' })
    setShowProfileUpload(false)
  }

  const handleShare = (post, platform) => {
    const shareContent = generateShareableContent(post, user)
    shareToSocialMedia(platform, shareContent)
    setShowShareMenu(null)
  }

  useEffect(() => {
    const handlePostUpdate = (event) => {
      // Handle real-time post updates
      console.log('Post updated:', event.detail)
    }
    
    window.addEventListener('postUpdated', handlePostUpdate)
    return () => window.removeEventListener('postUpdated', handlePostUpdate)
  }, [])

  const handlePostUpload = () => {
    if (!newPost.outfit || !newPost.caption) {
      alert('Please add a photo and caption')
      return
    }

    const post = {
      id: Date.now(),
      user: 'You',
      avatar: '/b4.jfif',
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

  const allPosts = [...communityPosts, ...posts].sort((a, b) => 
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
                      <div className="relative bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                        <img 
                          src={newPost.outfit} 
                          className="w-full h-auto max-h-48 object-contain rounded-lg" 
                          style={{ aspectRatio: 'auto' }}
                        />
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
                    <button 
                      onClick={() => setShowUserProfile(post.user)}
                      className="mr-3 hover:scale-110 transition-transform"
                    >
                      <img 
                        src={post.avatar} 
                        alt={post.user}
                        className="w-12 h-12 rounded-full object-cover border-2 border-purple-200"
                      />
                    </button>
                    <div>
                      <button 
                        onClick={() => setShowUserProfile(post.user)}
                        className="font-semibold hover:text-purple-600 transition-colors"
                      >
                        {post.user}
                      </button>
                      <p className="text-sm text-gray-500">
                        {post.bodyShape} • {post.timestamp}
                      </p>
                    </div>
                  </div>
                  {post.user === 'You' && (
                    <div className="relative">
                      <button 
                        onClick={() => setEditingPost(editingPost === post.id ? null : post.id)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        ⋯
                      </button>
                      {editingPost === post.id && (
                        <div className="absolute right-0 top-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-2 z-10 min-w-32">
                          <button
                            onClick={() => { handleEditPost(post.id); setEditingPost(null) }}
                            className="block w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-sm"
                          >
                            ✏️ Edit
                          </button>
                          <button
                            onClick={() => { handleDeletePost(post.id); setEditingPost(null) }}
                            className="block w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-sm text-red-600"
                          >
                            🗑️ Delete
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Post Image */}
                <div className="relative rounded-lg mb-4 overflow-hidden bg-gray-100 dark:bg-gray-800">
                  <img 
                    src={post.outfit} 
                    alt={`${post.user}'s outfit`}
                    className="w-full h-auto max-h-96 object-contain hover:scale-105 transition-transform duration-300"
                    style={{ aspectRatio: 'auto' }}
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
                    <button 
                      onClick={() => handleLike(post.id)}
                      className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-red-500"
                    >
                      <span>❤️</span>
                      <span>{Array.isArray(post.likes) ? post.likes.length : post.likes || 0}</span>
                    </button>
                    <button 
                      onClick={() => handleComment(post.id)}
                      className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-blue-500"
                    >
                      <span>💬</span>
                      <span>{Array.isArray(post.comments) ? post.comments.length : post.comments || 0}</span>
                    </button>
                    <div className="relative">
                      <button 
                        onClick={() => setShowShareMenu(showShareMenu === post.id ? null : post.id)}
                        className="text-gray-600 dark:text-gray-400 hover:text-green-500"
                      >
                        📤 Share
                      </button>
                      {showShareMenu === post.id && (
                        <div className="absolute bottom-full mb-2 left-0 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-2 z-10">
                          {['instagram', 'facebook', 'twitter', 'pinterest'].map(platform => (
                            <button
                              key={platform}
                              onClick={() => handleShare(post, platform)}
                              className="block w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded capitalize"
                            >
                              {platform}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-2 px-4 rounded-lg text-sm transition-all">
                    Style This Look
                  </button>
                </div>

                {/* Comments Section */}
                {Array.isArray(post.comments) && post.comments.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <h4 className="font-semibold mb-3 text-sm">Comments</h4>
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {post.comments.map((comment) => (
                        <div key={comment.id} className="flex items-start space-x-2">
                          <div className="text-sm">
                            <span className="font-medium">{comment.user}</span>
                            <span className="text-gray-600 dark:text-gray-400 ml-2">{comment.text}</span>
                            <span className="text-xs text-gray-500 ml-2">{comment.timestamp}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* User Profile Modal */}
          {showUserProfile && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md">
                <div className="text-center mb-6">
                  <img 
                    src={userProfiles[showUserProfile]?.avatar || '/b4.jfif'} 
                    alt={showUserProfile}
                    className="w-20 h-20 rounded-full object-cover border-4 border-purple-200 mx-auto mb-4"
                  />
                  <h2 className="text-2xl font-bold mb-2">{userProfiles[showUserProfile]?.name || showUserProfile}</h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {getUserProfile(showUserProfile).bio}
                  </p>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-xl font-bold">{getUserProfile(showUserProfile).postsCount}</div>
                      <div className="text-sm text-gray-500">Posts</div>
                    </div>
                    <div>
                      <div className="text-xl font-bold">{getUserProfile(showUserProfile).totalLikes}</div>
                      <div className="text-sm text-gray-500">Likes</div>
                    </div>
                    <div>
                      <div className="text-xl font-bold">{getUserProfile(showUserProfile).followingCount}</div>
                      <div className="text-sm text-gray-500">Following</div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button 
                    onClick={() => handleFollow(showUserProfile)}
                    className={`flex-1 font-semibold py-2 px-4 rounded-lg transition-colors ${
                      getUserProfile(showUserProfile).isFollowed
                        ? 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                        : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                    }`}
                  >
                    {getUserProfile(showUserProfile).isFollowed ? 'Following' : 'Follow'}
                  </button>
                  <button 
                    onClick={() => setShowProfileUpload(true)}
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg"
                  >
                    📸 Upload
                  </button>
                </div>
                <button
                  onClick={() => setShowUserProfile(null)}
                  className="w-full mt-4 text-gray-500 hover:text-gray-700 font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          )}

          {/* Profile Upload Modal */}
          {showProfileUpload && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
                <h2 className="text-2xl font-bold mb-6">Upload to {showUserProfile}'s Profile</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Upload Photo</label>
                    {newPost.outfit ? (
                      <div className="relative bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                        <img 
                          src={newPost.outfit} 
                          className="w-full h-auto max-h-48 object-contain rounded-lg" 
                          style={{ aspectRatio: 'auto' }}
                        />
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
                          onChange={(e) => {
                            const file = e.target.files[0]
                            if (file) {
                              const reader = new FileReader()
                              reader.onload = (e) => {
                                setNewPost({ ...newPost, outfit: e.target.result })
                              }
                              reader.readAsDataURL(file)
                            }
                          }}
                          className="hidden"
                          id="profile-upload"
                        />
                        <label htmlFor="profile-upload" className="btn-primary cursor-pointer">
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
                      placeholder="Tell us about this look..."
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
                    onClick={handleProfileUpload}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-xl transition-all"
                  >
                    Upload
                  </button>
                  <button
                    onClick={() => setShowProfileUpload(false)}
                    className="flex-1 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 font-semibold py-3 px-6 rounded-xl hover:bg-gray-400 dark:hover:bg-gray-500 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

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