import { db } from './database'

export const getChallengeLeaderboard = (challengeId) => {
  const participants = db.get('challenge_participants') || {}
  const challengeData = participants[challengeId] || []
  
  return challengeData
    .sort((a, b) => b.score - a.score)
    .map((participant, index) => ({
      ...participant,
      rank: index + 1
    }))
}

export const updateChallengeScore = (challengeId, userId, score, completedDays) => {
  const participants = db.get('challenge_participants') || {}
  
  if (!participants[challengeId]) {
    participants[challengeId] = []
  }
  
  const existingIndex = participants[challengeId].findIndex(p => p.userId === userId)
  const participantData = {
    userId,
    score,
    completedDays,
    lastUpdate: new Date().toISOString()
  }
  
  if (existingIndex !== -1) {
    participants[challengeId][existingIndex] = participantData
  } else {
    participants[challengeId].push(participantData)
  }
  
  db.set('challenge_participants', participants)
  return getChallengeLeaderboard(challengeId)
}

export const getGlobalLeaderboard = () => {
  const allChallenges = db.get('challenge_participants') || {}
  const userScores = {}
  
  Object.values(allChallenges).forEach(challenge => {
    challenge.forEach(participant => {
      if (!userScores[participant.userId]) {
        userScores[participant.userId] = 0
      }
      userScores[participant.userId] += participant.score
    })
  })
  
  return Object.entries(userScores)
    .map(([userId, totalScore]) => ({ userId, totalScore }))
    .sort((a, b) => b.totalScore - a.totalScore)
    .map((user, index) => ({ ...user, rank: index + 1 }))
}