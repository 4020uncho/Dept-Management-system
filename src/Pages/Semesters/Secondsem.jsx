import React from 'react'
import { Link } from 'react-router-dom'
import './Firstsem.css'

const Secondsem = () => {
  return (
    <div className="course-page">
      <div className="course-container">
        <div className="Secondsem-buttons">
          <Link to="/studentlogin/dashboard">
            <button className="back-btn" aria-label="Back to Dashboard">←</button>
          </Link>
          <button className="semester-btn" aria-label="Second Semester">Discrete Structure</button>
          <button className="semester-btn" aria-label="Second semester1">OOP</button>
          <button className="semester-btn" aria-label="Second semester2">Microprocessor</button>
          <button className="semester-btn" aria-label="Second semester3">Maths 2</button>
          <button className="semester-btn" aria-label="Second semester4">Statistics 1</button>
        </div>

      </div>
    </div>
  )
}

export default Secondsem