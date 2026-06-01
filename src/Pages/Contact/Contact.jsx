import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import './contact.css'
import Footer from '../../components/footer/Footer'

const Contact = () => {
  const [formData, setFormData] = React.useState({
    fullname: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [status, setStatus] = React.useState({ success: '', error: '' })

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus({ success: '', error: '' })

    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.message || 'Unable to submit contact form')
      }

      setStatus({ success: 'Contact request submitted successfully.', error: '' })
      setFormData({ fullname: '', email: '', phone: '', subject: '', message: '' })
    } catch (error) {
      setStatus({ success: '', error: error.message })
    }
  }

  return (
    <div>
      <Navbar />

      <div className="container">
        <h1>Contact Us</h1>

        {status.success && <div className="success-message">{status.success}</div>}
        {status.error && <div className="error-message">{status.error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>
              Full Name <span className="required">*</span>
            </label>
            <input
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>
              Email Address <span className="required">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>
              Subject <span className="required">*</span>
            </label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>
              Message <span className="required">*</span>
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>

          <input type="submit" value="Submit" />
        </form>
      </div>
      <Footer />
    </div>
  )
}

export default Contact