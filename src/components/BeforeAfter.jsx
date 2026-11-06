import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "./BeforeAfter.css";

export default function BeforeAfter({ item, isLarge = false }) {
  const [position, setPosition] = useState(50); // percentage 0-100
  const { title, placement, healingTime, fresh, healed } = item;

  const handleInput = (e) => {
    setPosition(Number(e.target.value));
  };

  return (
    <div
      className={`before-after ${isLarge ? "before-after--large" : ""}`}
      style={{ "--pos": `${position}%` }}
    >
      <div className="before-after__frame">
        {/* Base Layer: HEALED */}
        <div className="before-after__layer before-after__layer--healed">
          <img
            src={healed.src}
            alt={healed.alt}
            className="before-after__img"
            style={{ objectPosition: healed.position }}
          />
        </div>

        {/* Clipped Top Layer: FRESH */}
        <div className="before-after__layer before-after__layer--fresh">
          <img
            src={fresh.src}
            alt={fresh.alt}
            className="before-after__img"
            style={{ objectPosition: fresh.position }}
          />
        </div>

        {/* Slider Divider Line & Handle */}
        <div className="before-after__divider" aria-hidden="true">
          <div className="before-after__handle">
            <ChevronLeft size={16} />
            <ChevronRight size={16} />
          </div>
        </div>

        {/* Top Chips - Solid, never raw text on image */}
        <div className="before-after__top-chips">
          <span className="before-after__chip before-after__chip--fresh">
            FRESH
          </span>
          <span className="before-after__chip before-after__chip--healed">
            HEALED
          </span>
        </div>

        {/* Bottom Caption Chip */}
        <div className="before-after__caption-chip">
          <h3 className="before-after__title">{title}</h3>
          <div className="before-after__sub">
            <span>{placement}</span>
            <span className="before-after__dot">•</span>
            <span className="before-after__time">{healingTime}</span>
          </div>
        </div>

        {/* Accessible Range Input */}
        <input
          type="range"
          min="0"
          max="100"
          value={position}
          onChange={handleInput}
          className="before-after__range"
          aria-label={`Slide to compare fresh versus healed state of ${title}`}
        />
      </div>
    </div>
  );
}
