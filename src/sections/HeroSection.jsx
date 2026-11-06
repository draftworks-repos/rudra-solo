import React from "react";
import { ArrowUpRight, Instagram, Play } from "lucide-react";
import { images } from "../data/images.js";
import { site } from "../data/site.js";
import { useBooking } from "../context/BookingContext.jsx";
import CtaButton from "../components/CtaButton.jsx";
import Sticker from "../components/Sticker.jsx";
import Reveal from "../components/Reveal.jsx";
import ImageTile from "../components/ImageTile.jsx";
import "./HeroSection.css";

export default function HeroSection() {
  const { openBooking } = useBooking();

  return (
    <section id="top" className="hero-section" aria-label="Hero Section">
      <div className="container hero-section__container">
        {/* Left Column (Desktop 7 cols) */}
        <div className="hero-section__text-col">
          <Reveal delay={0}>
            <div className="hero-section__eyebrow">
              <span className="hero-section__pulse-dot" />
              <span className="hero-section__eyebrow-text">Books open for custom projects</span>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="hero-section__title">
              WEAR YOUR <br />
              <span className="marker-swipe hero-section__wild">WILD</span> IDEAS.
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="hero-section__desc">
              Custom single-needle fine line, dark blackwork, and smooth greywash
              crafted by one artist. One chair, sterile setup, zero mass templates.
              Built to age gracefully on your skin for sixty years.
            </p>
          </Reveal>

          <Reveal delay={200}>
            <div className="hero-section__cta-group">
              <CtaButton
                variant="primary"
                size="lg"
                onClick={() => openBooking({ source: "Hero Book Session" })}
              >
                <span>BOOK A SESSION</span>
                <ArrowUpRight size={20} />
              </CtaButton>

              <CtaButton
                variant="secondary"
                size="lg"
                href="#reels"
              >
                <Play size={18} fill="currentColor" />
                <span>Watch reels</span>
              </CtaButton>
            </div>
          </Reveal>

          <Reveal delay={240}>
            <div className="hero-section__meta-row">
              <a
                href={site.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hero-section__handle-chip"
                aria-label="Instagram handle"
              >
                <Instagram size={16} />
                <span>{site.handle}</span>
              </a>

              <span className="hero-section__location-pill">
                📍 {site.city}
              </span>
            </div>
          </Reveal>
        </div>

        {/* Right Column (Desktop 5 cols) */}
        <div className="hero-section__photo-col">
          <Reveal delay={120}>
            <div className="hero-section__photo-wrap">
              {/* Overlapping stickers */}
              <Sticker
                variant="acid"
                rotate={-6}
                className="hero-section__sticker hero-section__sticker--top"
              >
                Walk-ins: Fri
              </Sticker>

              <Sticker
                variant="bone"
                rotate={8}
                className="hero-section__sticker hero-section__sticker--bottom"
              >
                Since 2016
              </Sticker>

              {/* Photo Frame */}
              <div className="hero-section__frame">
                <ImageTile
                  src={images.hero.src}
                  alt={images.hero.alt}
                  position={images.hero.position}
                  aspect="4/5"
                  priority={true}
                  className="hero-section__image"
                />
              </div>

              {/* Permanent marker note with curved arrow SVG */}
              <div className="hero-section__note-wrap" aria-hidden="true">
                <svg
                  className="hero-section__note-arrow"
                  viewBox="0 0 80 40"
                  fill="none"
                  stroke="var(--ink)"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d="M10 30 C 35 35, 60 25, 70 8" />
                  <polyline points="62 7 70 8 72 16" />
                </svg>
                <span className="hero-section__note-text">
                  1 chair. 1 artist. 0 templates.
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
