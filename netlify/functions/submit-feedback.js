import { writeFileSync, readFileSync, existsSync } from 'fs'
import path from 'path'

const filePath = path.resolve('feedback.json')

export async function handler(event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }

  const data = JSON.parse(event.body)

  if (!data.name || !data.email || !data.message) {
    return { statusCode: 400, body: 'Missing required fields' }
  }

  const feedbacks = existsSync(filePath)
    ? JSON.parse(readFileSync(filePath))
    : []

  const newFeedback = { id: Date.now(), ...data }

  feedbacks.push(newFeedback)
  writeFileSync(filePath, JSON.stringify(feedbacks, null, 2))

  return {
    statusCode: 200,
    body: JSON.stringify({ success: true, feedback: newFeedback }),
  }
}
