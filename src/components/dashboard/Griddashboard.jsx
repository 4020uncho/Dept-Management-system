import React from 'react'
import './Griddashboard.css'
import { Link } from 'react-router-dom'

const Griddashboard = () => {
  return (
    <div className='dashboard-grid'>
               <Link to='/studentlogin/dashboard/attendance'>
              <div className='dashboard-item'>
                <h3>Attendance</h3>
                <p>Track your attendance records</p>
              </div>
              </Link>
              <Link to='/studentlogin/dashboard/course'>
              <div className='dashboard-item'>
                <h3>Course</h3>
                <p>Track the course content</p>
              </div>
              </Link>
            </div>
  )
}

export default Griddashboard