"use client";

import React, { useEffect, useMemo, useState } from "react";
import { usePreloader } from "./PreloaderContext";

// Fullscreen gradient preloader – shown on the JoinTheTeam page
export default function FSPreloader() {
  const FADE_OUT = 700;
  const HARD_LIMIT = 3000;

  const { markDone } = usePreloader();

  // Hydration-safe: don't render until mounted on client
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const [visible, setVisible] = useState<boolean>(false);
  const [fading, setFading] = useState<boolean>(false);

  // Keep limits stable
  const limits = useMemo(() => ({ FADE_OUT, HARD_LIMIT }), []);

  useEffect(() => {
    if (!mounted) return;

    setVisible(true);

    // Safety: auto-hide after HARD_LIMIT
    const kill = setTimeout(() => {
      setFading(true);
      setTimeout(() => {
        setVisible(false);
        markDone();
      }, limits.FADE_OUT);
    }, Math.min(limits.HARD_LIMIT, 3000));

    return () => clearTimeout(kill);
  }, [mounted, limits, markDone]);

  // Until mounted, render nothing to keep SSR/CSR markup identical
  if (!mounted || !visible) return null;

  return (
    <>
      <style>{`
        @keyframes dj-bg-shift {
          0%   { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
        @keyframes logoIn {
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes draw {
          to { stroke-dashoffset: 0; }
        }
        @keyframes fillIn {
          to { fill: #FFFFFF; stroke-width: 0; }
        }
      `}</style>

      <div
        id="preloader"
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          display: "grid",
          placeItems: "center",
          background:
            "linear-gradient(135deg,#0A1F44 0%,#0E3A80 40%,#3C6FF7 70%,#FFFFFF 100%)",
          backgroundSize: "200% 200%",
          animation: "dj-bg-shift 3s ease-in-out forwards",
          transition: "opacity .7s ease, filter .7s ease",
          opacity: fading ? 0 : 1,
          filter: fading ? "blur(1px)" : "none",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "clamp(12px,2.2vw,24px)",
            padding: 24,
          }}
        >
          <img
            src="/logo.png"
            alt="Denzo Studios"
            style={{
              width: "clamp(120px,18vw,220px)",
              height: "auto",
              objectFit: "contain",
              opacity: 0,
              transform: "scale(0.9)",
              animation: "logoIn .6s .2s forwards ease",
            }}
          />

          <svg
            viewBox="0 0 1200 240"
            style={{ width: "min(90vw,1100px)", height: "auto", color: "#FFFFFF" }}
          >
            <text
              id="preloader-text"
              x="50%"
              y="55%"
              textAnchor="middle"
              dominantBaseline="middle"
              onAnimationEnd={(e) => {
                if ((e as unknown as AnimationEvent).animationName === "fillIn") {
                  setFading(true);
                  setTimeout(() => {
                    setVisible(false);
                    markDone();
                  }, FADE_OUT);
                }
              }}
              style={{
                fontFamily:
                  "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
                fontSize: "clamp(28px,7vw,96px)",
                fontWeight: 800,
                letterSpacing: ".02em",
                fill: "transparent",
                stroke: "#FFFFFF",
                strokeWidth: 2.2,
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeDasharray: 2000,
                strokeDashoffset: 2000,
                animation:
                  "draw 1.6s .3s ease-out forwards, fillIn .7s 1.9s ease forwards",
              }}
            >
              Results that matters!
            </text>
          </svg>
        </div>
      </div>
    </>
  );
}
