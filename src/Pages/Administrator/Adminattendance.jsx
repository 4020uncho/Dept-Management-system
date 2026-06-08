import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Attendance12.css";

// ── Helpers ──────────────────────────────────────────────────────────────────
const STORAGE_KEY = "attendance_data"; // { "2026-06": { "student_1": { 1: "P", 3: "A", … } } }

const getDaysInMonth = (month, year) => new Date(year, month, 0).getDate();

const loadData = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
};

const saveData = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

// ── Mock student list (replace with your API/context) ────────────────────────
const STUDENTS = [
  { id: "s1", name: "Aarav Sharma",   rollNo: "CS-001" },
  { id: "s2", name: "Priya Thapa",    rollNo: "CS-002" },
  { id: "s3", name: "Rohan Gurung",   rollNo: "CS-003" },
  { id: "s4", name: "Sita Karmakar",  rollNo: "CS-004" },
  { id: "s5", name: "Dev Bajracharya",rollNo: "CS-005" },
];

const STATUS_CYCLE = { "": "P", P: "A", A: "L", L: "" }; // empty → Present → Absent → Leave → empty
const STATUS_LABEL = { P: "P", A: "A", L: "L", "": "–" };
const STATUS_CLASS = { P: "cell-present", A: "cell-absent", L: "cell-leave", "": "" };

const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];

// ── Component ─────────────────────────────────────────────────────────────────
const AdminAttendance = () => {
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [year,  setYear]  = useState(today.getFullYear());
  const [data,  setData]  = useState(loadData);
  const [saved, setSaved] = useState(false);

  const monthKey  = `${year}-${String(month).padStart(2, "0")}`;
  const daysCount = getDaysInMonth(month, year);
  const days      = Array.from({ length: daysCount }, (_, i) => i + 1);

  // Get a student's status for a specific day
  const getStatus = (studentId, day) =>
    data[monthKey]?.[studentId]?.[day] ?? "";

  // Toggle cell on click
  const toggleCell = (studentId, day) => {
    const current = getStatus(studentId, day);
    const next    = STATUS_CYCLE[current];
    setData((prev) => {
      const updated = {
        ...prev,
        [monthKey]: {
          ...prev[monthKey],
          [studentId]: {
            ...prev[monthKey]?.[studentId],
            [day]: next,
          },
        },
      };
      saveData(updated);
      return updated;
    });
    setSaved(false);
  };

  // Mark all students for a day
  const markAllDay = (day, status) => {
    setData((prev) => {
      const updated = { ...prev, [monthKey]: { ...prev[monthKey] } };
      STUDENTS.forEach(({ id }) => {
        updated[monthKey][id] = { ...updated[monthKey]?.[id], [day]: status };
      });
      saveData(updated);
      return updated;
    });
  };

  // Stats per student
  const getStats = (studentId) => {
    const record = data[monthKey]?.[studentId] ?? {};
    const present = Object.values(record).filter((v) => v === "P").length;
    const absent  = Object.values(record).filter((v) => v === "A").length;
    const leave   = Object.values(record).filter((v) => v === "L").length;
    return { present, absent, leave };
  };

  // Weekend detection
  const isWeekend = (day) => {
    const d = new Date(year, month - 1, day).getDay();
    return d === 6; // only Saturday is off
  };

  const isToday = (day) =>
    today.getDate() === day &&
    today.getMonth() + 1 === month &&
    today.getFullYear() === year;

  const handleSave = () => {
    saveData(data);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="att-page">
      <div className="att-container">

        {/* ── Header ── */}
        <div className="att-header">
          <div className="att-header-left">
            <Link to="/admin/dashboard" className="att-back-btn">
              <span>←</span>
            </Link>
            <div>
              <h1 className="att-title">Attendance Management</h1>
              <p className="att-subtitle">Admin View — Click a cell to toggle P / A / L</p>
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
            <button className={`att-save-btn ${saved ? "saved" : ""}`} onClick={handleSave}>
              {saved ? "✓ Saved" : "Save"}
            </button>
          </div>
        </div>

        {/* ── Legend ── */}
        <div className="att-legend">
          <span className="legend-item"><span className="legend-dot present" />Present (P)</span>
          <span className="legend-item"><span className="legend-dot absent"  />Absent (A)</span>
          <span className="legend-item"><span className="legend-dot leave"   />Leave (L)</span>
          <span className="legend-item"><span className="legend-dot weekend" />Weekend</span>
        </div>

        {/* ── Table ── */}
        <div className="table-scroll">
          <table className="att-table">
            <thead>
              <tr>
                <th className="col-roll sticky-col">Roll</th>
                <th className="col-name sticky-col2">Student</th>
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
              {STUDENTS.map((student) => {
                const { present, absent, leave } = getStats(student.id);
                const total = present + absent + leave;
                const pct   = total ? Math.round((present / total) * 100) : 0;
                return (
                  <tr key={student.id} className="att-row">
                    <td className="col-roll sticky-col td-roll">{student.rollNo}</td>
                    <td className="col-name sticky-col2 td-name">{student.name}</td>
                    {days.map((day) => {
                      const status = getStatus(student.id, day);
                      return (
                        <td
                          key={day}
                          className={`day-cell ${STATUS_CLASS[status]} ${isWeekend(day) ? "weekend-cell" : ""} ${isToday(day) ? "today-cell" : ""}`}
                          onClick={() => !isWeekend(day) && toggleCell(student.id, day)}
                          title={isWeekend(day) ? "Weekend" : `Click to mark`}
                        >
                          {isWeekend(day) ? "" : STATUS_LABEL[status]}
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
                );
              })}
            </tbody>
          </table>
        </div>

        {/* ── Bulk Actions ── */}
        <div className="bulk-actions">
          <p className="bulk-label">Bulk mark today ({today.getDate()}/{month}/{year}):</p>
          {["P","A","L"].map((s) => (
            <button key={s} className={`bulk-btn bulk-${s.toLowerCase()}`} onClick={() => markAllDay(today.getDate(), s)}>
              All {s === "P" ? "Present" : s === "A" ? "Absent" : "Leave"}
            </button>
          ))}
        </div>

      </div>
    </div>
  );
};

export default AdminAttendance;