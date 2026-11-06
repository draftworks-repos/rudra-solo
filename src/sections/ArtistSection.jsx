import React from "react";
import { ArrowUpRight, Instagram } from "lucide-react";
import { images } from "../data/images.js";
import { site } from "../data/site.js";
import { useBooking } from "../context/BookingContext.jsx";
import SectionHead from "../components/SectionHead.jsx";
import ImageTile from "../components/ImageTile.jsx";
import CtaButton from "../components/CtaButton.jsx";
import Reveal from "../components/Reveal.jsx";
import "./ArtistSection.css";

export default function ArtistSection() {
  const { openBooking } = useBooking();

  return (
    <section id="artist" className="artist-section cv-auto" aria-labelledby="artist-title">
      <div className="container">
        <Reveal>
          <SectionHead
            number="05"
            label="05 / THE ARTIST"
            title="HI, I'M RUDRA."
            highlightWord="RUDRA."
            isDark={false}
          />
        </Reveal>

        <div className="artist-layout">
          {/* Photos Column (Desktop 5 cols) */}
          <div className="artist-photos">
            <div className="artist-photos__wrap">
              {/* Primary Artist Portrait */}
              <div className="artist-frame artist-frame--primary">
                <ImageTile
                  src={images.artist01.src}
                  alt={images.artist01.alt}
                  position={images.artist01.position}
                  aspect="4/5"
                  className="artist-img"
                />
              </div>

              {/* Overlapping Action Photo */}
              <div className="artist-frame artist-frame--overlap">
                <ImageTile
                  src={images.artist02.src}
                  alt={images.artist02.alt}
                  position={images.artist02.position}
                  aspect="1/1"
                  className="artist-img"
                />
              </div>

              {/* Artist Signature Badge */}
              <div className="artist-signature-wrap" aria-hidden="true">
                <span className="artist-signature">&mdash; Rudra</span>
              </div>
            </div>
          </div>

          {/* Bio & Details Column (Desktop 7 cols) */}
          <div className="artist-content">
            <Reveal delay={80}>
              <div className="artist-bio">
                <p className="artist-para">
                  I started drawing on scraps of cardboard in college before apprenticing under veteran tattooers in Mumbai and Bengaluru. Over the last 8+ years, I fell deeply in love with the surgical stillness of single-needle fine line and the visceral weight of heavy blackwork.
                </p>
                <p className="artist-para">
                  My core philosophy is simple: a tattoo isn&apos;t just made for the camera lights in the studio—it must look striking, sharp, and intentional when you&apos;re sixty. Every single piece I needle is designed from scratch around your unique muscle contours. No flash catalogs copied from Pinterest, no rushed stencils. Just pure ink discipline.
                </p>
              </div>
            </Reveal>

            {/* Quick Facts Row */}
            <Reveal delay={140}>
              <div className="artist-facts">
                <div className="artist-fact-card">
                  <span className="artist-fact-num">8+</span>
                  <span className="artist-fact-label">Years of Craft</span>
                </div>
                <div className="artist-fact-card">
                  <span className="artist-fact-num">3,500+</span>
                  <span className="artist-fact-label">Pieces Needled</span>
                </div>
                <div className="artist-fact-card">
                  <span className="artist-fact-num">1</span>
                  <span className="artist-fact-label">Chair / Pure Focus</span>
                </div>
              </div>
            </Reveal>

            {/* Style Pills */}
            <Reveal delay={180}>
              <div className="artist-tags">
                <span className="artist-tag">Single Needle 1RL/3RL</span>
                <span className="artist-tag">Classical Greywash</span>
                <span className="artist-tag">Cyber-Sigilism</span>
                <span className="artist-tag">Anatomical Flow</span>
              </div>
            </Reveal>

            {/* CTAs */}
            <Reveal delay={220}>
              <div className="artist-actions">
                <CtaButton
                  variant="primary"
                  size="lg"
                  onClick={() => openBooking({ source: "Artist Section - Rudra" })}
                >
                  <span>BOOK WITH RUDRA</span>
                  <ArrowUpRight size={20} />
                </CtaButton>

                <CtaButton
                  variant="outline"
                  size="lg"
                  href={site.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram size={18} />
                  <span>DM ON INSTAGRAM</span>
                </CtaButton>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
