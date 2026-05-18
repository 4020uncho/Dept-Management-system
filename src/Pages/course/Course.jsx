import React from 'react'
import { Link } from 'react-router-dom';
import "./Course.css";

const Course = () => {
  return (
    <div className="course-page">
      <div className="course-container">
        <div className="button">
          <Link to="/studentlogin/dashboard"><button aria-label="Back to Dashboard">←</button></Link>
        </div>
        <div className="Container">Course Dashboard</div>
        <p>Course content will be displayed here.</p>
      </div>
    </div>
  )
}

export default Course