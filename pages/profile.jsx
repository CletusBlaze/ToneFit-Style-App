import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Navbar from '../src/components/Navbar'
import { useStore } from '../src/store/useStore'
import { getUserProfile, getUserStats, updateUserProfile } from '../src/utils/userProfiles'
import { followUser, unfollowUser } from '../src/utils/socialInteractions'

export default function Profile() {
  const router = useRouter()
  const { userId } = router.query
  const { auth, user } = useStore()
  const [profile, setProfile] = useState(null)
  const [stats, setStats] = useState({ followers: 0, following: 0, posts: 0 })
  const [isFollowing, setIsFollowing] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    if (userId) {
      const userProfile = getUserProfile(userId) || {
        id: userId,
        name: `User ${userId}`,
        bio: 'Fashion enthusiast',
        avatar: '👤',
        bodyShape: user.bodyShape?.type,
        skinTone: user.skinTone?.name,
        stylePersonality: user.personality?.type
      }
      setProfile(userProfile)
      setStats(getUserStats(userId))
    }
  }, [userId, user])

  const handleFollow = () => {
    if (auth.user && userId) {
      if (isFollowing) {
        unfollowUser(auth.user.id, userId)
      } else {
        followUser(auth.user.id, userId)
      }
      setIsFollowing(!isFollowing)
      setStats(prev => ({
        ...prev,
        followers: isFollowing ? prev.followers - 1 : prev.followers + 1
      }))
    }
  }

  const handleSaveProfile = (updates) => {
    if (auth.user && userId === auth.user.id) {
      const updatedProfile = updateUserProfile(userId, updates)
      setProfile(updatedProfile)
      setIsEditing(false)
    }
  }

  if (!profile) return <div>Loading...</div>

  const isOwnProfile = auth.user?.id === userId

  return (
    <div>
      <Navbar />
      <div className="min-h-screen py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="card mb-8">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center">
                <div className="text-6xl mr-6">{profile.avatar}</div>
                <div>
                  <h1 className="text-3xl font-bold mb-2">{profile.name}</h1>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{profile.bio}</p>
                  <div className="flex space-x-6 text-sm">
                    <span><strong>{stats.posts}</strong> posts</span>
                    <span><strong>{stats.followers}</strong> followers</span>
                    <span><strong>{stats.following}</strong> following</span>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2">
                {isOwnProfile ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600"
                  >
                    Edit Profile
                  </button>
                ) : (
                  <button
                    onClick={handleFollow}
                    className={`px-4 py-2 rounded-lg font-semibold ${
                      isFollowing
                        ? 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                        : 'bg-purple-600 text-white hover:bg-purple-700'
                    }`}
                  >
                    {isFollowing ? 'Following' : 'Follow'}
                  </button>
                )}
              </div>
            </div>

            {/* Style Profile */}
            <div className="grid md:grid-cols-3 gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="text-center">
                <p className="text-sm text-gray-500">Body Shape</p>
                <p className="font-semibold">{profile.bodyShape || 'Not set'}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500">Skin Tone</p>
                <p className="font-semibold">{profile.skinTone || 'Not set'}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500">Style</p>
                <p className="font-semibold">{profile.stylePersonality || 'Not set'}</p>
              </div>
            </div>
          </div>

          {/* Edit Profile Modal */}
          {isEditing && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>
                <EditProfileForm 
                  profile={profile}
                  onSave={handleSaveProfile}
                  onCancel={() => setIsEditing(false)}
                />
              </div>
            </div>
          )}

          {/* User Posts */}
          <div className="card">
            <h2 className="text-xl font-bold mb-4">Recent Posts</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">Post {i}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function EditProfileForm({ profile, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    name: profile.name,
    bio: profile.bio,
    avatar: profile.avatar
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-2">Bio</label>
        <textarea
          value={formData.bio}
          onChange={(e) => setFormData({...formData, bio: e.target.value})}
          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
          rows="3"
        />
      </div>
      
      <div className="flex gap-4">
        <button
          type="submit"
          className="flex-1 bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700"
        >
          Save Changes
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 py-3 px-6 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}