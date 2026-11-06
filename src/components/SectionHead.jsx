import React from "react";
import "./SectionHead.css";

export default function SectionHead({
  number,
  label,
  title,
  highlightWord,
  outlineWord,
  note,
  action,
  isDark = false,
  className = "",
}) {
  const renderTitle = () => {
    if (!highlightWord && !outlineWord) {
      return title;
    }

    const words = title.split(" ");
    return words.map((word, index) => {
      const clean = word.replace(/[.,!()]/g, "");
      const isHighlight = highlightWord && clean.toLowerCase() === highlightWord.toLowerCase();
      const isOutline = outlineWord && clean.toLowerCase() === outlineWord.toLowerCase();

      if (isHighlight) {
        return (
          <span key={index} className="marker-swipe">
            {word}{" "}
          </span>
        );
      }
      if (isOutline) {
        return (
          <span key={index} className={`outlined-text ${isDark ? "outlined-text--bone" : "outlined-text--ink"}`}>
            {word}{" "}
          </span>
        );
      }
      return word + " ";
    });
  };

  return (
    <div className={`section-head ${isDark ? "section-head--dark" : ""} ${className}`}>
      <div className="section-head__meta">
        {number && <span className="section-head__num">{number}</span>}
        {label && <span className="section-head__label">{label}</span>}
      </div>

      <div className="section-head__main">
        <h2 className="section-head__title">{renderTitle()}</h2>
        {note && <p className="section-head__note">{note}</p>}
      </div>

      {action && <div className="section-head__action">{action}</div>}
    </div>
  );
}
