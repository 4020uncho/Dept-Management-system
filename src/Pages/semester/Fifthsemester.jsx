import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Nav1 from '../../components/coursenav/Nav1'
import image from '../../assets/semesters/sem5.png'

const Fifthsemester = () => {
  return (
    <div>
      <Navbar/>
      <Nav1/>
    <div className="container">
      <img 
        src={image} 
        alt="Fifth Semester" 
        style={{ width: '100%', height: 'auto' }}
      />
    </div>
    </div>
  )
}

export default Fifthsemester