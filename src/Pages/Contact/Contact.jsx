import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import './contact.css'
import Footer from '../../components/footer/Footer'

const Contact = () => {
  const [fullName, setFullName] = React.useState('')

  const handleSubmit = async(e) => {
    e.preventDefault();
    

    console.log(fullName);

    const response = await fetch('http://localhost:5000/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ fullName })
    });

    const data = await response.json();
    console.log(data);
  }

  return (
  
   <div className="container">
      <h1>Contact Us</h1>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name <span className="required">*</span></label>
          <input type="text" name="name" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
        </div>

        <div className="form-group">
          <label>Email Address <span className="required">*</span></label>
          <input type="email" name="email" required />
        </div>

        <div className="form-group">
          <label>Phone Number</label>
          <input type="text" name="phone" />
        </div>

        <div className="form-group">
          <label>Subject <span className="required">*</span></label>
          <input type="text" name="subject" required />
        </div>

        <div className="form-group">
          <label>Message <span className="required">*</span></label>
          <textarea name="message" required></textarea>
        </div>

        <input type="submit" value="Submit" />
      </form>
    </div>
  )
}

export default Contact