import React from "react";
import { styles } from "../data/styles.js";
import SectionHead from "../components/SectionHead.jsx";
import StyleRow from "../components/StyleRow.jsx";
import Reveal from "../components/Reveal.jsx";
import "./StylesSection.css";

export default function StylesSection() {
  return (
    <section id="styles" className="styles-section section--dark cv-auto" aria-labelledby="styles-title">
      <div className="container">
        <Reveal>
          <SectionHead
            number="06"
            label="06 / STYLES"
            title="PICK YOUR POISON."
            outlineWord="POISON."
            note="Hover or tap to reveal technique & healed work"
            isDark={true}
          />
        </Reveal>

        <div className="styles-list">
          {styles.map((styleItem, idx) => (
            <StyleRow key={styleItem.id} styleItem={styleItem} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
