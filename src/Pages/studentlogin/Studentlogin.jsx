import React, { useEffect } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Login from '../../components/login/Login'

const Studentlogin = () => {
  useEffect(() => {
    // Clear auth token when landing on the login page so back/forward navigation cannot reuse it
    localStorage.removeItem('token')
  }, [])

  return (
    <div className="Container">
      <Navbar/>
      <Login/>
      
    </div>
  )
}

export default Studentlogin