import React from "react";
import "./Attendance.css";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';



const Attendance = () => {
  return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
         <div className="container">
      <h1>Attendance Tracker</h1>
      <p className="subtitle">
        Detailed view of your participation metrics for the current term.
      </p>

      {/* Summary */}
      <div className="summary-card">
        <div className="progress">
          <div className="circle">88%</div>
        </div>

        <div className="status">
          <p>STATUS</p>
          <h3>Term Records</h3>
        </div>

        <div className="stats">
          <div>
            <h2>42</h2>
            <p>PRESENT</p>
          </div>
          <div>
            <h2 className="red">2</h2>
            <p>UNEXCUSED</p>
          </div>
          <div>
            <h2 className="orange">4</h2>
            <p>LATE</p>
          </div>
        </div>
      </div>

      {/* Calendar */}
      <div className="calendar-card">
        <div className="calendar-header">
          <h3>September 2024</h3>
          <div className="legend">
            <span className="dot blue"></span> Present
            <span className="dot red"></span> Absent
            <span className="dot orange"></span> Late
          </div>
        </div>

       
        
      <DateCalendar />
      </div>
    </div>
    </LocalizationProvider>
  );
};

export default Attendance;