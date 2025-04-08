export default function FeedbackList({ feedbacks }) {
    if (feedbacks.length === 0) return <p className="text-gray-500">No feedback yet.</p>
  
    return (
      <ul className="space-y-2">
        {feedbacks.map((fb) => (
          <li
            key={fb.id}
            className="bg-gray-50 border border-gray-200 p-3 rounded-lg shadow-sm"
          >
            {fb.text}
          </li>
        ))}
      </ul>
    )
  }
  