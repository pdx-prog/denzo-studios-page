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
  const [animDone, setAnimDone] = useState(false);

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

  // Trigger fade when the text fill animation ends
  const handleFillEnd = () => {
    if (animDone) return;
    setAnimDone(true);
    setFading(true);
    setTimeout(() => {
      setVisible(false);
      markDone();
    }, FADE_OUT);
  };

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
        @keyframes textDraw {
          from { opacity: 0; letter-spacing: -.04em; }
          to   { opacity: 1; letter-spacing: .02em; }
        }
        @keyframes textReveal {
          from { clip-path: inset(0 100% 0 0); }
          to   { clip-path: inset(0 0% 0 0); }
        }
        @media (max-width: 767px) {
          #preloader-logo { width: 58vw !important; }
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
            gap: "clamp(16px,3vw,32px)",
            padding: "0 24px",
          }}
        >
          {/* Logo */}
          <img
            id="preloader-logo"
            src="/logo.png"
            alt="Denzo Studios"
            style={{
              width: "clamp(140px,22vw,240px)",
              height: "auto",
              objectFit: "contain",
              opacity: 0,
              transform: "scale(0.9)",
              animation: "logoIn .6s .2s forwards ease",
            }}
          />

          {/* Text block – plain HTML so font sizes are real viewport units */}
          <div
            style={{
              textAlign: "center",
              lineHeight: 1.1,
            }}
          >
            {/* Line 1 */}
            <div
              style={{
                fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
                fontSize: "clamp(36px, 10vw, 96px)",
                fontWeight: 800,
                color: "#FFFFFF",
                letterSpacing: ".02em",
                opacity: 0,
                animation: "textDraw .9s .3s ease-out forwards",
                whiteSpace: "nowrap",
              }}
            >
              Results that
            </div>

            {/* Line 2 – triggers fade on animation end */}
            <div
              style={{
                fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
                fontSize: "clamp(36px, 10vw, 96px)",
                fontWeight: 800,
                color: "#FFFFFF",
                letterSpacing: ".02em",
                opacity: 0,
                animation: "textDraw .9s .7s ease-out forwards",
                whiteSpace: "nowrap",
              }}
              onAnimationEnd={handleFillEnd}
            >
              matters!
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
