import React from "react";
import { Droplets, Sparkles, Sun, ShieldCheck } from "lucide-react";
import "./AftercareCard.css";

const ICONS = {
  Droplets,
  Sparkles,
  Sun,
  ShieldCheck,
};

export default function AftercareCard({ card }) {
  const { timeframe, headline, tips, stepIndex, icon } = card;
  const IconComponent = ICONS[icon] || Sparkles;

  return (
    <article className="aftercare-card" aria-label={`Aftercare guide for ${timeframe}`}>
      {/* 4 Segment Progress Bar */}
      <div className="aftercare-card__progress">
        {[0, 1, 2, 3].map((idx) => (
          <div
            key={idx}
            className={`aftercare-card__segment ${
              idx <= stepIndex ? "is-filled" : ""
            } ${idx === stepIndex ? "is-active" : ""}`}
          />
        ))}
      </div>

      {/* Top Header */}
      <div className="aftercare-card__top">
        <div className="aftercare-card__icon-badge">
          <IconComponent size={22} />
        </div>
        <span className="aftercare-card__timeframe">{timeframe}</span>
      </div>

      {/* Headline */}
      <h3 className="aftercare-card__headline">{headline}</h3>

      {/* 3 bullet-free lines */}
      <div className="aftercare-card__tips">
        {tips.map((tip, idx) => (
          <p key={idx} className="aftercare-card__tip-text">
            {tip}
          </p>
        ))}
      </div>

      {/* Footer Tag */}
      <div className="aftercare-card__footer">
        <span className="aftercare-card__watermark">RUDRA INK AFTERCARE</span>
      </div>
    </article>
  );
}
