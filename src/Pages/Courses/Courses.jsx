import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import coursenav from '../../components/coursenav/Nav1'
import Nav1 from '../../components/coursenav/Nav1'
import Footer from '../../components/footer/Footer'
import { Outlet } from 'react-router-dom'
import Home from '../Home/Home'

const Courses = () => {
  return (
    <>
      <Navbar/>
      <Nav1/>
      <main>
        <Outlet />
      </main>
      <Footer/>
    </>
  )
}

export default Courses