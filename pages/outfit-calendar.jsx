import { useState } from 'react'
import Navbar from '../src/components/Navbar'
import { useStore } from '../src/store/useStore'

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

export default function OutfitCalendar() {
  const { outfitCalendar = {}, scheduleOutfit, removeScheduledOutfit } = useStore()
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(null)
  const [showScheduleModal, setShowScheduleModal] = useState(false)
  const [newEvent, setNewEvent] = useState({
    outfit: '',
    occasion: '',
    notes: '',
    reminder: true
  })

  const getDaysInMonth = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }
    
    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day))
    }
    
    return days
  }

  const formatDateKey = (date) => {
    return date.toISOString().split('T')[0]
  }

  const getScheduledOutfit = (date) => {
    if (!date) return null
    const dateKey = formatDateKey(date)
    return outfitCalendar[dateKey]
  }

  const handleDateClick = (date) => {
    if (!date) return
    setSelectedDate(date)
    const scheduled = getScheduledOutfit(date)
    if (scheduled) {
      setNewEvent(scheduled)
    } else {
      setNewEvent({ outfit: '', occasion: '', notes: '', reminder: true })
    }
    setShowScheduleModal(true)
  }

  const handleSchedule = () => {
    if (!selectedDate || !newEvent.outfit) {
      alert('Please select an outfit')
      return
    }

    const dateKey = formatDateKey(selectedDate)
    scheduleOutfit(dateKey, {
      ...newEvent,
      date: selectedDate.toDateString()
    })
    
    setShowScheduleModal(false)
    setSelectedDate(null)
  }

  const handleRemove = () => {
    if (!selectedDate) return
    const dateKey = formatDateKey(selectedDate)
    removeScheduledOutfit(dateKey)
    setShowScheduleModal(false)
    setSelectedDate(null)
  }

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate)
    newDate.setMonth(currentDate.getMonth() + direction)
    setCurrentDate(newDate)
  }

  const isToday = (date) => {
    if (!date) return false
    const today = new Date()
    return date.toDateString() === today.toDateString()
  }

  const isPast = (date) => {
    if (!date) return false
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return date < today
  }

  return (
    <div>
      <Navbar />
      <div className="min-h-screen py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Outfit Calendar
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Plan your looks for upcoming events and occasions
            </p>
          </div>

          {/* Calendar Header */}
          <div className="card mb-8">
            <div className="flex justify-between items-center mb-6">
              <button
                onClick={() => navigateMonth(-1)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                ← Previous
              </button>
              
              <h2 className="text-2xl font-bold">
                {months[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h2>
              
              <button
                onClick={() => navigateMonth(1)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                Next →
              </button>
            </div>

            {/* Days of Week Header */}
            <div className="grid grid-cols-7 gap-2 mb-4">
              {daysOfWeek.map((day) => (
                <div key={day} className="text-center font-semibold text-gray-600 dark:text-gray-400 py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-2">
              {getDaysInMonth(currentDate).map((date, index) => {
                const scheduledOutfit = getScheduledOutfit(date)
                
                return (
                  <div
                    key={index}
                    onClick={() => handleDateClick(date)}
                    className={`min-h-[80px] p-2 border rounded-lg cursor-pointer transition-all ${
                      !date 
                        ? 'border-transparent' 
                        : isToday(date)
                        ? 'border-primary bg-purple-50 dark:bg-purple-900'
                        : isPast(date)
                        ? 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 opacity-60'
                        : scheduledOutfit
                        ? 'border-green-300 bg-green-50 dark:bg-green-900 hover:bg-green-100 dark:hover:bg-green-800'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                  >
                    {date && (
                      <>
                        <div className={`text-sm font-medium ${
                          isToday(date) ? 'text-primary' : 'text-gray-900 dark:text-gray-100'
                        }`}>
                          {date.getDate()}
                        </div>
                        
                        {scheduledOutfit && (
                          <div className="mt-1">
                            <div className="text-xs bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200 px-1 py-0.5 rounded truncate">
                              {scheduledOutfit.occasion}
                            </div>
                            <div className="text-xs text-gray-600 dark:text-gray-400 mt-1 truncate">
                              {scheduledOutfit.outfit}
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Schedule Modal */}
          {showScheduleModal && selectedDate && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">
                  {getScheduledOutfit(selectedDate) ? 'Edit' : 'Schedule'} Outfit
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {selectedDate.toDateString()}
                </p>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Outfit Description</label>
                    <input
                      type="text"
                      value={newEvent.outfit}
                      onChange={(e) => setNewEvent({ ...newEvent, outfit: e.target.value })}
                      placeholder="Blue dress with heels..."
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Occasion</label>
                    <select
                      value={newEvent.occasion}
                      onChange={(e) => setNewEvent({ ...newEvent, occasion: e.target.value })}
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700"
                    >
                      <option value="">Select occasion...</option>
                      <option value="Work">Work</option>
                      <option value="Meeting">Meeting</option>
                      <option value="Date">Date</option>
                      <option value="Party">Party</option>
                      <option value="Wedding">Wedding</option>
                      <option value="Casual">Casual</option>
                      <option value="Travel">Travel</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Notes</label>
                    <textarea
                      value={newEvent.notes}
                      onChange={(e) => setNewEvent({ ...newEvent, notes: e.target.value })}
                      placeholder="Weather considerations, accessories, etc..."
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700"
                      rows="3"
                    />
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="reminder"
                      checked={newEvent.reminder}
                      onChange={(e) => setNewEvent({ ...newEvent, reminder: e.target.checked })}
                      className="mr-2"
                    />
                    <label htmlFor="reminder" className="text-sm">
                      Send reminder the night before
                    </label>
                  </div>
                </div>
                
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={handleSchedule}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-xl transition-all"
                  >
                    {getScheduledOutfit(selectedDate) ? 'Update' : 'Schedule'}
                  </button>
                  
                  {getScheduledOutfit(selectedDate) && (
                    <button
                      onClick={handleRemove}
                      className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-4 rounded-xl transition-all"
                    >
                      Remove
                    </button>
                  )}
                  
                  <button
                    onClick={() => setShowScheduleModal(false)}
                    className="bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 font-semibold py-3 px-4 rounded-xl hover:bg-gray-400 dark:hover:bg-gray-500 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Upcoming Events */}
          <div className="card">
            <h2 className="text-2xl font-bold mb-6">Upcoming Scheduled Outfits</h2>
            
            {Object.keys(outfitCalendar).length === 0 ? (
              <div className="text-center py-8">
                <div className="text-6xl mb-4">📅</div>
                <h3 className="text-xl font-semibold mb-2">No scheduled outfits</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Click on any date above to schedule your first outfit
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {Object.entries(outfitCalendar)
                  .filter(([dateKey]) => new Date(dateKey) >= new Date())
                  .sort(([a], [b]) => new Date(a) - new Date(b))
                  .slice(0, 5)
                  .map(([dateKey, event]) => (
                    <div key={dateKey} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div>
                        <h4 className="font-semibold">{event.occasion}</h4>
                        <p className="text-gray-600 dark:text-gray-400">{event.outfit}</p>
                        <p className="text-sm text-gray-500">{event.date}</p>
                      </div>
                      <button
                        onClick={() => handleDateClick(new Date(dateKey))}
                        className="text-primary hover:text-purple-700 font-medium"
                      >
                        Edit →
                      </button>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}