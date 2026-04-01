import React from 'react'
import logo from '../../assets/logo.png'
import Griddashboard from '../../components/dashboard/Griddashboard'

const Dashbord = () => {
  return (
    <div>
      <div className='container'>
    
        <div className='Header-text'>
          <h1>Integrated student control panel </h1>
        </div>
        <div className='dashboard-content'>
          <div className='dashboard-card'>
            <h2>Dashboard</h2>
            <p>Welcome to your dashboard!</p>
            <Griddashboard />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashbord