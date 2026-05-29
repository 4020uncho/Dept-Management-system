import React from 'react'
import { Link } from 'react-router-dom'
import './Firstsem.css'

const Firstsem = () => {
  return (
    <div className="course-page">
      <div className="course-container">
        <div className="button">
          <Link to="/studentlogin/dashboard">
            <button aria-label="Back to Dashboard">←</button>
          </Link>
        </div>

      </div>
    </div>
  )
}

export default Firstsem