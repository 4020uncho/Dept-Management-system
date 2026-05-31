import React from 'react'
import { Link } from 'react-router-dom'
import './Secondsem.css'

const Firstsem = () => {
  return (
    <div className="course-page">
      <div className="course-container">
        <div className="firstsem-buttons">
          <Link to="/studentlogin/dashboard">
            <button className="back-btn" aria-label="Back to Dashboard">←</button>
          </Link>
          <button className="semester-btn" aria-label="First Semester">IIT</button>
          <button className="semester-btn" aria-label="First semester1">C-programming</button>
          <button className="semester-btn" aria-label="First semester2">Digital Logic</button>
          <button className="semester-btn" aria-label="First semester3">Maths</button>
          <button className="semester-btn" aria-label="First semester4">Physics</button>
        </div>

      </div>
    </div>
  )
}

export default Firstsem