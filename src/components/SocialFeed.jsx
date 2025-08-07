import { useState, useEffect } from 'react'
import { useStore } from '../store/useStore'
import { likePost, commentOnPost } from '../utils/socialInteractions'
import { shareToSocialMedia, generateShareableContent } from '../utils/socialSharing'

export default function SocialFeed({ posts = [] }) {
  const { auth, user } = useStore()
  const [showShareMenu, setShowShareMenu] = useState(null)

  const handleLike = (postId) => {
    if (auth.user) {
      likePost(postId, auth.user.id)
    }
  }

  const handleComment = (postId) => {
    const comment = prompt('Add a comment:')
    if (comment && auth.user) {
      commentOnPost(postId, auth.user.id, comment)
    }
  }

  const handleShare = (post, platform) => {
    const shareContent = generateShareableContent(post, user)
    shareToSocialMedia(platform, shareContent)
    setShowShareMenu(null)
  }

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <div key={post.id} className="card">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="text-3xl mr-3">{post.avatar || '👤'}</div>
              <div>
                <h3 className="font-semibold">{post.user}</h3>
                <p className="text-sm text-gray-500">{post.timestamp}</p>
              </div>
            </div>
          </div>

          <div className="h-64 rounded-lg mb-4 overflow-hidden">
            <img 
              src={post.outfit || post.image} 
              alt="Outfit"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="mb-4">
            <p className="text-gray-800 dark:text-gray-200 mb-2">{post.caption || post.description}</p>
            {post.tags && (
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
            )}
          </div>

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
          </div>
        </div>
      ))}
    </div>
  )
}