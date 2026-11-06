import { useEffect, useRef, useState } from "react";

/**
 * Hook to detect when element scrolls into view.
 * Plays once and unobserves immediately for optimal performance.
 */
export function useInView(options = { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }) {
  const [isInView, setIsInView] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el || isInView) return;

    if (typeof window !== "undefined" && !("IntersectionObserver" in window)) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        observer.unobserve(entry.target);
        observer.disconnect();
      }
    }, options);

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [isInView, options]);

  return [elementRef, isInView];
}

export default useInView;
