import React, { useEffect } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import AdminLogin from '../../components/login/AdminLogin'

const Administrator = () => {
  useEffect(() => {
    localStorage.removeItem('token')
    localStorage.removeItem('admin_token')
  }, [])

  return (
    <div className="Container">
      <Navbar />
      <AdminLogin />
    </div>
  )
}

export default Administrator