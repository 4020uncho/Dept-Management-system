import React, { useState, useEffect } from "react";
import "./Marquee.css";

const API = "http://localhost:5000";

const Marquee = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(`${API}/api/marquee`)
      .then((res) => res.json())
      .then((data) => {
        if (data.active) setItems(data.items || []);
      })
      .catch(() => {});
  }, []);

  if (!items || items.length === 0) return <div className="marquee">&nbsp;</div>;

  return (
    <div className="marquee">
      <div className="track">
        {/* rendered twice so the CSS loop stays seamless */}
        {[...items, ...items].map((text, i) => (
          <span key={i}>
            {(i % items.length) + 1}. {text} &nbsp;
          </span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;