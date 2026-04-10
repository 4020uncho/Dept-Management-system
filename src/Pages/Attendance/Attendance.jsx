import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Attendance.css";

const Attendance = () => {
  const [month, setMonth] = useState(new Date().getMonth() + 1); // 1–12
  const [year, setYear] = useState(new Date().getFullYear());

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const getDaysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate();
  };

  const days = Array.from(
    { length: getDaysInMonth(month, year) },
    (_, i) => i + 1
  );

  return (
    
    <div className="button">
      <Link to="/studentlogin/dashboard"><button aria-label="Back to Dashboard">←</button></Link>
    <div className="filters">
  <select
    className="dropdown"
    value={month}
    onChange={(e) => setMonth(Number(e.target.value))}
  >
    {months.map((m, i) => (
      <option key={i} value={i + 1}>{m}</option>
    ))}
  </select>

  <select
    className="dropdown"
    value={year}
    onChange={(e) => setYear(Number(e.target.value))}
  >
    {[2023, 2024, 2025, 2026, 2027].map((y) => (
      <option key={y} value={y}>{y}</option>
    ))}
  </select>
</div>

      <h2>
        Attendance for {months[month - 1]} {year}
      </h2>

      <div className="table-wrapper">
        <table className="attendance-table">
          <thead>
            <tr>
              {days.map((day) => (
                <th key={day}>{day}</th>
              ))}
              <th>Present</th>
              <th>Absent</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              {days.map((day) => (
                <td key={day}></td>
              ))}
              <td>0</td>
              <td>0</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Attendance;