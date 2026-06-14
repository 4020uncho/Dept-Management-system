import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import BikramSambat from "@nakarmi23/bikram-sambat";
import "./Attendance12.css";

const getDaysInMonth = (month, year) => new Date(year, month, 0).getDate();

const STATUS_CYCLE = { "": "P", P: "A", A: "L", L: "" };
const STATUS_LABEL = { P: "P", A: "A", L: "L", "": "–" };
const STATUS_CLASS = { P: "cell-present", A: "cell-absent", L: "cell-leave", "": "" };

const AD_MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];

const API = "http://localhost:5000/api";

// ── BS Helpers ────────────────────────────────────────────────────────────────
const adToBs = (adYear, adMonth, adDay = 1) => {
  try {
    const dateStr = `${adYear}-${String(adMonth).padStart(2, "0")}-${String(adDay).padStart(2, "0")}`;
    return BikramSambat.fromAD(dateStr);
  } catch {
    return null;
  }
};

const getBSMonthYear = (adYear, adMonth) => {
  const bs = adToBs(adYear, adMonth, 1);
  return bs ? `${bs.bsMonthName} ${bs.bsYear} BS` : `${AD_MONTHS[adMonth - 1]} ${adYear}`;
};

const getBSDay = (adYear, adMonth, adDay) => {
  const bs = adToBs(adYear, adMonth, adDay);
  return bs ? bs.bsDay : adDay;
};

// Backend records array → { day: status } map
const recordsToMap = (records = []) => {
  const map = {};
  records.forEach(({ date, status }) => {
    const day = new Date(date).getUTCDate();
    map[day] = status;
  });
  return map;
};

