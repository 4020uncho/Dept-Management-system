import React, { useState, useEffect } from "react";

const API = "http://localhost:5000";

const MarqueeAdmin = () => {
  const [items, setItems] = useState([""]);
  const [active, setActive] = useState(true);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  // load the current marquee
  useEffect(() => {
    fetch(`${API}/api/marquee`)
      .then((res) => res.json())
      .then((data) => {
        setItems(data.items?.length ? data.items : [""]);
        setActive(data.active ?? true);
      })
      .catch(() => setMessage("Could not load marquee"))
      .finally(() => setLoading(false));
  }, []);

  const updateItem = (index, value) =>
    setItems(items.map((t, i) => (i === index ? value : t)));

  const removeItem = (index) => {
    const next = items.filter((_, i) => i !== index);
    setItems(next.length ? next : [""]);
  };

  const moveItem = (index, direction) => {
    const target = index + direction;
    if (target < 0 || target >= items.length) return;
    const next = [...items];
    [next[index], next[target]] = [next[target], next[index]];
    setItems(next);
  };

  const save = async () => {
    setSaving(true);
    setMessage("");
    try {
      const token = localStorage.getItem("admin_token") || localStorage.getItem("token");

      const res = await fetch(`${API}/api/marquee`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        credentials: "include",
        body: JSON.stringify({
          items: items.filter((t) => t.trim()),
          active,
        }),
      });

      if (res.status === 401) throw new Error("Please log in again");
      if (res.status === 403) throw new Error("Admin access only");
      if (!res.ok) throw new Error("Failed to save");

      const data = await res.json();
      setItems(data.items.length ? data.items : [""]);
      setMessage("Marquee saved ✓");
    } catch (err) {
      setMessage(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ maxWidth: 600 }}>
      <h3>Marquee Notices</h3>

      {items.map((text, i) => (
        <div key={i} style={{ display: "flex", gap: 6, marginBottom: 8 }}>
          <span style={{ width: 20 }}>{i + 1}.</span>
          <input
            style={{ flex: 1, padding: 6 }}
            value={text}
            maxLength={200}
            placeholder="Enter notice text"
            onChange={(e) => updateItem(i, e.target.value)}
          />
          <button onClick={() => moveItem(i, -1)} disabled={i === 0}>↑</button>
          <button onClick={() => moveItem(i, 1)} disabled={i === items.length - 1}>↓</button>
          <button onClick={() => removeItem(i)}>✕</button>
        </div>
      ))}

      <button onClick={() => setItems([...items, ""])}>+ Add notice</button>

      <div style={{ margin: "12px 0" }}>
        <label>
          <input
            type="checkbox"
            checked={active}
            onChange={(e) => setActive(e.target.checked)}
          />{" "}
          Show marquee on website
        </label>
      </div>

      <button onClick={save} disabled={saving}>
        {saving ? "Saving..." : "Save"}
      </button>

      {message && <p>{message}</p>}
    </div>
  );
};

export default MarqueeAdmin;