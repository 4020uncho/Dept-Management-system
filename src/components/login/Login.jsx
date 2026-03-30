import React, { useState } from "react";
import frontpage from '../../assets/frontpage/s3.jpg'

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      alert("Please fill all fields");
      return;
    }
    if (formData.email === "admin@gmail.com" && formData.password === "1234") {
      alert("Login successful");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div style={styles.container}>
      <img src={frontpage} style={styles.image} alt="campus" />

      {/* Form sits on top of the image */}
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>Integrated student portal Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
          style={styles.input}
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={formData.password}
          onChange={handleChange}
          style={styles.input}
        />

        <button type="submit" style={styles.button}>Login</button>
        <a href="/register" style={styles.register}>• Register</a>
      </form>
    </div>
  );
};

const styles = {
  container: {
    position: "relative",       // ← parent must be relative
    height: "100vh",
    width: "100%",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",         // ← fills the container cleanly
  },
  form: {
    position: "absolute",       // ← floats over the image
    top: "50%",
    left:"50%" ,               // ← pinned to the right like your screenshot
    right:"50%",
    transform: "translateY(-50%)",
    padding: "30px",
    borderRadius: "10px",
    backgroundColor: "white",
    boxShadow: "0 0 20px rgba(0,0,0,0.2)",
    width: "320px",
  },
  title: {
    fontSize: "1.4rem",
    marginBottom: "10px",
    fontWeight: "500",
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "8px 0",
    borderRadius: "5px",
    border: "1px solid #ccc",
    boxSizing: "border-box",    // ← prevents input from overflowing
    fontSize: "0.95rem",
  },
  button: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "15px",
    fontSize: "1rem",
  },
  register: {
    display: "block",
    marginTop: "12px",
    color: "#333",
    textDecoration: "none",
    fontSize: "0.9rem",
  }
};

export default Login;