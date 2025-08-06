import { useState } from 'react'
import Navbar from '../src/components/Navbar'
import { useStore } from '../src/store/useStore'

export default function StyleJournal() {
  const { user, styleJournal = [], addJournalEntry, updateJournalEntry } = useStore()
  const [showAddForm, setShowAddForm] = useState(false)
  const [newEntry, setNewEntry] = useState({
    outfit: '',
    occasion: '',
    confidence: 5,
    comfort: 5,
    compliments: 0,
    notes: '',
    photo: null
  })

  const handleAddEntry = () => {
    const entry = {
      ...newEntry,
      id: Date.now(),
      date: new Date().toISOString(),
      bodyShape: user.bodyShape?.type,
      skinTone: user.skinTone?.name
    }
    
    addJournalEntry(entry)
    setNewEntry({
      outfit: '',
      occasion: '',
      confidence: 5,
      comfort: 5,
      compliments: 0,
      notes: '',
      photo: null
    })
    setShowAddForm(false)
  }

  const getConfidenceColor = (rating) => {
    if (rating >= 8) return 'text-green-600 bg-green-100'
    if (rating >= 6) return 'text-yellow-600 bg-yellow-100'
    return 'text-red-600 bg-red-100'
  }

  const getAverageRating = (type) => {
    if (styleJournal.length === 0) return 0
    const sum = styleJournal.reduce((acc, entry) => acc + entry[type], 0)
    return (sum / styleJournal.length).toFixed(1)
  }

  return (
    <div>
      <Navbar />
      <div className="min-h-screen py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                Style Journal
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Track your outfits and build confidence
              </p>
            </div>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-xl transition-all transform hover:scale-105"
            >
              + Add Entry
            </button>
          </div>

          {/* Stats Overview */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="card text-center">
              <div className="text-3xl mb-2">📊</div>
              <div className="text-2xl font-bold text-purple-600">{styleJournal.length}</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Total Entries</div>
            </div>
            <div className="card text-center">
              <div className="text-3xl mb-2">✨</div>
              <div className="text-2xl font-bold text-green-600">{getAverageRating('confidence')}</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Avg Confidence</div>
            </div>
            <div className="card text-center">
              <div className="text-3xl mb-2">😌</div>
              <div className="text-2xl font-bold text-blue-600">{getAverageRating('comfort')}</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Avg Comfort</div>
            </div>
            <div className="card text-center">
              <div className="text-3xl mb-2">👏</div>
              <div className="text-2xl font-bold text-pink-600">
                {styleJournal.reduce((acc, entry) => acc + entry.compliments, 0)}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Total Compliments</div>
            </div>
          </div>

          {/* Add Entry Modal */}
          {showAddForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <h2 className="text-2xl font-bold mb-6">Add Style Journal Entry</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">What did you wear?</label>
                    <textarea
                      value={newEntry.outfit}
                      onChange={(e) => setNewEntry({...newEntry, outfit: e.target.value})}
                      placeholder="Describe your outfit..."
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700"
                      rows="3"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Occasion</label>
                    <select
                      value={newEntry.occasion}
                      onChange={(e) => setNewEntry({...newEntry, occasion: e.target.value})}
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700"
                    >
                      <option value="">Select occasion...</option>
                      <option value="work">Work</option>
                      <option value="casual">Casual</option>
                      <option value="date">Date</option>
                      <option value="party">Party</option>
                      <option value="formal">Formal Event</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Confidence Level: {newEntry.confidence}/10
                      </label>
                      <input
                        type="range"
                        min="1"
                        max="10"
                        value={newEntry.confidence}
                        onChange={(e) => setNewEntry({...newEntry, confidence: parseInt(e.target.value)})}
                        className="w-full"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Comfort Level: {newEntry.comfort}/10
                      </label>
                      <input
                        type="range"
                        min="1"
                        max="10"
                        value={newEntry.comfort}
                        onChange={(e) => setNewEntry({...newEntry, comfort: parseInt(e.target.value)})}
                        className="w-full"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Compliments Received</label>
                    <input
                      type="number"
                      min="0"
                      value={newEntry.compliments}
                      onChange={(e) => setNewEntry({...newEntry, compliments: parseInt(e.target.value) || 0})}
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Notes</label>
                    <textarea
                      value={newEntry.notes}
                      onChange={(e) => setNewEntry({...newEntry, notes: e.target.value})}
                      placeholder="How did you feel? What worked well? What would you change?"
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700"
                      rows="3"
                    />
                  </div>
                </div>
                
                <div className="flex gap-4 mt-6">
                  <button
                    onClick={handleAddEntry}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-xl transition-all"
                  >
                    Save Entry
                  </button>
                  <button
                    onClick={() => setShowAddForm(false)}
                    className="flex-1 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 font-semibold py-3 px-6 rounded-xl hover:bg-gray-400 dark:hover:bg-gray-500 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Journal Entries */}
          <div className="space-y-6">
            {styleJournal.length === 0 ? (
              <div className="card text-center">
                <div className="text-6xl mb-4">📔</div>
                <h2 className="text-2xl font-semibold mb-4">Start Your Style Journey</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Track your outfits to discover what makes you feel confident and comfortable
                </p>
                <button
                  onClick={() => setShowAddForm(true)}
                  className="btn-primary"
                >
                  Add Your First Entry
                </button>
              </div>
            ) : (
              styleJournal.map((entry) => (
                <div key={entry.id} className="card">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold capitalize">{entry.occasion} Outfit</h3>
                      <p className="text-sm text-gray-500">
                        {new Date(entry.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getConfidenceColor(entry.confidence)}`}>
                        Confidence: {entry.confidence}/10
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getConfidenceColor(entry.comfort)}`}>
                        Comfort: {entry.comfort}/10
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 dark:text-gray-300 mb-4">{entry.outfit}</p>
                  
                  {entry.notes && (
                    <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg mb-4">
                      <p className="text-sm text-gray-600 dark:text-gray-400">{entry.notes}</p>
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>👏 {entry.compliments} compliments</span>
                    <span>{entry.bodyShape} • {entry.skinTone}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}