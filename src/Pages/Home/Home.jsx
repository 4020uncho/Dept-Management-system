import reactLogo from "../../assets/logo.png";
import Navbar from "../../components/Navbar/Navbar";
import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <>
      {/* Header */}
      <header className="header">
        <img src={reactLogo} alt="React Logo" width="100" />
        <div>
          <h1 style={{ color: "black", fontSize: "1.8em" }}>Institute of Science and Technology</h1>
          <h2 style={{ color: "#cc4400", fontSize: "1em", fontWeight: "normal" }}>Department of IT</h2>
          <h3 style={{ color: "#cc4400", fontSize: "0.9em", fontWeight: "normal" }}>Central Campus of Technology</h3>
          <h4 style={{ color: "#cc4400", fontSize: "0.85em", fontWeight: "normal" }}>Dharan-14, Sunsari</h4>
        </div>
      </header>

      {/* Navbar sits below the header */}
      <Navbar />

      {/* Page content renders here */}
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Home;