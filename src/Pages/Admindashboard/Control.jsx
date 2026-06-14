import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Control.css'

const Control = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/administrator')
  }

  return (
    <div className='admin-dashboard-page'>
      <div className='admin-dashboard-header'>
        <h1>Administrator Dashboard</h1>
        <p>Welcome back, administrator. Use the buttons below to manage course data and portal settings.</p>
      </div>

      <div className='admin-dashboard-grid'>
        <Link className='admin-dashboard-card' to='/admin'>
          <div>
            <h2>Database Manager</h2>
            <p>Add and update subjects, chapters, and topic content in the portal database.</p>
          </div>
        </Link>

        <Link className='admin-dashboard-card' to='/courses'>
          <div>
            <h2>Courses</h2>
            <p>Review the published course list and navigate to semester content pages.</p>
          </div>
        </Link>

        <Link className='admin-dashboard-card' to='/contact'>
          <div>
            <h2>Contact Requests</h2>
            <p>View incoming contact messages and manage user inquiries from the portal.</p>
          </div>
        </Link>

         <Link className='admin-dashboard-card' to='/Adminattendance'>
          <div>
            <h2>Attendance Management</h2>
            <p>View and manage student attendance records for each course.</p>
          </div>
        </Link>

        <button className='admin-dashboard-card admin-dashboard-logout' onClick={handleLogout}>
          <div>
            <h2>Logout</h2>
            <p>Sign out and return to the administrator login screen.</p>
          </div>
        </button>
      </div>
    </div>
  )
}

export default Control