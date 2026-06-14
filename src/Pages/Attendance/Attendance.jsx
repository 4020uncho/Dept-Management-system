import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ADToBS } from "bikram-sambat-js";
import "./Attendance.css";

const getDaysInMonth = (month, year) => new Date(year, month, 0).getDate();

const API_BASE =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000/api"
    : "/api";

const AD_MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];

const STATUS_CLASS = { P: "cell-present", A: "cell-absent", L: "cell-leave" };
const STATUS_LABEL = { P: "P", A: "A", L: "L" };

// ── BS Helpers ────────────────────────────────────────────────────────────────
const adToBs = (adYear, adMonth, adDay = 1) => {
  try {
    const isoDate = `${adYear}-${String(adMonth).padStart(2, "0")}-${String(adDay).padStart(2, "0")}`;
    const result = ADToBS(isoDate);
    const [bsYear, bsMonth, bsDay] = result.split("-").map(Number);
    const BS_MONTHS = [
      "Baisakh","Jestha","Ashadh","Shrawan","Bhadra","Ashwin",
      "Kartik","Mangsir","Poush","Magh","Falgun","Chaitra"
    ];
    return {
      bsYear,
      bsMonth,
      bsDay,
      bsMonthName: BS_MONTHS[bsMonth - 1],
    };
  } catch {
    return null;
  }
};

const getBSDay = (adYear, adMonth, adDay) => {
  const bs = adToBs(adYear, adMonth, adDay);
  return bs ? bs.bsDay : adDay;
};

// ── Component ─────────────────────────────────────────────────────────────────
const AttendanceStudent = ({ studentId }) => {
  const resolvedId = studentId || localStorage.getItem("userId");

  const today = new Date();
  const [month,   setMonth]   = useState(today.getMonth() + 1);
  const [year,    setYear]    = useState(today.getFullYear());
  const [record,  setRecord]  = useState({});
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState(null);

  const daysCount    = getDaysInMonth(month, year);
  const days         = Array.from({ length: daysCount }, (_, i) => i + 1);
  const firstWeekday = new Date(year, month - 1, 1).getDay();

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

  // BS info for current month
  const bsInfo    = adToBs(year, month, 1);
  const todayBs   = adToBs(today.getFullYear(), today.getMonth() + 1, today.getDate());

  // ── Fetch attendance ───────────────────────────────────────────────────────
  useEffect(() => {
    if (!resolvedId) {
      setError("Student ID not found. Please log in again.");
      return;
    }

    let active = true;

    const fetchAttendance = async () => {
      try {
        setLoading(true);
        setError(null);

        const token = localStorage.getItem("token");
        const res = await fetch(`${API_BASE}/attendance/student/${resolvedId}`, {
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        });

        if (!res.ok) {
          const json = await res.json().catch(() => ({}));
          throw new Error(json.message || `HTTP ${res.status}`);
        }

        const payload = await res.json();

        const map = {};
        (payload.attendance || []).forEach((a) => {
          const d = new Date(a.date);
          if (d.getFullYear() === year && d.getMonth() + 1 === month) {
            map[d.getDate()] = a.status;
          }
        });

        if (active) setRecord(map);
      } catch (err) {
        console.error("Fetch attendance error:", err);
        if (active) setError(err.message || "Error fetching attendance");
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchAttendance();
    return () => { active = false; };
  }, [resolvedId, month, year]);

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="att-page">
      <div className="att-container">

        {/* Header */}
        <div className="att-header">
          <div className="att-header-left">
            <Link to="/studentlogin/dashboard" className="att-back-btn">
              <span>←</span>
            </Link>
            <div>
              <h1 className="att-title">My Attendance</h1>
              <p className="att-subtitle">
                {bsInfo ? `${bsInfo.bsMonthName} ${bsInfo.bsYear} BS` : `${AD_MONTHS[month - 1]} ${year}`}
              </p>
            </div>
          </div>
          <div className="att-header-right">
            <select
              className="att-select"
              value={month}
              onChange={(e) => setMonth(Number(e.target.value))}
            >
              {AD_MONTHS.map((m, i) => {
                const bs = adToBs(year, i + 1, 1);
                return (
                  <option key={i} value={i + 1}>
                    {bs ? `${bs.bsMonthName} (${m})` : m}
                  </option>
                );
              })}
            </select>
            <select
              className="att-select"
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
            >
              {[2023, 2024, 2025, 2026, 2027].map((y) => {
                const bs = adToBs(y, 1, 1);
                return (
                  <option key={y} value={y}>
                    {y} {bs ? `(${bs.bsYear} BS)` : ""}
                  </option>
                );
              })}
            </select>
            {loading && <div className="att-loading">Loading…</div>}
            {error   && <div className="att-error">{error}</div>}
          </div>
        </div>

        {/* Today in BS */}
        {todayBs && (
          <div className="bs-today-banner">
            Today: {todayBs.bsDay} {todayBs.bsMonthName} {todayBs.bsYear} BS
          </div>
        )}

        {/* Summary Cards */}
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
            {pct < 75 && total > 0 && (
              <span className="pct-warning-badge">Below 75%</span>
            )}
          </div>
        </div>

        {/* Calendar */}
        <div className="cal-section">
          <h2 className="cal-heading">
            {bsInfo ? `${bsInfo.bsMonthName} ${bsInfo.bsYear}` : `${AD_MONTHS[month - 1]} ${year}`}
          </h2>
          <div className="cal-grid">
            {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map((d) => (
              <div key={d} className="cal-day-header">{d}</div>
            ))}
            {Array.from({ length: firstWeekday }).map((_, i) => (
              <div key={`empty-${i}`} className="cal-cell cal-empty" />
            ))}
            {days.map((day) => {
              const status    = record[day];
              const weekend   = isWeekend(day);
              const todayMark = isToday(day);
              const bsDay     = getBSDay(year, month, day);
              return (
                <div
                  key={day}
                  className={`cal-cell ${status ? STATUS_CLASS[status] : ""} ${weekend ? "cal-weekend" : ""} ${todayMark ? "cal-today" : ""}`}
                >
                  <span className="cal-day-num">{bsDay}</span>
                  <span className="cal-day-ad">({day})</span>
                  {status && !weekend && (
                    <span className="cal-status">{STATUS_LABEL[status]}</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="att-legend">
          <span className="legend-item"><span className="legend-dot present" />Present</span>
          <span className="legend-item"><span className="legend-dot absent"  />Absent</span>
          <span className="legend-item"><span className="legend-dot leave"   />Leave</span>
          <span className="legend-item"><span className="legend-dot weekend" />Weekend</span>
        </div>

        {/* Detailed Table */}
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
                      <div>{getBSDay(year, month, d)}</div>
                      <div className="ad-day">({d})</div>
                      <div className="day-name">
                        {new Date(year, month - 1, d)
                          .toLocaleDateString("en", { weekday: "short" })
                          .slice(0, 2)}
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