import React from 'react'
import image from "../../assets/semesters/sem7.png"
import Navbar from '../../components/Navbar/Navbar'
import Nav1 from '../../components/coursenav/Nav1'

const Seventhsemester = () => {
  return (
    <div>
      <Navbar/>
      <Nav1/>
    <div className="container">
      <img 
        src={image} 
        alt="Seventh Semester" 
        style={{ width: '100%', height: 'auto' }}
      />
    </div>
    </div>
  )
}

export default Seventhsemester