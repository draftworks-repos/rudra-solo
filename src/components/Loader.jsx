import React, { useState, useEffect, useRef } from "react";
import "./Loader.css";

export default function Loader({ onComplete }) {
  // Start with true if not previously seen in this session
  const [shouldRender, setShouldRender] = useState(() => {
    try {
      if (typeof window !== "undefined") {
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (prefersReducedMotion) return false;
        const seen = sessionStorage.getItem("loaderSeen");
        if (seen) return false;
      }
    } catch {
      // Ignore sessionStorage issues
    }
    return true;
  });

  const [isExiting, setIsExiting] = useState(false);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    if (!shouldRender) {
      if (onCompleteRef.current) onCompleteRef.current();
      return;
    }

    try {
      sessionStorage.setItem("loaderSeen", "true");
    } catch {
      // Ignore storage errors
    }

    document.body.style.overflow = "hidden";

    // Slide up after needle completes
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
    }, 1200);

    // Guaranteed removal
    const safetyTimer = setTimeout(() => {
      document.body.style.overflow = "";
      setShouldRender(false);
      if (onCompleteRef.current) onCompleteRef.current();
    }, 1800);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(safetyTimer);
      document.body.style.overflow = "";
    };
  }, [shouldRender]);

  const handleAnimationEnd = (e) => {
    if (e.target === e.currentTarget && (e.animationName === "loaderSlideUp" || isExiting)) {
      document.body.style.overflow = "";
      setShouldRender(false);
      if (onCompleteRef.current) onCompleteRef.current();
    }
  };

  if (!shouldRender) return null;

  return (
    <div
      className={`loader ${isExiting ? "loader--exiting" : ""}`}
      onAnimationEnd={handleAnimationEnd}
      role="status"
      aria-label="Loading portfolio"
    >
      <div className="loader__content">
        <h1 className="loader__title">RUDRA INK</h1>
        <div className="loader__track">
          <div className="loader__needle-wrap">
            <svg
              className="loader__needle-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--acid)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="m14 2 8 8-3 3-8-8 3-3Z" />
              <path d="m9 7-7 7 4 4 7-7" />
              <path d="m2 22 5-1" />
            </svg>
          </div>
          <div className="loader__line" />
        </div>
        <span className="loader__label">loading ink...</span>
      </div>
    </div>
  );
}
