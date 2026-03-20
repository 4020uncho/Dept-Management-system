import React from 'react'
import Navbar from '../../components/Navbar/Navbar'

const Courses = () => {
  return (
    <div>
      <Navbar/>
      <navbar>
          <a className="nav-link" href="/courses/firstsemester">First Semester</a>
          <a className="nav-link" href="/courses/secondsemester">Second Semester</a>
      </navbar>
    </div>
  )
}

export default Courses