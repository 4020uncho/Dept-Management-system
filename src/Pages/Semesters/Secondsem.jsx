import React from 'react'
import { Link } from 'react-router-dom'
import './Firstsem.css'

const Secondsem = () => {
  return (
    <div className="course-page">
      <div className="course-container">
        <div className="button">
          <Link to="/studentlogin/dashboard">
            <button aria-label="Back to Dashboard">←</button>
          </Link>
        </div>
        <div className="Container">Second Semester</div>
        <p>DISCRETE STRUCTURE</p>
        <p> </p>
      </div>
    </div>
  )
}

export default Secondsem 