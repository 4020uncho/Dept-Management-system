import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import frontpage from '../../assets/frontpage/s3.jpg'

const AdminLogin = () => {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [isHovered, setIsHovered] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.email || !formData.password) {
      alert('Please fill all fields')
      return
    }

    try {
      const resp = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
        credentials: 'include',
      })

      const data = await resp.json()

      if (!resp.ok) {
        alert(data.message || 'Login failed')
        return
      }

      localStorage.removeItem('token')
      localStorage.setItem('admin_token', data.token)
      alert('Login successful')
      navigate('/control')
    } catch (error) {
      console.error('Login request failed:', error)
      alert('Unable to send login request. Please try again.')
    }
  }

  return (
    <div style={styles.container}>
      <img src={frontpage} style={styles.image} alt="campus" />
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>Administrator Login</h2>
        <p style={styles.subtitle}>Enter your admin credentials to manage the portal.</p>
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={formData.password}
          onChange={handleChange}
          style={styles.input}
        />
        <button
          type="submit"
          style={{
            ...styles.button,
            ...(isHovered ? styles.buttonHover : {}),
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          Login
        </button>
      </form>
    </div>
  )
}

const styles = {
  container: {
    position: 'relative',
    height: '100vh',
    width: '100%',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  form: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    padding: '30px',
    borderRadius: '10px',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    boxShadow: '0 0 20px rgba(0,0,0,0.2)',
    width: '320px',
  },
  title: {
    fontSize: '1.4rem',
    marginBottom: '8px',
    fontWeight: '500',
    color: '#1f2937',
  },
  subtitle: {
    fontSize: '0.95rem',
    marginBottom: '16px',
    color: '#4b5563',
  },
  input: {
    width: '100%',
    padding: '10px',
    margin: '8px 0',
    borderRadius: '5px',
    border: '1px solid #ccc',
    boxSizing: 'border-box',
    fontSize: '0.95rem',
  },
  button: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '15px',
    fontSize: '1rem',
    transition: 'background-color 0.2s ease',
  },
  buttonHover: {
    backgroundColor: '#0056b3',
  },
}

export default AdminLogin;
