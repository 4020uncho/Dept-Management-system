import React from 'react'
import { Link } from 'react-router-dom'
import './Firstsem.css'

const Thirdsem = () => {
    return (
    <div className="course-page">
      <div className="course-container">
        <div className="button">
          <Link to="/studentlogin/dashboard">
            <button aria-label="Back to Dashboard">←</button>
          </Link>
        </div>
        <div className="Container">Third Semester</div>
        <p>DSA</p>
        <p> </p>
      </div>
    </div>
  )
}

export default Thirdsem