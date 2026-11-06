import React from "react";
import SectionHead from "../components/SectionHead.jsx";
import InstaGrid from "../components/InstaGrid.jsx";
import Reveal from "../components/Reveal.jsx";
import "./InstagramSection.css";

export default function InstagramSection() {
  return (
    <section id="instagram" className="instagram-section cv-auto" aria-labelledby="instagram-title">
      <div className="container">
        <Reveal>
          <SectionHead
            number="10"
            label="10 / FEED"
            title="THE STUDIO DIARY."
            highlightWord="DIARY."
            note="Updated daily with fresh needlework & flash drops"
            isDark={false}
          />
        </Reveal>

        <Reveal delay={80}>
          <InstaGrid />
        </Reveal>
      </div>
    </section>
  );
}
