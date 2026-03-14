import React from 'react'
import HOD from '../HOD/HOD'
import { BrowserRouter } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'

const About = () => {
  return (
    <div>
        <div className="container mt-4">

      <h2 className="text-center mb-4" >
        Department of Information Technology
      </h2>

      <p className="text-center">
        The Department of Information Technology at Central Campus of Technology
        provides modern computing education and practical skills in software
        development, networking, and information systems. The department aims
        to prepare skilled IT professionals capable of contributing to the
        rapidly growing technology sector.
      </p>

      <div className="row mt-4">

        <div className="col-md-6">
          <h4>Our Vision</h4>
          <p>
            To become a center of excellence in information technology
            education, producing innovative and skilled graduates capable
            of solving real-world technological problems.
          </p>
        </div>

        <div className="col-md-6">
          <h4>Our Mission</h4>
          <p>
            To provide quality IT education, encourage research and
            innovation, and develop competent professionals who can
            contribute to national and global technological development.
          </p>
        </div>

      </div>

      <div className="mt-4">
        <h4>Programs Offered</h4>
        <ul>
          <li>B.Sc. CSIT (Computer Science and Information Technology)</li>
          <li>Bachelor of Information Technology (BIT)</li>
        </ul>
      </div>

    </div>
    </div>
  
  )
}

export default About