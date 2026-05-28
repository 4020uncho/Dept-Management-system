import React from 'react'
import image from '../../assets/semesters/sem1.png'


const Firstsemester = () => {
  return (
    <div className="container">
      <img 
        src={image} 
        alt="First Semester" 
        style={{ width: '100%', height: 'auto' }}
      />
    </div>
  )
}

export default Firstsemester