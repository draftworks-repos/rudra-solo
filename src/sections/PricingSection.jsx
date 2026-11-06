import React from "react";
import { pricing } from "../data/pricing.js";
import SectionHead from "../components/SectionHead.jsx";
import SizeStrip from "../components/SizeStrip.jsx";
import PriceEstimator from "../components/PriceEstimator.jsx";
import Reveal from "../components/Reveal.jsx";
import "./PricingSection.css";

export default function PricingSection() {
  return (
    <section id="pricing" className="pricing-section cv-auto" aria-labelledby="pricing-title">
      <div className="container">
        <Reveal>
          <SectionHead
            number="07"
            label="07 / PRICING"
            title="PRICED BY THE INCH."
            outlineWord="INCH."
            note="Zero hidden costs. Needle fees included."
            isDark={false}
          />
        </Reveal>

        {/* 1. Size Strip with true-proportion CSS boxes & large work */}
        <Reveal delay={60}>
          <SizeStrip />
        </Reveal>

        {/* 2. Interactive Price Estimator Card */}
        <Reveal delay={120}>
          <PriceEstimator />
        </Reveal>

        {/* 3. Three small notes in a staggered layout */}
        <Reveal delay={180}>
          <div className="pricing-notes-grid">
            {pricing.notes.map((note, idx) => (
              <div key={idx} className="pricing-note-card">
                <span className="pricing-note-card__val">{note.value}</span>
                <h4 className="pricing-note-card__label">{note.label}</h4>
                <p className="pricing-note-card__desc">{note.desc}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
