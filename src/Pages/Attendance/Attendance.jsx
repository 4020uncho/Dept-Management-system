import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Attendance.css";

// ── Helpers ──────────────────────────────────────────────────────────────────
const STORAGE_KEY = "attendance_data";

const getDaysInMonth = (month, year) => new Date(year, month, 0).getDate();

const loadData = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
};

const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];

// ── Component ─────────────────────────────────────────────────────────────────
// Props: studentId (string) — pass the logged-in student's ID
const AttendanceStudent = ({ studentId = "s1" }) => {
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [year,  setYear]  = useState(today.getFullYear());

  const data      = loadData();
  const monthKey  = `${year}-${String(month).padStart(2, "0")}`;
  const daysCount = getDaysInMonth(month, year);
  const days      = Array.from({ length: daysCount }, (_, i) => i + 1);
  const record    = data[monthKey]?.[studentId] ?? {};

  const isWeekend = (day) => {
    const d = new Date(year, month - 1, day).getDay();
    return d === 0 || d === 6;
  };

  const isToday = (day) =>
    today.getDate() === day &&
    today.getMonth() + 1 === month &&
    today.getFullYear() === year;

  // Stats
  const present = Object.values(record).filter((v) => v === "P").length;
  const absent  = Object.values(record).filter((v) => v === "A").length;
  const leave   = Object.values(record).filter((v) => v === "L").length;
  const total   = present + absent + leave;
  const pct     = total ? Math.round((present / total) * 100) : 0;

  const STATUS_CLASS = { P: "cell-present", A: "cell-absent", L: "cell-leave" };
  const STATUS_LABEL = { P: "P", A: "A", L: "L" };

  // Build calendar grid for month view
  const firstWeekday = new Date(year, month - 1, 1).getDay(); // 0=Sun
  const calDays = Array.from({ length: daysCount }, (_, i) => i + 1);

  return (
    <div className="att-page">
      <div className="att-container">

        {/* ── Header ── */}
        <div className="att-header">
          <div className="att-header-left">
            <Link to="/studentlogin/dashboard" className="att-back-btn">
              <span>←</span>
            </Link>
            <div>
              <h1 className="att-title">My Attendance</h1>
              <p className="att-subtitle">{MONTHS[month - 1]} {year}</p>
            </div>
          </div>
          <div className="att-header-right">
            <select
              className="att-select"
              value={month}
              onChange={(e) => setMonth(Number(e.target.value))}
            >
              {MONTHS.map((m, i) => (
                <option key={i} value={i + 1}>{m}</option>
              ))}
            </select>
            <select
              className="att-select"
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
            >
              {[2023, 2024, 2025, 2026, 2027].map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>
        </div>

        {/* ── Summary Cards ── */}
        <div className="stats-grid">
          <div className="stat-card stat-card-present">
            <span className="stat-num">{present}</span>
            <span className="stat-lbl">Present</span>
          </div>
          <div className="stat-card stat-card-absent">
            <span className="stat-num">{absent}</span>
            <span className="stat-lbl">Absent</span>
          </div>
          <div className="stat-card stat-card-leave">
            <span className="stat-num">{leave}</span>
            <span className="stat-lbl">Leave</span>
          </div>
          <div className={`stat-card stat-card-pct ${pct >= 75 ? "pct-good-card" : pct >= 60 ? "pct-warn-card" : "pct-bad-card"}`}>
            <span className="stat-num">{pct}%</span>
            <span className="stat-lbl">Attendance</span>
            {pct < 75 && <span className="pct-warning-badge">Below 75%</span>}
          </div>
        </div>

        {/* ── Calendar View ── */}
        <div className="cal-section">
          <h2 className="cal-heading">Calendar</h2>
          <div className="cal-grid">
            {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map((d) => (
              <div key={d} className="cal-day-header">{d}</div>
            ))}
            {/* Empty offset cells */}
            {Array.from({ length: firstWeekday }).map((_, i) => (
              <div key={`empty-${i}`} className="cal-cell cal-empty" />
            ))}
            {calDays.map((day) => {
              const status = record[day];
              const weekend = isWeekend(day);
              const todayMark = isToday(day);
              return (
                <div
                  key={day}
                  className={`cal-cell ${status ? STATUS_CLASS[status] : ""} ${weekend ? "cal-weekend" : ""} ${todayMark ? "cal-today" : ""}`}
                >
                  <span className="cal-day-num">{day}</span>
                  {status && !weekend && (
                    <span className="cal-status">{STATUS_LABEL[status]}</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Legend ── */}
        <div className="att-legend">
          <span className="legend-item"><span className="legend-dot present" />Present</span>
          <span className="legend-item"><span className="legend-dot absent"  />Absent</span>
          <span className="legend-item"><span className="legend-dot leave"   />Leave</span>
          <span className="legend-item"><span className="legend-dot weekend" />Weekend</span>
        </div>

        {/* ── Row Table (compact) ── */}
        <details className="row-table-details">
          <summary className="row-table-summary">Show detailed table view</summary>
          <div className="table-scroll" style={{ marginTop: "16px" }}>
            <table className="att-table">
              <thead>
                <tr>
                  {days.map((d) => (
                    <th
                      key={d}
                      className={`col-day ${isWeekend(d) ? "weekend-col" : ""} ${isToday(d) ? "today-col" : ""}`}
                    >
                      <div>{d}</div>
                      <div className="day-name">
                        {new Date(year, month - 1, d).toLocaleDateString("en", { weekday: "short" }).slice(0, 2)}
                      </div>
                    </th>
                  ))}
                  <th className="col-stat">P</th>
                  <th className="col-stat">A</th>
                  <th className="col-stat">L</th>
                  <th className="col-pct">%</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  {days.map((day) => {
                    const status = record[day] ?? "";
                    return (
                      <td
                        key={day}
                        className={`day-cell ${STATUS_CLASS[status] ?? ""} ${isWeekend(day) ? "weekend-cell" : ""} ${isToday(day) ? "today-cell" : ""}`}
                      >
                        {!isWeekend(day) && (STATUS_LABEL[status] ?? "–")}
                      </td>
                    );
                  })}
                  <td className="stat-cell stat-present">{present}</td>
                  <td className="stat-cell stat-absent">{absent}</td>
                  <td className="stat-cell stat-leave">{leave}</td>
                  <td className={`pct-cell ${pct >= 75 ? "pct-good" : pct >= 60 ? "pct-warn" : "pct-bad"}`}>
                    {pct}%
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </details>

      </div>
    </div>
  );
};

export default AttendanceStudent;