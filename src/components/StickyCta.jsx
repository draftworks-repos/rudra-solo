import React, { useState, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import { useBooking } from "../context/BookingContext.jsx";
import CtaButton from "./CtaButton.jsx";
import "./StickyCta.css";

export default function StickyCta() {
  const { isOpen, openBooking } = useBooking();
  const [heroOutOfView, setHeroOutOfView] = useState(false);
  const [footerInView, setFooterInView] = useState(false);

  useEffect(() => {
    const heroEl = document.getElementById("top");
    const footerEl = document.getElementById("contact");

    if (!heroEl) return;

    // Observe hero
    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        // When hero is not intersecting, it's out of view
        setHeroOutOfView(!entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    heroObserver.observe(heroEl);

    // Observe footer
    let footerObserver = null;
    if (footerEl) {
      footerObserver = new IntersectionObserver(
        ([entry]) => {
          setFooterInView(entry.isIntersecting);
        },
        { threshold: 0.15 }
      );
      footerObserver.observe(footerEl);
    }

    return () => {
      heroObserver.disconnect();
      if (footerObserver) footerObserver.disconnect();
    };
  }, []);

  const isVisible = heroOutOfView && !footerInView && !isOpen;

  return (
    <aside
      className={`sticky-cta ${isVisible ? "sticky-cta--visible" : ""}`}
      aria-hidden={!isVisible}
    >
      <CtaButton
        variant="primary"
        size="lg"
        className="sticky-cta__btn"
        onClick={() => openBooking({ source: "Sticky Pill" })}
      >
        <span>BOOK A SESSION</span>
        <ArrowUpRight size={18} aria-hidden="true" />
      </CtaButton>
    </aside>
  );
}
