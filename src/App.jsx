import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./Pages/home/home"
import Courses from "./Pages/Courses/Courses"
import About from "./Pages/About/About"
import Contact from "./Pages/Contact/Contact"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="courses" element={<Courses />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App