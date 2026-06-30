"use client";

import React, { useEffect, useRef } from "react";
import { CheckCircle2, Target, BarChart3 } from "lucide-react";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Height of a "tab" row (the visible strip of a back card)
const TAB_H = 88;

// Extra continuous upward drift applied to the whole stack per card entrance,
// so the section never feels "frozen" once a card settles into its tab slot.
const DRIFT_PER_STEP = 50;

export default function AboutStack() {
  const tTriple  = useTranslations("Home.TripleGrowth");
  const tTech    = useTranslations("Home.TechDNA");
  const outerRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);

  const cards = [
    {
      id: "roi",
      accentColor: "#007AFF",
      iconColor: "text-[#007AFF]",
      iconBg: "bg-[#007AFF]/10 border-[#007AFF]/20",
      icon: <CheckCircle2 />,
      label: "01",
      bg: "bg-[#F5F5F7]/80 dark:bg-white/[0.04]",
      title: (
        <span className="bg-gradient-to-r from-[#007AFF] to-[#7AB6FF] text-transparent bg-clip-text">
          {tTriple("roi_title")}
        </span>
      ),
      body: [tTriple("roi_1"), tTriple("roi_2"), tTriple("roi_3")],
    },
    {
      id: "strategy",
      accentColor: "#BF5AF2",
      iconColor: "text-[#BF5AF2]",
      iconBg: "bg-[#BF5AF2]/10 border-[#BF5AF2]/20",
      icon: <Target />,
      label: "02",
      bg: "bg-[#F5F5F7]/80 dark:bg-white/[0.04]",
      title: (
        <span className="bg-gradient-to-r from-[#BF5AF2] to-[#E2B3FB] text-transparent bg-clip-text">
          {tTriple("strategy_title")}
        </span>
      ),
      body: [tTriple("strategy_1"), tTriple("strategy_2"), tTriple("strategy_3")],
    },
    {
      id: "reporting",
      accentColor: "#FF9500",
      iconColor: "text-[#FF9500]",
      iconBg: "bg-[#FF9500]/10 border-[#FF9500]/20",
      icon: <BarChart3 />,
      label: "03",
      bg: "bg-[#F5F5F7]/80 dark:bg-white/[0.04]",
      title: (
        <span className="bg-gradient-to-r from-[#FF9500] to-[#FFC566] text-transparent bg-clip-text">
          {tTriple("reporting_title")}
        </span>
      ),
      body: [tTriple("reporting_1"), tTriple("reporting_2"), tTriple("reporting_3")],
    },
    {
      id: "tech",
      accentColor: "#007AFF",
      iconColor: "text-[#007AFF]",
      iconBg: "bg-[#007AFF]/10 border-[#B3D4FF]/40",
      icon: null,
      label: "04",
      bg: "bg-[#EAF2FF]/90 dark:bg-[#007AFF]/[0.06]",
      title: (
        <>
          <span className="text-black dark:text-white">{tTech("headline1")}</span>{" "}
          <span className="text-black dark:text-white">{tTech("headline2")}</span>{" "}
          <span className="bg-gradient-to-r from-[#007AFF] to-[#7AB6FF] text-transparent bg-clip-text">
            {tTech("headline3")}
          </span>
        </>
      ),
      body: null,
    },
  ];

  const n = cards.length;

  useEffect(() => {
    if (typeof window === "undefined" || window.innerWidth < 1024) return;
    const outer = outerRef.current;
    const stack = stackRef.current;
    if (!outer || !stack) return;

    const cardEls = Array.from(stack.querySelectorAll<HTMLElement>(".abt-card"));

    const getCardH = () => Math.round(window.innerHeight * 0.82);

    /**
     * Office-folder stacking: each card's resting position is fixed forever
     * at index*TAB_H — it never moves again once it arrives. Card 0 starts
     * already in place. Cards 1..n-1 begin hidden below the stack (clipped
     * by overflow-hidden) and slide up into their resting slot one at a
     * time, each with a higher z-index than the last, so arriving cards
     * cover earlier ones and leave only their tab strip visible.
     */
    const restTop = (i: number) => i * TAB_H;

    const applyState = (entering: number, p = 0) => {
      const CARD_H = getCardH();
      const hiddenTop = (n - 1) * TAB_H + CARD_H; // below the visible stack area

      cardEls.forEach((el, i) => {
        let top: number;
        if (i === 0) {
          top = 0;
        } else if (i < entering) {
          top = restTop(i); // already settled
        } else if (i === entering) {
          top = hiddenTop + (restTop(i) - hiddenTop) * p; // sliding up into place
        } else {
          top = hiddenTop; // waiting off-screen below
        }

        gsap.set(el, { top, zIndex: i + 1 });
      });
    };

    // Set initial positions: only card 0 visible, card 1 about to enter
    applyState(1, 0);

    // One ScrollTrigger per entrance (cards 1..n-1)
    const triggers: ScrollTrigger[] = [];
    for (let i = 1; i < n; i++) {
      const t = ScrollTrigger.create({
        trigger: outer,
        start: () => `top+=${(i - 1) * window.innerHeight} top`,
        end:   () => `top+=${i       * window.innerHeight} top`,
        scrub: true,
        onUpdate(self) {
          applyState(i, self.progress);
        },
        invalidateOnRefresh: true,
      });
      triggers.push(t);
    }

    // Continuous drift across the whole pin (entrances + the leftover hold
    // viewport at the end), eased so it never freezes — it keeps creeping up
    // while cards are still stacking in — but most of the travel is saved
    // for the end, so the group reads as fully formed before it tucks in
    // behind the navbar instead of sliding under it mid-stack.
    const driftTotal = DRIFT_PER_STEP * n;
    const driftTrigger = ScrollTrigger.create({
      trigger: outer,
      start: "top top",
      end: () => `top+=${n * window.innerHeight} top`,
      scrub: true,
      onUpdate(self) {
        const eased = self.progress ** 3;
        gsap.set(stack, { y: -driftTotal * eased });
      },
      invalidateOnRefresh: true,
    });
    triggers.push(driftTrigger);

    return () => {
      triggers.forEach((t) => t.kill());
      gsap.set(stack, { clearProps: "y" });
      cardEls.forEach((el) => {
        gsap.set(el, { clearProps: "all" });
      });
    };
  }, [n]);

  /* ── card renderer ── */
  const renderCard = (card: typeof cards[number], absolute: boolean) => (
    <div
      key={card.id}
      className={`abt-card ${absolute ? "absolute left-0 right-0" : "relative mb-5"}
        overflow-hidden rounded-[3rem] backdrop-blur-xl
        border border-black/10 dark:border-white/5
        ${card.id === "tech" ? "!border-[#B3D4FF]/50 dark:!border-blue-700/30" : ""}
        shadow-[0_24px_80px_rgba(0,0,0,0.12)] dark:shadow-[0_24px_80px_rgba(0,0,0,0.4)]
        ${card.bg}`}
    >
      {/* Accent glow — gives the glass background some color instead of a flat tint */}
      <div
        className="pointer-events-none absolute -top-24 -right-24 w-80 h-80 rounded-full blur-3xl opacity-30 dark:opacity-25"
        style={{ background: card.accentColor }}
      />

      {/* Color accent strip */}
      <div
        className="h-[4px] w-full flex-shrink-0"
        style={{ background: `linear-gradient(to right, ${card.accentColor}, transparent 60%)` }}
      />

      {/* Tab row — always readable even when card is "behind" */}
      <div
        className="flex items-center justify-between gap-4 px-12 md:px-20"
        style={{ height: TAB_H - 4 }}
      >
        <div className="flex items-center gap-4 min-w-0">
          {card.icon && (
            <div className={`w-12 h-12 rounded-2xl ${card.iconBg} border flex items-center justify-center flex-shrink-0`}>
              {React.cloneElement(card.icon as React.ReactElement<any>, {
                className: `w-6 h-6 ${card.iconColor}`,
              })}
            </div>
          )}
          {card.id === "tech" && (
            <div className="inline-flex items-center px-3 py-1 bg-white dark:bg-blue-900/20 border border-[#B3D4FF] dark:border-blue-700/30 rounded-full flex-shrink-0">
              <span className="text-[#007AFF] dark:text-[#7AB6FF] text-[8px] font-bold uppercase tracking-[0.35em] whitespace-nowrap">
                {tTech("badge")}
              </span>
            </div>
          )}
          <h3 className="text-xl md:text-2xl font-bold tracking-tight leading-none truncate">
            {card.title}
          </h3>
        </div>
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-black/20 dark:text-white/20 flex-shrink-0">
          {card.label}
        </span>
      </div>

      {/* Full content (only legible when card is at the front) */}
      <div className="px-12 md:px-20 pb-20 pt-8">
        {card.body && (
          <ul className="space-y-6 md:space-y-8">
            {card.body.map((point, idx) => (
              <li
                key={idx}
                className="flex items-start gap-5 text-black/70 dark:text-white/70 text-xl md:text-2xl font-light tracking-tight leading-relaxed"
              >
                <div
                  className="w-2.5 h-2.5 rounded-full mt-[13px] md:mt-[16px] shrink-0"
                  style={{ backgroundColor: card.accentColor }}
                />
                {point}
              </li>
            ))}
          </ul>
        )}
        {card.id === "tech" && (
          <>
            <p className="text-xl md:text-2xl text-black/60 dark:text-white/40 font-light mb-12 leading-relaxed max-w-4xl">
              {tTech("description")}
            </p>
            <div className="grid grid-cols-3 gap-4 max-w-2xl">
              {[
                { label: tTech("tech1"), cls: "bg-[#00f0ff]", glow: "shadow-[0_0_10px_#00f0ff]" },
                { label: tTech("tech2"), cls: "bg-[#7a00ff]", glow: "shadow-[0_0_10px_#7a00ff]" },
                { label: tTech("tech3"), cls: "bg-[#ff00a0]", glow: "shadow-[0_0_10px_#ff00a0]" },
              ].map((tech) => (
                <div
                  key={tech.label}
                  className="flex flex-col items-center gap-3 bg-white/60 dark:bg-white/5 p-4 rounded-2xl border border-black/5 dark:border-white/5 text-[11px] font-bold tracking-widest uppercase text-black/70 dark:text-white/60 text-center"
                >
                  <div className={`w-1.5 h-1.5 rounded-full ${tech.cls} ${tech.glow}`} />
                  {tech.label}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );

  return (
    <section className="relative py-24 md:py-32">
      {/* Ambient backdrop glow so the section reads as part of the site's
          aurora vibe instead of a flat white/black slab behind the cards. */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[70vw] h-[70vw] max-w-225 max-h-225 rounded-full opacity-[0.16] dark:opacity-[0.14] blur-[140px]"
          style={{ background: "radial-gradient(circle, #007AFF, transparent 70%)" }}
        />
        <div
          className="absolute bottom-0 right-0 w-[50vw] h-[50vw] max-w-175 max-h-175 rounded-full opacity-[0.14] dark:opacity-[0.12] blur-[140px]"
          style={{ background: "radial-gradient(circle, #BF5AF2, transparent 70%)" }}
        />
      </div>

      {/* ── Desktop: tall outer + CSS sticky ── */}
      <div
        ref={outerRef}
        className="hidden lg:block"
        /* n scroll steps = n * 100vh of scrollable space */
        style={{ height: `${n * 100}vh` }}
      >
        <div
          className="sticky top-0 flex items-start pt-32 px-4 sm:px-6 lg:px-8 max-w-450 mx-auto w-full"
          style={{ height: "100vh" }}
        >
          {/*
            Stack container height is always:
              front-card-height + (n-1) tabs
            This never changes, so it always looks like a compact folder group.
          */}
          <div
            ref={stackRef}
            className="relative w-full overflow-hidden"
            style={{ height: `calc(86vh + ${(n - 1) * TAB_H}px)` }}
          >
            {cards.map((card) => renderCard(card, true))}
          </div>
        </div>
      </div>

      {/* ── Mobile: normal vertical list ── */}
      <div className="flex lg:hidden flex-col px-4 sm:px-6">
        {cards.map((card) => renderCard(card, false))}
      </div>

    </section>
  );
}
