import { useState } from 'react'
import Navbar from '../src/components/Navbar'
import { useStore } from '../src/store/useStore'

export default function Settings() {
  const { user, setBodyShape, setSkinTone, setMeasurements } = useStore()
  const [activeTab, setActiveTab] = useState('profile')

  const clearProfile = () => {
    setBodyShape(null)
    setSkinTone(null)
    setMeasurements(null)
  }

  return (
    <div>
      <Navbar />
      <div className="min-h-screen py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">Settings</h1>
          
          <div className="flex space-x-1 mb-8">
            {['profile', 'saved', 'preferences'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg capitalize ${
                  activeTab === tab 
                    ? 'bg-primary text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {activeTab === 'profile' && (
            <div className="card">
              <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Body Shape
                  </label>
                  <p className="text-gray-600">
                    {user.bodyShape ? user.bodyShape.type : 'Not set'}
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Skin Tone
                  </label>
                  <p className="text-gray-600">
                    {user.skinTone ? user.skinTone.name : 'Not set'}
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Measurements
                  </label>
                  <p className="text-gray-600">
                    {user.measurements 
                      ? `Bust: ${user.measurements.bust}", Waist: ${user.measurements.waist}", Hips: ${user.measurements.hips}"`
                      : 'Not set'
                    }
                  </p>
                </div>
                
                <button 
                  onClick={clearProfile}
                  className="btn-secondary"
                >
                  Reset Profile
                </button>
              </div>
            </div>
          )}

          {activeTab === 'saved' && (
            <div className="card">
              <h2 className="text-xl font-semibold mb-4">Saved Outfits</h2>
              <p className="text-gray-600">No saved outfits yet. Start building outfits to save your favorites!</p>
            </div>
          )}

          {activeTab === 'preferences' && (
            <div className="card">
              <h2 className="text-xl font-semibold mb-4">Preferences</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" defaultChecked />
                    Email notifications for new style tips
                  </label>
                </div>
                
                <div>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" defaultChecked />
                    Weekly outfit suggestions
                  </label>
                </div>
                
                <div>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    Brand partnership offers
                  </label>
                </div>
                
                <button className="btn-primary">
                  Save Preferences
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}