import React from "react";
import { healed } from "../data/healed.js";
import SectionHead from "../components/SectionHead.jsx";
import BeforeAfter from "../components/BeforeAfter.jsx";
import Reveal from "../components/Reveal.jsx";
import "./HealedSection.css";

export default function HealedSection() {
  const largeItem = healed.find((h) => h.featured) || healed[0];
  const smallItems = healed.filter((h) => h.id !== largeItem.id);

  return (
    <section id="healed" className="healed-section section--dark cv-auto" aria-labelledby="healed-title">
      <div className="container">
        <Reveal>
          <SectionHead
            number="04"
            label="04 / HEALED"
            title="FRESH VS. 6 MONTHS LATER."
            outlineWord="MONTHS"
            note="Drag the slider or use arrow keys"
            isDark={true}
          />
        </Reveal>

        {/* Asymmetric Layout: 1 large on top/left, 2 smaller stacked/paired */}
        <div className="healed-grid">
          <div className="healed-grid__featured">
            <BeforeAfter item={largeItem} isLarge={true} />
          </div>

          <div className="healed-grid__side">
            {smallItems.map((item) => (
              <BeforeAfter key={item.id} item={item} isLarge={false} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
