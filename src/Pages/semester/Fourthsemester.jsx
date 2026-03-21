import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Nav1 from '../../components/coursenav/Nav1'
import image from '../../assets/semesters/sem4.png'

const Fourthsemester = () => {
  return (
    <div>
      <Navbar/>
      <Nav1/>
    <div className="container">
      <img 
        src={image} 
        alt="Fourth Semester" 
        style={{ width: '100%', height: 'auto' }}
      />
    </div>
    </div>
  )
}

export default Fourthsemester