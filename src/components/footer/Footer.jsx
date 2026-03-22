import React from 'react'
import reactLogo from '../../assets/logo.png'

const Footer = () => {
  return (
    <div>
        <footer>
         
                <div style={{
                  background: "#2a48bf",
                  color: "#ccc",
                  padding: "40px 60px 20px",
                }}>
                  <div className="row">
         
                      {/* Col 1 — About */}
                      <div className="col-md-4 mb-4">
                        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "14px" }}>
                          <img src={reactLogo} alt="Logo" style={{ width: "52px", borderRadius: "50%", border: "2px solid #cc4400" }} />
                          <div>
                            <div style={{ color: "#fff", fontWeight: "700", fontSize: "14px", lineHeight: "1.3" }}>
                              Department of IT
                            </div>
                            <div style={{ color: "#cc4400", fontSize: "12px" }}>Central Campus of Technology</div>
                          </div>
                        </div>
                        <p style={{ fontSize: "13px", lineHeight: "1.8", color: "#aaa" }}>
                          Affiliated to the Institute of Science &amp; Technology (IoST),
                          Tribhuvan University. Providing quality IT education in the
                          eastern region of Nepal.
                        </p>
                      </div>
         
                      {/* Col 2 — Quick Links */}
                      <div className="col-md-2 mb-4">
                        <h6 style={{ color: "#fff", fontWeight: "700", marginBottom: "14px", fontSize: "14px", borderBottom: "2px solid #cc4400", paddingBottom: "6px" }}>
                          Quick Links
                        </h6>
                        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                          {[
                            { label: "Home",    href: "/" },
                            { label: "About",   href: "/about" },
                            { label: "Courses", href: "/courses" },
                            { label: "HOD",     href: "/hod" },
                            { label: "Contact", href: "/contact" },
                          ].map(({ label, href }) => (
                            <li key={label} style={{ marginBottom: "7px" }}>
                              <a href={href} style={{ color: "#aaa", textDecoration: "none", fontSize: "13px" }}
                                onMouseOver={e => e.target.style.color = "#cc4400"}
                                onMouseOut={e  => e.target.style.color = "#aaa"}>
                                › {label}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
         
                      {/* Col 3 — Programs */}
                      <div className="col-md-3 mb-4">
                        <h6 style={{ color: "#fff", fontWeight: "700", marginBottom: "14px", fontSize: "14px", borderBottom: "2px solid #cc4400", paddingBottom: "6px" }}>
                          Programs
                        </h6>
                        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                          {[
                            "B.Sc. CSIT (4 Years)",
                            "Bachelor of IT — BIT (4 Years)",
                          ].map(p => (
                            <li key={p} style={{ marginBottom: "7px", fontSize: "13px", color: "#aaa" }}>
                              › {p}
                            </li>
                          ))}
                        </ul>
                        <div style={{ marginTop: "14px" }}>
                          <h6 style={{ color: "#fff", fontWeight: "700", marginBottom: "10px", fontSize: "14px", borderBottom: "2px solid #cc4400", paddingBottom: "6px" }}>
                            Affiliation
                          </h6>
                          <a href="https://iost.tu.edu.np/" target="_blank" rel="noopener noreferrer"
                            style={{ color: "#aaa", fontSize: "13px", textDecoration: "none" }}
                            onMouseOver={e => e.target.style.color = "#cc4400"}
                            onMouseOut={e  => e.target.style.color = "#aaa"}>
                            › IoST, Tribhuvan University
                          </a>
                          <br />
                          <a href="https://cct.tu.edu.np/" target="_blank" rel="noopener noreferrer"
                            style={{ color: "#aaa", fontSize: "13px", textDecoration: "none" }}
                            onMouseOver={e => e.target.style.color = "#cc4400"}
                            onMouseOut={e  => e.target.style.color = "#aaa"}>
                            › Central Campus of Technology
                          </a>
                        </div>
                      </div>
         
                      {/* Col 4 — Contact */}
                      <div className="col-md-3 mb-4">
                        <h6 style={{ color: "#fff", fontWeight: "700", marginBottom: "14px", fontSize: "14px", borderBottom: "2px solid #cc4400", paddingBottom: "6px" }}>
                          Contact Us
                        </h6>
                        <ul style={{ listStyle: "none", padding: 0, margin: 0, fontSize: "13px", color: "#aaa", lineHeight: "2" }}>
                          <li>📍 Dharan-14, Sunsari, Koshi Province</li>
                          <li>📞 025-520622</li>
                          <li>✉️ it.dept@cct.edu.np</li>
                          <li>🌐 <a href="https://cct.tu.edu.np/" target="_blank" rel="noopener noreferrer"
                            style={{ color: "#aaa", textDecoration: "none" }}
                            onMouseOver={e => e.target.style.color = "#cc4400"}
                            onMouseOut={e  => e.target.style.color = "#aaa"}>
                            cct.tu.edu.np
                          </a></li>
                        </ul>
                      </div>
         
                  </div>
                </div>
         
                {/* Copyright bar */}
                <div style={{
                  background: "#081223",
                  padding: "12px 0",
                  textAlign: "center",
                  fontSize: "12px",
                  color: "#777",
                  borderTop: "1px solid #1a2e50",
                }}>
                  © {new Date().getFullYear()}{" "}
                  <span style={{ color: "#cc4400" }}>Department of Information Technology</span>
                  {" "}— Central Campus of Technology, Dharan-14 · IoST · Tribhuvan University
                </div>
         
              </footer>
    </div>
  )
}

export default Footer