"use client";

import React, { useState, useRef, useEffect } from "react";

interface ProgressBarProps {
  max: number;
  children?: React.ReactNode;
}

const ProgressBarComponent: React.FC<ProgressBarProps> = ({
  max,
  children,
}) => {
  const [counted, setCounted] = useState<number>(0);
  const targetElement = useRef<HTMLDivElement | null>(null);
  const intervalRef = useRef<number | null>(null);

  const startCountup = (): void => {
    // Guard against invalid max
    const safeMax = Math.max(1, Math.floor(max));
    const stepMs = 2000 / safeMax; // aim to finish in ~2s

    // Clear any existing interval just in case
    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    intervalRef.current = window.setInterval(() => {
      setCounted((prev) => {
        const next = prev + 1;
        if (next >= max) {
          if (intervalRef.current !== null) {
            window.clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
        }
        return next;
      });
    }, stepMs);
  };

  useEffect(() => {
    const handleIntersection = (
      entries: IntersectionObserverEntry[],
      observer: IntersectionObserver
    ) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          startCountup();
          observer.unobserve(entry.target);
        }
      });
    };

    const options: IntersectionObserverInit = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const observer = new IntersectionObserver(handleIntersection, options);

    if (targetElement.current) {
      observer.observe(targetElement.current);
    }

    return () => {
      if (targetElement.current) {
        observer.unobserve(targetElement.current);
      }
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
    // Re-run when max changes to restart progression on new target
  }, [max]);

  return (
    <div ref={targetElement} className="value" style={{ width: `${counted}%` }}>
      {children}
    </div>
  );
};

export default ProgressBarComponent;
