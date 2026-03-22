import reactLogo from "../../assets/logo.png";
import Navbar from "../../components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import frontpage from "../../assets/frontpage/s3.jpg";
import hod from "../../assets/Hod/hod.png";
import Marquee from "../../components/marquee/Marquee";
import Footer from "../../components/footer/Footer";
import HomeCarousel from "../../components/carousel/Homecarousel";

const Home = () => {
  return (
    <>
      {/* Header */}
      <header className="header" >
        <img src={reactLogo} alt="React Logo" width="100" />
        <div className="header-text" >
          <a href="https://iost.tu.edu.np/"  target="_blank"  rel="noopener noreferrer" style={{ textDecoration: "none" }}>
          <h1 style={{ color: "black", fontSize: "1.8em" }}>Institute of Science and Technology</h1></a>
          <h2 style={{ color: "#cc4400", fontSize: "1em", fontWeight: "normal" }}>Department of IT</h2>
          <a href="https://cct.tu.edu.np/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
            <h3 style={{ color: "#cc4400", fontSize: "0.9em", fontWeight: "normal" }}>Central Campus of Technology</h3></a>
          <h4 style={{ color: "#cc4400", fontSize: "0.85em", fontWeight: "normal" }}>Dharan-14, Sunsari</h4>
        </div>
      </header>

      {/* Navbar sits below the header */}
      <Navbar />
      <Marquee/>

      <HomeCarousel/>
      <Footer/>
      <Outlet />
    </>
  );
};
 
export default Home;    
   