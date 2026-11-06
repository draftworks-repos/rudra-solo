import React, { useState, useEffect } from "react";
import { flash } from "../data/flash.js";
import SectionHead from "../components/SectionHead.jsx";
import FlashCard from "../components/FlashCard.jsx";
import CtaButton from "../components/CtaButton.jsx";
import Reveal from "../components/Reveal.jsx";
import "./FlashSection.css";

export default function FlashSection() {
  const [availableOnly, setAvailableOnly] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [visibleCount, setVisibleCount] = useState(12);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 640;
      setIsMobile(mobile);
      if (mobile) {
        setVisibleCount((prev) => (prev === 12 ? 4 : prev));
      } else {
        setVisibleCount(12);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const filteredFlash = availableOnly
    ? flash.filter((item) => !item.sold)
    : flash;

  const displayedFlash = isMobile
    ? filteredFlash.slice(0, visibleCount)
    : filteredFlash;

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 4, filteredFlash.length));
  };

  return (
    <section id="flash" className="flash-section cv-auto" aria-labelledby="flash-title">
      <div className="container">
        <Reveal>
          <SectionHead
            number="03"
            label="03 / FLASH"
            title="TAKE ME HOME."
            note="ready to ink, first come first served"
            isDark={false}
            action={
              <button
                type="button"
                className={`flash-toggle-btn ${availableOnly ? "is-active" : ""}`}
                onClick={() => setAvailableOnly((prev) => !prev)}
                aria-pressed={availableOnly}
              >
                <span className="flash-toggle-btn__dot" />
                <span>Available only ({flash.filter((f) => !f.sold).length})</span>
              </button>
            }
          />
        </Reveal>

        {/* Dense Sticker Grid (4 cols desktop, 3 tablet, 1 mobile) */}
        <div className="flash-grid">
          {displayedFlash.map((item) => (
            <FlashCard key={item.id} flashItem={item} />
          ))}
        </div>

        {/* Load More Button for Mobile */}
        {isMobile && visibleCount < filteredFlash.length && (
          <div className="flash-section__load-more">
            <CtaButton
              variant="secondary"
              size="md"
              onClick={handleLoadMore}
            >
              LOAD MORE FLASH ({filteredFlash.length - visibleCount} REMAINING)
            </CtaButton>
          </div>
        )}
      </div>
    </section>
  );
}