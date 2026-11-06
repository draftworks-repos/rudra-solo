import React from "react";
import "./Marquee.css";

export default function Marquee() {
  const items = [
    "FINE LINE",
    "BLACK & GREY",
    "BLACKWORK",
    "REALISM",
    "TRADITIONAL",
    "CUSTOM FLASH",
  ];

  const Star = () => (
    <svg
      className="marquee__star"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );

  const block = (
    <div className="marquee__group" aria-hidden="true">
      {items.map((item, idx) => (
        <React.Fragment key={idx}>
          <span className="marquee__item">{item}</span>
          <Star />
        </React.Fragment>
      ))}
    </div>
  );

  return (
    <div className="marquee-wrapper" aria-label="Tattoo style highlights">
      <div className="marquee">
        <div className="marquee__track">
          <div className="marquee__group">
            {items.map((item, idx) => (
              <React.Fragment key={`orig-${idx}`}>
                <span className="marquee__item">{item}</span>
                <Star />
              </React.Fragment>
            ))}
          </div>
          {block}
          {block}
        </div>
      </div>
    </div>
  );
}
