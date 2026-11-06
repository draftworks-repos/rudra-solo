import React, { useState, useMemo } from "react";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { useBooking } from "../context/BookingContext.jsx";
import { pricing } from "../data/pricing.js";
import { calculateEstimate } from "../utils/pricingCalculator.js";
import CtaButton from "./CtaButton.jsx";
import "./PriceEstimator.css";

export default function PriceEstimator() {
  const { openBooking } = useBooking();

  const [inches, setInches] = useState(4);
  const [style, setStyle] = useState("Fine Line");
  const [isColor, setIsColor] = useState(false);
  const [isCoverup, setIsCoverup] = useState(false);

  const estimate = useMemo(() => {
    return calculateEstimate({
      inches,
      style,
      isColor,
      isCoverup,
      rates: pricing.ratesPerInch,
      sessionMin: pricing.sessionMinimumInr,
    });
  }, [inches, style, isColor, isCoverup]);

  const handleBook = () => {
    openBooking({
      source: "Price Estimator",
      style,
      size: inches,
      budget: estimate.minEstimate,
      idea: `Estimated size: ${inches} inches (${style})${isColor ? ", with colour" : ""}${isCoverup ? ", cover-up rework" : ""}. Approximate range: ${estimate.formattedRange}.`,
    });
  };

  return (
    <div className="price-estimator">
      <div className="price-estimator__header">
        <div className="price-estimator__title-wrap">
          <Sparkles className="price-estimator__icon" size={22} />
          <h3 className="price-estimator__title">INTERACTIVE ESTIMATOR</h3>
        </div>
        <p className="price-estimator__desc">
          Dial in your size, style, and project parameters for an instant cost projection.
        </p>
      </div>

      <div className="price-estimator__body">
        {/* Controls Column */}
        <div className="price-estimator__controls">
          {/* Slider */}
          <div className="est-control">
            <div className="est-control__header">
              <label htmlFor="est-inches" className="est-control__label">
                Tattoo Size:
              </label>
              <span className="est-control__val">{inches} Inches (longest side)</span>
            </div>
            <input
              id="est-inches"
              type="range"
              min="1"
              max="24"
              value={inches}
              onChange={(e) => setInches(Number(e.target.value))}
              className="est-control__slider"
              aria-label="Tattoo size in inches"
            />
            <div className="est-control__scale-marks">
              <span>1&Prime;</span>
              <span>6&Prime;</span>
              <span>12&Prime;</span>
              <span>18&Prime;</span>
              <span>24&Prime;</span>
            </div>
          </div>

          {/* Style Select */}
          <div className="est-control">
            <label htmlFor="est-style" className="est-control__label">
              Style Technique:
            </label>
            <select
              id="est-style"
              value={style}
              onChange={(e) => setStyle(e.target.value)}
              className="est-control__select"
            >
              {Object.keys(pricing.ratesPerInch).map((st) => (
                <option key={st} value={st}>
                  {st} (₹{pricing.ratesPerInch[st].toLocaleString("en-IN")}/in)
                </option>
              ))}
            </select>
          </div>

          {/* Toggles */}
          <div className="est-control__toggles">
            <label className="est-toggle">
              <input
                type="checkbox"
                checked={isColor}
                onChange={(e) => setIsColor(e.target.checked)}
                className="est-toggle__checkbox"
              />
              <span className="est-toggle__custom" />
              <div className="est-toggle__text">
                <span className="est-toggle__title">Colour Pigment</span>
                <span className="est-toggle__sub">+20% rate</span>
              </div>
            </label>

            <label className="est-toggle">
              <input
                type="checkbox"
                checked={isCoverup}
                onChange={(e) => setIsCoverup(e.target.checked)}
                className="est-toggle__checkbox"
              />
              <span className="est-toggle__custom" />
              <div className="est-toggle__text">
                <span className="est-toggle__title">Cover-up / Rework</span>
                <span className="est-toggle__sub">+25% complexity</span>
              </div>
            </label>
          </div>
        </div>

        {/* Output Column */}
        <div className="price-estimator__output">
          <div className="price-estimator__result-card">
            <span className="price-estimator__result-label">ESTIMATED PRICE RANGE</span>
            <div className="price-estimator__result-value">
              {estimate.formattedRange}
            </div>

            <p className="price-estimator__disclaimer">
              Estimate only. Final quote after a free consult.
            </p>

            <CtaButton
              variant="primary"
              size="lg"
              className="price-estimator__btn"
              onClick={handleBook}
            >
              <span>BOOK WITH THIS ESTIMATE</span>
              <ArrowUpRight size={18} />
            </CtaButton>
          </div>
        </div>
      </div>
    </div>
  );
}
