import React from "react";
import { pricing } from "../data/pricing.js";
import { useBooking } from "../context/BookingContext.jsx";
import "./SizeStrip.css";

export default function SizeStrip() {
  const { openBooking } = useBooking();

  return (
    <div className="size-strip">
      <div className="size-strip__header">
        <h3 className="size-strip__title">SCALE & STARTING RATES</h3>
        <p className="size-strip__subtitle">
          True proportion boxes to help you visualize tattoo scale on skin.
        </p>
      </div>

      {/* Interactive Proportion Scale */}
      <div className="size-strip__scroller">
        <div className="size-strip__row">
          {pricing.sizeStrip.map((item) => (
            <div
              key={item.inches}
              className="size-box"
              style={{ "--in": item.inches }}
              onClick={() =>
                openBooking({
                  source: `Size Strip: ${item.inches} in`,
                  size: item.inches,
                  budget: item.startingPriceInr,
                })
              }
              role="button"
              tabIndex="0"
              aria-label={`Select ${item.inches} inch size, starting at ₹${item.startingPriceInr}`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  openBooking({
                    source: `Size Strip: ${item.inches} in`,
                    size: item.inches,
                    budget: item.startingPriceInr,
                  });
                }
              }}
            >
              {/* True proportion square */}
              <div className="size-box__square-wrap">
                <div className="size-box__square" />
              </div>

              <div className="size-box__info">
                <div className="size-box__top">
                  <span className="size-box__inches">{item.inches}&Prime;</span>
                  {item.badge && (
                    <span className="size-box__badge">{item.badge}</span>
                  )}
                </div>
                <span className="size-box__ref">{item.reference}</span>
                <span className="size-box__price">
                  from ₹{item.startingPriceInr.toLocaleString("en-IN")}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Large Projects Strip */}
      <div className="size-strip__large-strip">
        <span className="size-strip__large-label">LARGE-SCALE WORK:</span>
        <div className="size-strip__large-cards">
          {pricing.largeProjects.map((proj, idx) => (
            <div
              key={idx}
              className="size-strip__large-card"
              onClick={() =>
                openBooking({
                  source: `Large Project: ${proj.title}`,
                  size: proj.startingInr ? 12 : 24,
                  budget: proj.startingInr || "",
                  idea: `Consultation enquiry for ${proj.title} (${proj.scope})`,
                })
              }
              role="button"
              tabIndex="0"
            >
              <div className="size-strip__large-meta">
                <h4 className="size-strip__large-title">{proj.title}</h4>
                <span className="size-strip__large-scope">{proj.scope}</span>
              </div>
              <span className="size-strip__large-price">
                {proj.startingInr
                  ? `from ₹${proj.startingInr.toLocaleString("en-IN")}`
                  : proj.customText}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
