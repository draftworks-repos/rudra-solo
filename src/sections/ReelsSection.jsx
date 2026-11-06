import React, { useRef } from "react";
import { ChevronLeft, ChevronRight, Instagram } from "lucide-react";
import { reels } from "../data/reels.js";
import { site } from "../data/site.js";
import { useVideoAutoplay } from "../hooks/useVideoAutoplay.js";
import SectionHead from "../components/SectionHead.jsx";
import ReelTile from "../components/ReelTile.jsx";
import CtaButton from "../components/CtaButton.jsx";
import Reveal from "../components/Reveal.jsx";
import "./ReelsSection.css";

export default function ReelsSection() {
  const scrollerRef = useRef(null);
  useVideoAutoplay(scrollerRef);

  const scrollByOne = (direction) => {
    if (!scrollerRef.current) return;
    const tileWidth = scrollerRef.current.querySelector(".reel-tile-wrap")?.offsetWidth || 260;
    const scrollAmount = (tileWidth + 16) * direction;
    scrollerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  return (
    <section id="reels" className="reels-section section--dark cv-auto" aria-labelledby="reels-title">
      <div className="container">
        <Reveal>
          <SectionHead
            number="01"
            label="01 / REELS"
            title="FRESH FROM THE FEED."
            outlineWord="FEED."
            isDark={true}
            action={
              <div className="reels-section__nav-wrap">
                <CtaButton
                  variant="dark"
                  size="sm"
                  href={site.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram size={16} />
                  <span>Follow {site.handle}</span>
                </CtaButton>

                {/* Desktop Prev / Next controls */}
                <div className="reels-section__arrows">
                  <button
                    type="button"
                    className="reels-section__arrow"
                    onClick={() => scrollByOne(-1)}
                    aria-label="Scroll left one reel"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    type="button"
                    className="reels-section__arrow"
                    onClick={() => scrollByOne(1)}
                    aria-label="Scroll right one reel"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            }
          />
        </Reveal>

        {/* Scroll snap row */}
        <div ref={scrollerRef} className="reels-section__scroller" tabIndex="0" aria-label="Reels list scroller">
          {reels.map((reel) => (
            <ReelTile key={reel.id} reel={reel} />
          ))}
        </div>
      </div>
    </section>
  );
}
