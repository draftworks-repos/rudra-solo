import React from "react";
import { aftercare } from "../data/aftercare.js";
import SectionHead from "../components/SectionHead.jsx";
import AftercareCard from "../components/AftercareCard.jsx";
import Reveal from "../components/Reveal.jsx";
import "./AftercareSection.css";

export default function AftercareSection() {
  return (
    <section id="aftercare" className="aftercare-section cv-auto" aria-labelledby="aftercare-title">
      <div className="container">
        <Reveal>
          <SectionHead
            number="08"
            label="08 / AFTERCARE"
            title="HEAL IT RIGHT."
            note="swipe &rarr;"
            isDark={false}
          />
        </Reveal>

        {/* Horizontal scroll snap row of 4 story cards */}
        <div className="aftercare-scroller" tabIndex="0" aria-label="Tattoo aftercare timeline stories">
          {aftercare.map((card) => (
            <AftercareCard key={card.id} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}