// ── Component ─────────────────────────────────────────────────────────────────
const AdminAttendance = () => {
  const today = new Date();
  const [month,    setMonth]    = useState(today.getMonth() + 1);
  const [year,     setYear]     = useState(today.getFullYear());
  const [students, setStudents] = useState([]);
  const [data,     setData]     = useState({});
  const [saving,   setSaving]   = useState(false);
  const [saved,    setSaved]    = useState(false);
  const [error,    setError]    = useState("");

  const daysCount = getDaysInMonth(month, year);
  const days      = Array.from({ length: daysCount }, (_, i) => i + 1);

  const buildDateStr = (day) =>
    `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

  // ── Load students ──────────────────────────────────────────────────────────
  useEffect(() => {
    const loadStudents = async () => {
      try {
        const res  = await fetch(`${API}/students/all-students`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        const raw  = json.students ?? json.data ?? json ?? [];
        setStudents(
          (Array.isArray(raw) ? raw : []).map((s) => ({
            id:     String(s._id ?? s.id),
            name:   s.name ?? s.fullName ?? "Unknown",
            rollNo: s.rollNo ?? s.rollNumber ?? "—",
          }))
        );
      } catch (e) {
        console.error("Students fetch failed:", e);
        setError("Could not load students.");
      }
    };
    loadStudents();
  }, []);

  // ── Load attendance ────────────────────────────────────────────────────────
  const loadAttendance = useCallback(async () => {
    try {
      const res  = await fetch(`${API}/attendance/month?month=${month}&year=${year}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      const incoming = {};
      (json.attendanceData ?? []).forEach(({ student, records }) => {
        if (student?._id) {
          incoming[String(student._id)] = recordsToMap(records);
        }
      });
      setData(incoming);
    } catch (e) {
      console.error("Attendance fetch failed:", e);
    }
  }, [month, year]);

  useEffect(() => { loadAttendance(); }, [loadAttendance]);

  // ── Helpers ────────────────────────────────────────────────────────────────
  const getStatus = (studentId, day) => data[studentId]?.[day] ?? "";

  const isWeekend = (day) => new Date(year, month - 1, day).getDay() === 6;

  const isToday = (day) =>
    today.getDate() === day &&
    today.getMonth() + 1 === month &&
    today.getFullYear() === year;

  // ── Toggle cell ────────────────────────────────────────────────────────────
  const toggleCell = (studentId, day) => {
    const next = STATUS_CYCLE[getStatus(studentId, day)];
    setData((prev) => ({
      ...prev,
      [studentId]: { ...prev[studentId], [day]: next },
    }));
    setSaved(false);
  };

  // ── Save all ───────────────────────────────────────────────────────────────
  const handleSave = async () => {
    setSaving(true);
    setError("");
    try {
      const requests = [];
      students.forEach(({ id }) => {
        const studentDays = data[id] ?? {};
        days.forEach((day) => {
          const status = studentDays[day];
          if (!status) return;
          requests.push(
            fetch(`${API}/attendance/mark`, {
              method:  "POST",
              headers: { "Content-Type": "application/json" },
              body:    JSON.stringify({ userId: id, date: buildDateStr(day), status }),
            })
          );
        });
      });
      const results = await Promise.allSettled(requests);
      const failed  = results.filter((r) => r.status === "rejected");
      if (failed.length) {
        setError(`${failed.length} record(s) failed to save.`);
      } else {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      }
    } catch (e) {
      setError("Save failed: " + e.message);
    } finally {
      setSaving(false);
    }
  };

  // ── Bulk mark & save immediately ───────────────────────────────────────────
  const markAllDay = async (day, status) => {
    // Update local state
    setData((prev) => {
      const updated = { ...prev };
      students.forEach(({ id }) => {
        updated[id] = { ...updated[id], [day]: status };
      });
      return updated;
    });

    // Save to backend immediately
    setSaving(true);
    setError("");
    try {
      const dateStr  = buildDateStr(day);
      const requests = students.map(({ id }) =>
        fetch(`${API}/attendance/mark`, {
          method:  "POST",
          headers: { "Content-Type": "application/json" },
          body:    JSON.stringify({ userId: id, date: dateStr, status }),
        })
      );
      const results = await Promise.allSettled(requests);
      const failed  = results.filter((r) => r.status === "rejected");
      if (failed.length) {
        setError(`${failed.length} bulk record(s) failed.`);
      } else {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      }
    } catch (e) {
      setError("Bulk save failed: " + e.message);
    } finally {
      setSaving(false);
    }
  };

  // ── Stats ──────────────────────────────────────────────────────────────────
  const getStats = (studentId) => {
    const record  = data[studentId] ?? {};
    const present = Object.values(record).filter((v) => v === "P").length;
    const absent  = Object.values(record).filter((v) => v === "A").length;
    const leave   = Object.values(record).filter((v) => v === "L").length;
    return { present, absent, leave };
  };

  // ── Render ─────────────────────────────────────────────────────────────────
  const bsMonthYear = getBSMonthYear(year, month);
  const todayBs     = adToBs(today.getFullYear(), today.getMonth() + 1, today.getDate());

  return (
    <div className="att-page">
      <div className="att-container">

        {/* Header */}
        <div className="att-header">
          <div className="att-header-left">
            <Link to="/admin/dashboard" className="att-back-btn">←</Link>
            <div>
              <h1 className="att-title">Attendance Management</h1>
              <p className="att-subtitle">
                {bsMonthYear} — Admin View
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
            <button
              className={`att-save-btn ${saved ? "saved" : ""}`}
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? "Saving…" : saved ? "✓ Saved" : "Save"}
            </button>
          </div>
        </div>

        {/* Error banner */}
        {error && <div className="error-banner">⚠ {error}</div>}

        {/* Legend */}
        <div className="att-legend">
          <span className="legend-item"><span className="legend-dot present" />Present (P)</span>
          <span className="legend-item"><span className="legend-dot absent"  />Absent (A)</span>
          <span className="legend-item"><span className="legend-dot leave"   />Leave (L)</span>
          <span className="legend-item"><span className="legend-dot weekend" />Weekend</span>
        </div>

        {/* Table */}
        <div className="table-scroll">
          <table className="att-table">
            <thead>
              <tr>
                <th className="col-roll sticky-col">Roll</th>
                <th className="col-name sticky-col2">Student</th>
                {days.map((d) => {
                  const bsDay = getBSDay(year, month, d);
                  return (
                    <th
                      key={d}
                      className={`col-day ${isWeekend(d) ? "weekend-col" : ""} ${isToday(d) ? "today-col" : ""}`}
                    >
                      <div className="bs-day">{bsDay}</div>
                      <div className="ad-day">({d})</div>
                      <div className="day-name">
                        {new Date(year, month - 1, d)
                          .toLocaleDateString("en", { weekday: "short" })
                          .slice(0, 2)}
                      </div>
                    </th>
                  );
                })}
                <th className="col-stat">P</th>
                <th className="col-stat">A</th>
                <th className="col-stat">L</th>
                <th className="col-pct">%</th>
              </tr>
            </thead>
            <tbody>
              {students.length === 0 ? (
                <tr>
                  <td
                    colSpan={days.length + 6}
                    style={{ padding: "24px", color: "#6c7fa0", textAlign: "center" }}
                  >
                    {error ? "Failed to load students." : "Loading students…"}
                  </td>
                </tr>
              ) : (
                students.map((student) => {
                  const { present, absent, leave } = getStats(student.id);
                  const total = present + absent + leave;
                  const pct   = total ? Math.round((present / total) * 100) : 0;
                  return (
                    <tr key={student.id} className="att-row">
                      <td className="col-roll sticky-col td-roll">{student.rollNo}</td>
                      <td className="col-name sticky-col2 td-name">{student.name}</td>
                      {days.map((day) => {
                        const status  = getStatus(student.id, day);
                        const weekend = isWeekend(day);
                        return (
                          <td
                            key={day}
                            className={`day-cell ${status ? STATUS_CLASS[status] : weekend ? "weekend-cell" : ""} ${isToday(day) ? "today-cell" : ""}`}
                            onClick={() => toggleCell(student.id, day)}
                            title="Click to toggle"
                          >
                            {STATUS_LABEL[status]}
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
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Bulk actions */}
        <div className="bulk-actions">
          <p className="bulk-label">
            Bulk mark today ({todayBs ? `${todayBs.bsDay} ${todayBs.bsMonthName} ${todayBs.bsYear} BS` : today.toLocaleDateString()}):
          </p>
          {["P", "A", "L"].map((s) => (
            <button
              key={s}
              className={`bulk-btn bulk-${s.toLowerCase()}`}
              onClick={() => markAllDay(today.getDate(), s)}
              disabled={saving}
            >
              All {s === "P" ? "Present" : s === "A" ? "Absent" : "Leave"}
            </button>
          ))}
        </div>

      </div>
    </div>
  );
};

export default AdminAttendance;