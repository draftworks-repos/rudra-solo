import React, { useState } from "react";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { useBooking } from "../context/BookingContext.jsx";
import ImageTile from "./ImageTile.jsx";
import "./StyleRow.css";

export default function StyleRow({ styleItem, index }) {
  const { name, tagline, description, image } = styleItem;
  const { openBooking } = useBooking();
  const [isExpanded, setIsExpanded] = useState(false);

  const num = String(index + 1).padStart(2, "0");

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  const handleBook = (e) => {
    e.stopPropagation();
    openBooking({
      source: `Styles: ${name}`,
      style: name,
    });
  };

  return (
    <div
      className={`style-row ${isExpanded ? "is-expanded" : ""}`}
      onClick={toggleExpand}
      aria-expanded={isExpanded}
      role="region"
      aria-label={`${name} tattoo style`}
    >
      <div className="style-row__header">
        <div className="style-row__name-wrap">
          <span className="style-row__num">{num}</span>
          <h3 className="style-row__title">{name}</h3>
        </div>

        <div className="style-row__right">
          <p className="style-row__tagline">{tagline}</p>
          <div className="style-row__actions">
            <button
              type="button"
              className="style-row__book-link"
              onClick={handleBook}
            >
              <span>Book this style</span>
              <ArrowUpRight size={16} />
            </button>
            <div className="style-row__chevron" aria-hidden="true">
              <ChevronDown size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Hover / Inline touch preview frame */}
      <div className="style-row__expandable">
        <div className="style-row__expandable-inner">
          <div className="style-row__detail-grid">
            <div className="style-row__desc-box">
              <p className="style-row__desc-text">{description}</p>
              <button
                type="button"
                className="style-row__inline-book-btn"
                onClick={handleBook}
              >
                <span>CLAIM A {name.toUpperCase()} SESSION</span>
                <ArrowUpRight size={16} />
              </button>
            </div>
            <div className="style-row__img-frame">
              <ImageTile
                src={image.src}
                alt={image.alt}
                position={image.position}
                aspect="16/9"
                className="style-row__img"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
