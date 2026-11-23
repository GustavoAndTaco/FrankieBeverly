"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface SectionCardProps {
  id: string;
  zIndex: number;
  isFirst?: boolean;
  isLast?: boolean;
  className?: string;
  innerClassName?: string;
  children: ReactNode;
}

/** Stacked card stage with dynamic tall-section sticky offset, scroll breathing gap, & GSAP curtain. */
export function SectionCard({
  id,
  zIndex,
  isFirst = false,
  isLast = false,
  className,
  innerClassName,
  children,
}: SectionCardProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const veilRef = useRef<HTMLDivElement>(null);
  const [stickyTop, setStickyTop] = useState<number | null>(null);

  // Dynamically compute sticky top so taller sections scroll fully into view before pinning
  useEffect(() => {
    if (isLast) return;
    const sectionEl = sectionRef.current;
    if (!sectionEl) return;

    const updateTop = () => {
      if (window.innerWidth < 1024) {
        setStickyTop(null);
        return;
      }
      const overflow = window.innerHeight - sectionEl.offsetHeight;
      setStickyTop(Math.min(0, overflow));
    };

    updateTop();
    const ro = new ResizeObserver(updateTop);
    ro.observe(sectionEl);
    window.addEventListener("resize", updateTop, { passive: true });
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", updateTop);
    };
  }, [isLast]);

  useGSAP(
    () => {
      const sectionEl = sectionRef.current;
      const contentEl = contentRef.current;
      const veilEl = veilRef.current;
      if (!sectionEl || !contentEl || isLast) return;

      const allCards = Array.from(
        document.querySelectorAll<HTMLElement>("section[data-section-id]"),
      );
      const currentIdx = allCards.indexOf(sectionEl);
      const nextCard = currentIdx >= 0 ? allCards[currentIdx + 1] : null;
      if (!nextCard) return;

      const mm = gsap.matchMedia();

      mm.add(
        "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        () => {
          gsap.fromTo(
            contentEl,
            { scale: 1, opacity: 1, y: 0 },
            {
              scale: 0.94,
              opacity: 0.25,
              y: -24,
              ease: "none",
              scrollTrigger: {
                trigger: nextCard,
                start: "top bottom",
                end: "top top",
                scrub: true,
              },
            },
          );

          if (veilEl) {
            gsap.fromTo(
              veilEl,
              { opacity: 0 },
              {
                opacity: 0.85,
                ease: "none",
                scrollTrigger: {
                  trigger: nextCard,
                  start: "top bottom",
                  end: "top top",
                  scrub: true,
                },
              },
            );
          }
        },
      );

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <>
      {/* Static normal-flow anchor marker so scroll positions stay accurate with sticky sections */}
      <div id={id} className="h-0 w-full" aria-hidden="true" />

      <section
        ref={sectionRef}
        data-section-id={id}
        style={{
          zIndex,
          ...(stickyTop !== null ? { top: `${stickyTop}px` } : {}),
        }}
        className={cn(
          "relative flex w-full flex-col justify-center bg-[#110E0C]",
          isLast ? "min-h-screen" : "min-h-screen lg:sticky lg:top-0",
          !isFirst &&
            "rounded-t-[28px] border-t border-white/[0.08] shadow-[0_-32px_96px_rgba(0,0,0,0.92)] sm:rounded-t-[36px]",
          className,
        )}
      >
        {/* Top Sunset Gradient Curtain Feather overlapping the previous card */}
        {!isFirst ? (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 -top-44 h-44"
            style={{
              background:
                "linear-gradient(180deg, rgba(17,14,12,0) 0%, rgba(244,185,66,0.08) 38%, rgba(224,122,47,0.22) 74%, #110E0C 100%)",
            }}
          />
        ) : null}

        {/* Subtle glowing sunset top rim */}
        {!isFirst ? (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-10 top-0 h-px opacity-55"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, #F4B942 35%, #E07A2F 65%, transparent 100%)",
            }}
          />
        ) : null}

        {/* Outgoing card sunset-dark scrim driven by GSAP ScrollTrigger */}
        {!isLast ? (
          <div
            ref={veilRef}
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-20 opacity-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(17,14,12,0.72) 0%, rgba(196,73,45,0.18) 55%, rgba(17,14,12,0.96) 100%)",
            }}
          />
        ) : null}

        {/* Safe viewport-filling container cleared from the 50% larger fixed LeftRadialMenu */}
        <div
          ref={contentRef}
          className={cn(
            "relative z-10 mx-auto w-full max-w-[1540px] px-5 pt-16 pb-16 sm:px-8 lg:py-16 lg:pr-10 lg:pl-[315px] xl:pr-14 xl:pl-[345px]",
            innerClassName,
          )}
        >
          {children}
        </div>
      </section>

      {/* Breathing scroll spacer between stacked cards so next section never overlaps prematurely */}
      {!isLast ? (
        <div
          aria-hidden="true"
          className="hidden h-[36vh] w-full bg-transparent lg:block"
        />
      ) : null}
    </>
  );
}
