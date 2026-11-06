import React from "react";
import { Instagram, ArrowUpRight } from "lucide-react";
import { images } from "../data/images.js";
import { site } from "../data/site.js";
import ImageTile from "./ImageTile.jsx";
import CtaButton from "./CtaButton.jsx";
import "./InstaGrid.css";

export default function InstaGrid() {
  return (
    <div className="insta-feed">
      {/* Instagram Profile Header */}
      <div className="insta-profile">
        <div className="insta-profile__avatar-ring">
          <img
            src={images.artist01.src}
            alt={images.artist01.alt}
            className="insta-profile__avatar"
            style={{ objectPosition: images.artist01.position }}
          />
        </div>

        <div className="insta-profile__details">
          <div className="insta-profile__top-row">
            <h3 className="insta-profile__handle">{site.handle}</h3>
            <CtaButton
              variant="primary"
              size="sm"
              href={site.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>FOLLOW</span>
              <ArrowUpRight size={14} />
            </CtaButton>
          </div>

          <div className="insta-profile__stats">
            <div className="insta-stat">
              <span className="insta-stat__count">348</span>
              <span className="insta-stat__label">posts</span>
            </div>
            <div className="insta-stat">
              <span className="insta-stat__count">42.8K</span>
              <span className="insta-stat__label">followers</span>
            </div>
            <div className="insta-stat">
              <span className="insta-stat__count">412</span>
              <span className="insta-stat__label">following</span>
            </div>
          </div>

          <p className="insta-profile__bio">
            Solo custom tattoos by {site.artistName}. Fine line, black & grey, and heavy blackwork. 1 chair. {site.city}.
          </p>
        </div>
      </div>

      {/* 3x3 Grid with 4px gap and no border-radius like real Instagram */}
      <div className="insta-grid" aria-label="Recent Instagram feed posts">
        {images.insta.map((post, idx) => (
          <a
            key={idx}
            href={site.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="insta-grid__tile"
            aria-label={`View Instagram post: ${post.alt}`}
          >
            <ImageTile
              src={post.src}
              alt={post.alt}
              position={post.position}
              aspect="1/1"
              className="insta-grid__img"
            />
            <div className="insta-grid__hover-chip" aria-hidden="true">
              <Instagram size={20} />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
