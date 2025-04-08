import { useState, useEffect } from 'react'

function App() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [feedbacks, setFeedbacks] = useState([])

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return alert('All fields required.')

    setLoading(true)
    const res = await fetch('/.netlify/functions/submit-feedback', {
      method: 'POST',
      body: JSON.stringify(form),
    })

    const data = await res.json()
    setLoading(false)
    if (data.success) {
      setForm({ name: '', email: '', message: '' })
      fetchFeedbacks()
    }
  }

  const fetchFeedbacks = async () => {
    const res = await fetch('/.netlify/functions/get-feedbacks')
    const data = await res.json()
    setFeedbacks(data.reverse())
  }

  useEffect(() => {
    fetchFeedbacks()
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md space-y-4">
        <h1 className="text-xl font-bold text-center">Feedback Form</h1>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Full Name" className="w-full p-2 border rounded" />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" type="email" className="w-full p-2 border rounded" />
        <textarea name="message" value={form.message} onChange={handleChange} placeholder="Feedback" className="w-full p-2 border rounded h-24" />
        <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>

      <div className="mt-6 w-full max-w-md space-y-2">
        {feedbacks.map((fb) => (
          <div key={fb.id} className="bg-white p-3 rounded shadow">
            <p className="font-semibold">{fb.name} ({fb.email})</p>
            <p className="text-sm text-gray-600">{fb.message}</p>
          </div>
        ))}
      </div>

      <footer className="mt-10 text-sm text-gray-400">
        Made by [Your Name] | Submission: [Date]
      </footer>
    </div>
  )
}

export default App
