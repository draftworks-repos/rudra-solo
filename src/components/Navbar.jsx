import React, { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { useBooking } from "../context/BookingContext.jsx";
import CtaButton from "./CtaButton.jsx";
import "./Navbar.css";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { openBooking } = useBooking();

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 40);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Work", href: "#work" },
    { label: "Flash", href: "#flash" },
    { label: "Artist", href: "#artist" },
    { label: "Pricing", href: "#pricing" },
    { label: "Reviews", href: "#reviews" },
  ];

  const handleLinkClick = () => {
    setIsMobileOpen(false);
  };

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  return (
    <header className={`navbar ${isScrolled ? "navbar--scrolled" : ""}`}>
      <div className="container navbar__container">
        <a href="#top" className="navbar__logo" aria-label="RUDRA INK Home">
          RUDRA INK
        </a>

        {/* Desktop Nav */}
        <nav className="navbar__links" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="navbar__link">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="navbar__actions">
          <CtaButton
            variant="primary"
            size="sm"
            onClick={() => openBooking({ source: "Navbar Pill" })}
          >
            <span>BOOK</span>
            <ArrowUpRight size={16} aria-hidden="true" />
          </CtaButton>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="navbar__menu-btn"
            onClick={() => setIsMobileOpen((prev) => !prev)}
            aria-expanded={isMobileOpen}
            aria-label={
              isMobileOpen ? "Close navigation menu" : "Open navigation menu"
            }
          >
            {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`navbar__drawer ${isMobileOpen ? "navbar__drawer--open" : ""}`}
        aria-hidden={!isMobileOpen}
      >
        <div className="navbar__drawer-content">
          <nav className="navbar__drawer-nav">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="navbar__drawer-link"
                onClick={handleLinkClick}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="navbar__drawer-footer">
            <CtaButton
              variant="primary"
              size="lg"
              className="navbar__drawer-cta"
              onClick={() => {
                setIsMobileOpen(false);
                openBooking({ source: "Mobile Nav Drawer" });
              }}
            >
              <span>BOOK A SESSION</span>
              <ArrowUpRight size={20} />
            </CtaButton>
          </div>
        </div>
      </div>
    </header>
  );
}
