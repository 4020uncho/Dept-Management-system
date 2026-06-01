import React, { useEffect, useState } from 'react'

const Database = () => {
  const [subjectForm, setSubjectForm] = useState({
    semesterNumber: '',
    subjectCode: '',
    subjectName: '',
    nature: '',
  })
  const [topicForm, setTopicForm] = useState({
    subjectId: '',
    chapter: '',
    subTopics: '',
  })
  const [subjects, setSubjects] = useState([])
  const [status, setStatus] = useState({ subject: '', topic: '', error: '' })

  useEffect(() => {
    const loadSubjects = async () => {
      try {
        const resp = await fetch('http://localhost:5000/api/subjects/subjects')
        if (!resp.ok) throw new Error('Unable to load subjects')
        const data = await resp.json()
        setSubjects(data.subjects || [])
      } catch (error) {
        setStatus((prev) => ({ ...prev, error: error.message }))
      }
    }

    loadSubjects()
  }, [])

  const handleSubjectChange = (event) => {
    const { name, value } = event.target
    setSubjectForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleTopicChange = (event) => {
    const { name, value } = event.target
    setTopicForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubjectSubmit = async (event) => {
    event.preventDefault()
    setStatus({ subject: '', topic: '', error: '' })

    try {
      const resp = await fetch('http://localhost:5000/api/subjects/create-subject', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(subjectForm),
      })

      const data = await resp.json()
      if (!resp.ok) throw new Error(data.message || 'Subject creation failed')

      setStatus((prev) => ({ ...prev, subject: 'Subject added successfully.' }))
      setSubjectForm({ semesterNumber: '', subjectCode: '', subjectName: '', nature: '' })
      setSubjects((prev) => [...prev, data.subject])
    } catch (error) {
      setStatus((prev) => ({ ...prev, error: error.message }))
    }
  }

  const handleTopicSubmit = async (event) => {
    event.preventDefault()
    setStatus({ subject: '', topic: '', error: '' })

    try {
      const body = {
        subjectId: topicForm.subjectId,
        chapter: topicForm.chapter,
        subTopics: topicForm.subTopics
          .split(',')
          .map((topic) => topic.trim())
          .filter(Boolean),
      }

      const resp = await fetch('http://localhost:5000/api/topics/create-topic', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      const data = await resp.json()
      if (!resp.ok) throw new Error(data.message || 'Topic creation failed')

      setStatus((prev) => ({ ...prev, topic: 'Topic added successfully.' }))
      setTopicForm({ subjectId: '', chapter: '', subTopics: '' })
    } catch (error) {
      setStatus((prev) => ({ ...prev, error: error.message }))
    }
  }

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '24px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Admin Database Upload</h2>
      {status.error && (
        <div style={{ marginBottom: 16, color: '#b00020' }}>
          <strong>Error:</strong> {status.error}
        </div>
      )}
      <div style={{ display: 'grid', gap: 24 }}>
        <section style={{ border: '1px solid #d0d0d0', borderRadius: 10, padding: 20 }}>
          <h3>Create Subject</h3>
          <form onSubmit={handleSubjectSubmit} style={{ display: 'grid', gap: 12 }}>
            <label>
              Semester Number
              <input
                type="text"
                name="semesterNumber"
                value={subjectForm.semesterNumber}
                onChange={handleSubjectChange}
                placeholder="e.g. 1"
                required
                style={{ width: '100%', padding: 8, marginTop: 4 }}
              />
            </label>
            <label>
              Subject Code
              <input
                type="text"
                name="subjectCode"
                value={subjectForm.subjectCode}
                onChange={handleSubjectChange}
                placeholder="e.g. CS101"
                required
                style={{ width: '100%', padding: 8, marginTop: 4 }}
              />
            </label>
            <label>
              Subject Name
              <input
                type="text"
                name="subjectName"
                value={subjectForm.subjectName}
                onChange={handleSubjectChange}
                placeholder="e.g. Computer Science"
                required
                style={{ width: '100%', padding: 8, marginTop: 4 }}
              />
            </label>
            <label>
              Nature
              <input
                type="text"
                name="nature"
                value={subjectForm.nature}
                onChange={handleSubjectChange}
                placeholder="e.g. Core, Elective"
                required
                style={{ width: '100%', padding: 8, marginTop: 4 }}
              />
            </label>
            <button
              type="submit"
              style={{ padding: '10px 16px', backgroundColor: '#0057d9', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer' }}
            >
              Save Subject
            </button>
            {status.subject && <div style={{ color: '#006400' }}>{status.subject}</div>}
          </form>
        </section>

        <section style={{ border: '1px solid #d0d0d0', borderRadius: 10, padding: 20 }}>
          <h3>Create Topic</h3>
          <form onSubmit={handleTopicSubmit} style={{ display: 'grid', gap: 12 }}>
            <label>
              Subject
              <select
                name="subjectId"
                value={topicForm.subjectId}
                onChange={handleTopicChange}
                required
                style={{ width: '100%', padding: 8, marginTop: 4 }}
              >
                <option value="">Select subject</option>
                {subjects.map((subject) => (
                  <option key={subject._id} value={subject._id}>
                    {subject.subjectName} ({subject.subjectCode})
                  </option>
                ))}
              </select>
            </label>
            <label>
              Chapter
              <input
                type="text"
                name="chapter"
                value={topicForm.chapter}
                onChange={handleTopicChange}
                placeholder="e.g. Chapter 1"
                required
                style={{ width: '100%', padding: 8, marginTop: 4 }}
              />
            </label>
            <label>
              Sub Topics (comma separated)
              <textarea
                name="subTopics"
                value={topicForm.subTopics}
                onChange={handleTopicChange}
                placeholder="e.g. Introduction, Variables, Control flow"
                required
                rows={4}
                style={{ width: '100%', padding: 8, marginTop: 4 }}
              />
            </label>
            <button
              type="submit"
              style={{ padding: '10px 16px', backgroundColor: '#0057d9', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer' }}
            >
              Save Topic
            </button>
            {status.topic && <div style={{ color: '#006400' }}>{status.topic}</div>}
          </form>
        </section>
      </div>
    </div>
  )
}

export default Database