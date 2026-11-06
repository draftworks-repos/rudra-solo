import React, { useState, useRef } from "react";
import { Instagram, Play, Pause, ArrowUpRight } from "lucide-react";
import { useBooking } from "../context/BookingContext.jsx";
import "./ReelTile.css";

export default function ReelTile({ reel }) {
  const { openBooking } = useBooking();
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoError, setVideoError] = useState(false);

  const togglePlay = (e) => {
    // If clicking the Instagram chip or book button, let them handle it
    if (e.target.closest(".reel-tile__ig-chip") || e.target.closest(".reel-tile__book-btn")) {
      return;
    }
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className="reel-tile-wrap">
      <div
        className={`reel-tile ${isPlaying ? "reel-tile--playing" : ""}`}
        onClick={togglePlay}
        role="button"
        tabIndex="0"
        aria-label={`Play or pause reel: ${reel.caption}`}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            togglePlay(e);
          }
        }}
      >
        {!videoError ? (
          <video
            ref={videoRef}
            className="reel-tile__video"
            src={reel.src}
            poster={reel.poster}
            muted
            loop
            playsInline
            preload="metadata"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onError={() => setVideoError(true)}
          />
        ) : (
          <img
            src={reel.poster}
            alt={reel.alt}
            className="reel-tile__poster"
            style={{ objectPosition: reel.position }}
          />
        )}

        {/* Central Play/Pause button indicator */}
        <div className={`reel-tile__play-btn ${isPlaying ? "reel-tile__play-btn--active" : ""}`} aria-hidden="true">
          {isPlaying ? <Pause size={24} /> : <Play size={24} fill="currentColor" />}
        </div>

        {/* Top-right Instagram link chip */}
        <a
          href={reel.igUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="reel-tile__ig-chip"
          aria-label="Watch on Instagram"
          onClick={(e) => e.stopPropagation()}
        >
          <Instagram size={14} />
        </a>

        {/* Bottom subtle gradient container */}
        <div className="reel-tile__overlay">
          {/* Solid chip for text readability */}
          <div className="reel-tile__info-chip">
            <div className="reel-tile__meta">
              <span className="reel-tile__views">
                <Play size={10} fill="currentColor" /> {reel.views}
              </span>
              <span className="reel-tile__style-tag">{reel.style}</span>
            </div>
            <p className="reel-tile__caption">{reel.caption}</p>
          </div>
        </div>
      </div>

      {/* Book style action below tile */}
      <button
        type="button"
        className="reel-tile__book-btn"
        onClick={() =>
          openBooking({
            source: `Reel: ${reel.caption}`,
            style: reel.style,
          })
        }
      >
        <span>Book this style</span>
        <ArrowUpRight size={14} />
      </button>
    </div>
  );
}