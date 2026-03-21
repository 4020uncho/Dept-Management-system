import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./Pages/Home/Home"
import Courses from "./Pages/Courses/Courses"
import About from "./Pages/About/About"
import Contact from "./Pages/Contact/Contact"
import Attendence from "./Pages/Attendence/Attendence"
import HOD from "./Pages/HOD/HOD"
import FirstSemester from "./Pages/semester/Firstsemester"
import SecondSemester from "./Pages/semester/Secondsemester"
import ThirdSemester from "./Pages/semester/Thirdsemester"
import FourthSemester from "./Pages/semester/Fourthsemester"
import FifthSemester from "./Pages/semester/Fifthsemester"
import SixthSemester from "./Pages/semester/Sixthsemester"
import SeventhSemester from "./Pages/semester/Seventhsemester"
import EighthSemester from "./Pages/semester/Eighthsemester"


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
      <Route path="/courses/secondsemester" element={<SecondSemester/>}/>
      <Route path="/courses/thirdsemester" element={<ThirdSemester/>}/>
      <Route path="/courses/fourthsemester" element={<FourthSemester />} />
      <Route path="/courses/fifthsemester" element={<FifthSemester />} />
      <Route path="/courses/sixthsemester" element={<SixthSemester />} />
      <Route path="/courses/seventhsemester" element={<SeventhSemester />} />
      <Route path="/courses/eighthsemester" element={<EighthSemester />} />
      <Route path='/attendence' element={<Attendence/>}/>
      <Route path='*' element={<div>Page not found</div>} />
    </Routes>
    
    </BrowserRouter>
  )
}

export default App