import { useEffect } from "react";

/**
 * Manages video autoplay for reel tiles.
 * Observes registered video elements and plays only when >= 60% in view.
 */
export function useVideoAutoplay(containerRef) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const isMobile = window.innerWidth <= 640;
    const maxPlaying = isMobile ? 1 : 2;

    const videos = Array.from(container.querySelectorAll("video"));
    if (videos.length === 0) return;

    const activePlaying = new Set();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;
          if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
            if (activePlaying.size < maxPlaying) {
              const playPromise = video.play();
              if (playPromise !== undefined) {
                playPromise
                  .then(() => activePlaying.add(video))
                  .catch(() => {
                    // Autoplay prevented by browser
                  });
              }
            }
          } else {
            video.pause();
            activePlaying.delete(video);
          }
        });
      },
      {
        root: null,
        threshold: 0.6,
      }
    );

    videos.forEach((v) => observer.observe(v));

    return () => {
      videos.forEach((v) => {
        v.pause();
        observer.unobserve(v);
      });
      observer.disconnect();
    };
  }, [containerRef]);
}

export default useVideoAutoplay;
