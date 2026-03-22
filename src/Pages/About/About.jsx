import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import assets from '../../assets/logo.png'

const About = () => {
  return (
    <div>
      <Navbar />

      <div className="container mt-4">

        <div className="text-center mb-4">
          <img
            src={assets}
            alt="Department Logo"
            style={{ width: '120px' }}
          />
        </div>

        <h2
          className="text-center mb-3"
          style={{ color: '#cc4400', fontWeight: 'bold' }}
        >
          Department of Information Technology
        </h2>

        <p
          className="text-center mb-2"
          style={{ color: '#555', fontSize: '14px' }}
        >
          Central Campus of Technology, Dharan-14, Sunsari
        </p>

        <p className="text-center mb-4" style={{ color: '#444' }}>
          The Department of Information Technology at Central Campus of Technology
          provides modern computing education and practical skills in software
          development, networking, and information systems. The department aims
          to prepare skilled IT professionals capable of contributing to the
          rapidly growing technology sector.
        </p>

        <hr />

        <div className="row mt-4">
          <div className="col-md-6 mb-3">
            <h5 style={{ color: '#cc4400' }}>Our Vision</h5>
            <p>
              To become a center of excellence in information technology
              education, producing innovative and skilled graduates capable
              of solving real-world technological problems.
            </p>
          </div>

          <div className="col-md-6 mb-3">
            <h5 style={{ color: '#cc4400' }}>Our Mission</h5>
            <p>
              To provide quality IT education, encourage research and
              innovation, and develop competent professionals who can
              contribute to national and global technological development.
            </p>
          </div>
        </div>

        <hr />

        <div className="mt-3 mb-5">
          <h5 style={{ color: '#cc4400' }}>Programs Offered</h5>
          <ul style={{ color: '#444' }}>
            <li>B.Sc. CSIT (Computer Science and Information Technology) — 36 seats</li>
            <li>Bachelor of Information Technology (BIT) — 36 seats</li>
          </ul>
          <p className="mt-2" style={{ fontSize: '13px', color: '#777' }}>
            Affiliated to the Institute of Science &amp; Technology (IoST), Tribhuvan University
          </p>
        </div>

      </div>
    </div>
  )
}

export default About