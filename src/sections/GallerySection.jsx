import React, { useState, useMemo, useEffect } from "react";
import { createPortal } from "react-dom";
import { SlidersHorizontal, X } from "lucide-react";
import { gallery } from "../data/gallery.js";
import SectionHead from "../components/SectionHead.jsx";
import GalleryTile from "../components/GalleryTile.jsx";
import Lightbox from "../components/Lightbox.jsx";
import CtaButton from "../components/CtaButton.jsx";
import Reveal from "../components/Reveal.jsx";
import "./GallerySection.css";

const CATEGORIES = ["All", "Fine Line", "Black & Grey", "Blackwork", "Realism", "Traditional"];

export default function GallerySection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [isMobile, setIsMobile] = useState(false);
  const [visibleCount, setVisibleCount] = useState(8);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 640;
      setIsMobile(mobile);
      setVisibleCount(mobile ? 4 : 8);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const filteredItems = useMemo(() => {
    if (activeCategory === "All") return gallery;
    return gallery.filter((item) => item.style.toLowerCase() === activeCategory.toLowerCase());
  }, [activeCategory]);

  const displayedItems = useMemo(() => {
    return filteredItems.slice(0, visibleCount);
  }, [filteredItems, visibleCount]);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setVisibleCount(isMobile ? 4 : 8);
    setIsFilterDrawerOpen(false);
  };

  const handleLoadMore = () => {
    const step = isMobile ? 4 : 8;
    setVisibleCount((prev) => Math.min(prev + step, filteredItems.length));
  };

  return (
    <section id="work" className="gallery-section cv-auto" aria-labelledby="gallery-title">
      <div className="container">
        <Reveal>
          <SectionHead
            number="02"
            label="02 / WORK"
            title="HEALED & HURTING (GOOD)."
            highlightWord="HEALED"
            isDark={false}
          />
        </Reveal>

        {/* Desktop Filter Chips */}
        <div className="gallery-filters gallery-filters--desktop" role="tablist" aria-label="Filter gallery by tattoo style">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`gallery-filter-chip ${activeCategory === cat ? "is-active" : ""}`}
              onClick={() => handleCategoryChange(cat)}
              role="tab"
              aria-selected={activeCategory === cat}
              aria-pressed={activeCategory === cat}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Tablet & Mobile Drawer Trigger Button */}
        <div className="gallery-filter-bar--mobile">
          <button
            type="button"
            className="gallery-filter-trigger"
            onClick={() => setIsFilterDrawerOpen(true)}
            aria-label="Open tattoo filter options"
          >
            <SlidersHorizontal size={18} />
            <span>Filter: {activeCategory}</span>
          </button>
          <span className="gallery-filter-count">
            {filteredItems.length} {filteredItems.length === 1 ? "piece" : "pieces"}
          </span>
        </div>

        {/* Bottom Drawer for Tablet & Mobile Filters */}
        <div
          className={`gallery-drawer-backdrop ${isFilterDrawerOpen ? "is-open" : ""}`}
          onClick={() => setIsFilterDrawerOpen(false)}
          aria-hidden={!isFilterDrawerOpen}
        >
          <div
            className="gallery-drawer"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Filter styles"
          >
            <div className="gallery-drawer__header">
              <div className="gallery-drawer__title-wrap">
                <SlidersHorizontal size={18} />
                <h3 className="gallery-drawer__title">FILTER BY STYLE</h3>
              </div>
              <button
                type="button"
                className="gallery-drawer__close"
                onClick={() => setIsFilterDrawerOpen(false)}
                aria-label="Close filter drawer"
              >
                <X size={20} />
              </button>
            </div>

            <div className="gallery-drawer__options">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`gallery-drawer__option ${activeCategory === cat ? "is-selected" : ""}`}
                  onClick={() => handleCategoryChange(cat)}
                >
                  <span>{cat}</span>
                  {activeCategory === cat && <span className="gallery-drawer__check">✓</span>}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Masonry Columns (Desktop 4, Tablet 3, Mobile 1 column) */}
        <div className="gallery-masonry" key={activeCategory}>
          {displayedItems.map((item) => (
            <GalleryTile
              key={item.id}
              item={item}
              onSelect={setSelectedItem}
            />
          ))}
        </div>

        {/* Load More Button */}
        {visibleCount < filteredItems.length && (
          <div className="gallery-section__load-more">
            <CtaButton
              variant="secondary"
              size="md"
              onClick={handleLoadMore}
            >
              LOAD MORE ({filteredItems.length - visibleCount} REMAINING)
            </CtaButton>
          </div>
        )}

        {/* Lightbox Modal */}
        <Lightbox
          item={selectedItem}
          items={filteredItems}
          onClose={() => setSelectedItem(null)}
          onNavigate={setSelectedItem}
        />
      </div>
    </section>
  );
}