import React from "react";
import { ArrowUpRight, ArrowUp, Instagram, Youtube, MessageCircle } from "lucide-react";
import { site } from "../data/site.js";
import { useBooking } from "../context/BookingContext.jsx";
import CtaButton from "../components/CtaButton.jsx";
import Reveal from "../components/Reveal.jsx";
import "./FooterSection.css";

export default function FooterSection() {
  const { openBooking } = useBooking();

  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const whatsappDirect = `https://wa.me/${site.whatsappNumber.replace(/[^\d]/g, "")}`;

  return (
    <footer id="contact" className="footer-section section--dark" aria-labelledby="footer-title">
      <div className="container footer-section__container">
        <div className="footer-layout">
          {/* Left Column (Desktop 7 cols) */}
          <div className="footer-main">
            <Reveal>
              <span className="footer-eyebrow">FINAL CALL</span>
              <h2 id="footer-title" className="footer-title">
                GOT AN IDEA? <br />
                LET&apos;S <span className="footer-title__acid">INK IT.</span>
              </h2>
            </Reveal>

            <Reveal delay={80}>
              <a href={`mailto:${site.email}`} className="footer-email-link">
                <span className="footer-email-text">{site.email}</span>
                <span className="footer-email-line" />
              </a>
            </Reveal>

            <Reveal delay={140}>
              <div className="footer-main-cta">
                <CtaButton
                  variant="primary"
                  size="lg"
                  onClick={() => openBooking({ source: "Footer CTA" })}
                >
                  <span>BOOK A SESSION</span>
                  <ArrowUpRight size={20} />
                </CtaButton>
              </div>
            </Reveal>
          </div>

          {/* Right Column (Desktop 5 cols) - 3 Stacked Info Blocks */}
          <div className="footer-info">
            <Reveal delay={100}>
              <div className="footer-info-block footer-info-block--lg">
                <span className="footer-info-label">STUDIO VISIT</span>
                <p className="footer-info-text">{site.address}</p>
                <p className="footer-info-sub">{site.city}</p>
              </div>
            </Reveal>

            <Reveal delay={160}>
              <div className="footer-info-block footer-info-block--md">
                <span className="footer-info-label">STUDIO HOURS</span>
                <p className="footer-info-text">{site.hours}</p>
                <p className="footer-info-sub">By appointment only (Walk-ins: Fri)</p>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div className="footer-info-block footer-info-block--sm">
                <span className="footer-info-label">DIRECT REACH</span>
                <div className="footer-contact-links">
                  <a href={`tel:${site.phone}`} className="footer-reach-link">
                    {site.phone}
                  </a>
                  <a
                    href={whatsappDirect}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-reach-link footer-reach-link--wa"
                  >
                    WhatsApp Chat &rarr;
                  </a>
                </div>

                {/* 44px round outlined social buttons */}
                <div className="footer-socials">
                  <a
                    href={site.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-social-btn"
                    aria-label="Instagram"
                  >
                    <Instagram size={20} />
                  </a>

                  <a
                    href={site.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-social-btn"
                    aria-label="YouTube"
                  >
                    <Youtube size={20} />
                  </a>

                  <a
                    href={whatsappDirect}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-social-btn"
                    aria-label="WhatsApp"
                  >
                    <MessageCircle size={20} />
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Giant Cropped Wordmark with bottom 25% cut off */}
        <div className="footer-wordmark-wrap" aria-hidden="true">
          <span className="footer-giant-wordmark">RUDRA INK</span>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom-bar">
          <p className="footer-copyright">
            &copy; {new Date().getFullYear()} {site.studioName}. All rights reserved. 1 chair, 1 artist, zero templates.
          </p>

          <a href="#top" onClick={scrollToTop} className="footer-back-to-top">
            <span>Back to top</span>
            <ArrowUp size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
}
