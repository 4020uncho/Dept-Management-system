import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./Pages/Home/Home"
import Courses from "./Pages/Courses/Courses"
import About from "./Pages/About/About"
import Contact from "./Pages/Contact/Contact"
import Studentlogin from "./Pages/studentlogin/Studentlogin"
import Administrator from "./Pages/Administrator/Administrator"
import HOD from "./Pages/HOD/HOD"
import FirstSemester from "./Pages/semester/Firstsemester"
import SecondSemester from "./Pages/semester/Secondsemester"
import ThirdSemester from "./Pages/semester/Thirdsemester"
import FourthSemester from "./Pages/semester/Fourthsemester"
import FifthSemester from "./Pages/semester/Fifthsemester"
import SixthSemester from "./Pages/semester/Sixthsemester"
import SeventhSemester from "./Pages/semester/Seventhsemester"
import EighthSemester from "./Pages/semester/Eighthsemester"
import Dashboard from "./Pages/userportal/Dashboard"
import Attendance from "./Pages/Attendance/Attendance"
import Course from "./Pages/course/Course"
import Admin from "./Pages/admin/Admin"
import Firstsem from "./Pages/Semesters/Firstsem"
import Secondsem from "./Pages/Semesters/Secondsem"
import Thirdsem from "./Pages/Semesters/Thirdsem"
import ProtectedRoute from "./Utils/ProtectedRoute"
function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path='/' element={<Home/>}/> 
      <Route path='/about' element={<About/>}/>
      <Route path='/hod' element={<HOD/>} />
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/admin' element={<Admin/>}/>
      <Route path='/administrator' element={<Administrator/>}/>
      
      {/* Nested Routes for Courses */}
      <Route path='/courses' element={<Courses/>}>
        <Route path='firstsemester' element={<FirstSemester/>}/>
        <Route path='secondsemester' element={<SecondSemester/>}/>
        <Route path='thirdsemester' element={<ThirdSemester/>}/>
        <Route path='fourthsemester' element={<FourthSemester />} />
        <Route path='fifthsemester' element={<FifthSemester />} />
        <Route path='sixthsemester' element={<SixthSemester />} />
        <Route path='seventhsemester' element={<SeventhSemester />} />
        <Route path='eighthsemester' element={<EighthSemester />} />
      </Route>

      <Route path='/studentlogin' element={<Studentlogin/>}/>
      <Route element={<ProtectedRoute/>}>
      <Route path='/studentlogin/dashboard' element={<Dashboard/>}/>
      <Route path='/studentlogin/dashboard/attendance' element={<Attendance/>}/>
      <Route path='/studentlogin/dashboard/course' element={<Course/>}/>
      <Route path='/studentlogin/dashboard/course/firstsemester' element={<Firstsem/>}/>
      <Route path='/studentlogin/dashboard/course/secondsemester' element={<Secondsem/>}/>
      <Route path='/studentlogin/dashboard/course/thirdsemester' element={<Thirdsem/>}/>
      <Route path='*' element={<div>Page not found</div>} />
      </Route>
    </Routes>
    
    </BrowserRouter>
  )
}

export default App