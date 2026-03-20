import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./Pages/Home/Home"
import Courses from "./Pages/Courses/Courses"
import About from "./Pages/About/About"
import Contact from "./Pages/Contact/Contact"
import Attendence from "./Pages/Attendence/Attendence"
import HOD from "./Pages/HOD/HOD"
import FirstSemester from "./Pages/semester/Firstsemester"

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path='/' element={<Home/>}/> 
      <Route path='/about' element={<About/>}/>
      <Route path='/hod' element={<HOD/>} />
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/courses' element={<Courses/>}/>
      <Route path="/courses/firstsemester" element={<FirstSemester/>}/>
      <Route path='/attendence' element={<Attendence/>}/>
      <Route path='*' element={<div>Page not found</div>} />
    </Routes>
    
    </BrowserRouter>
  )
}

export default App