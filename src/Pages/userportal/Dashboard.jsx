import React, { useEffect } from 'react'
import logo from '../../assets/logo.png'
import Griddashboard from '../../components/dashboard/Griddashboard'

const Dashbord =  () => {

 useEffect(() => {
  const fetchToken = async () => {
    const token = await cookieStore.get('token');
    console.log("Token from cookie:", token);
  };

  fetchToken();
}, []);

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