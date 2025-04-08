import { useState } from 'react'

export default function FeedbackForm({ onAddFeedback }) {
  const [text, setText] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!text.trim()) return
    onAddFeedback({ id: Date.now(), text })
    setText('')
  }

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <textarea
        className="w-full border rounded-lg p-3 mb-2"
        rows="3"
        placeholder="Write your feedback..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Submit Feedback
      </button>
    </form>
  )
}
