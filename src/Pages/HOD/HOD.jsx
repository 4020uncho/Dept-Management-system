import React from 'react'
import './HOD.css'
import reactLogo from "../../assets/logo.png";
import Navbar from "../../components/Navbar/Navbar";

const coordinators = [
  { id: 1, name: 'Asst. Prof. Balabhadra Bhandari', image: '' },
  { id: 2, name: 'Asst. Prof. Mahesh Shah', image: '' },
]

const HOD = () => {
  return (
    <div className="hod">
      <div className="header">
        <img src={reactLogo} alt="Central Campus of Technology" className="logo" />
        <div className="header-text">
          <h1>Institute of Science and Technology</h1>
          <h2>Department of IT</h2>
          <h3>Central Campus of Technology</h3>
          <h4>Dharan-14, Sunsari</h4>
        </div>
      </div>
      <Navbar/>

      <div className="container">
        <h2 className="title">Program Co-ordinators</h2>

        <div className="card-list">
          {coordinators.map((person) => (
            <div className="card" key={person.id}>
              {person.image ? (
                <img src={person.image} alt={person.name} className="photo" />
              ) : (
                <div className="photo placeholder">Photo</div>
              )}
              <p className="name">{person.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default HOD