"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export const MENU_SECTIONS = [
  { id: "intro", label: "INTRO" },
  { id: "about-maze", label: "ABOUT MAZE" },
  { id: "discography", label: "DISCOGRAPHY" },
  { id: "recommends", label: "RECOMMENDS" },
  { id: "live", label: "LIVE" },
  { id: "outro", label: "OUTRO" },
] as const;

/** Fixed left radial rolling menu modeled directly after menu-motion.json. */
export function LeftRadialMenu() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    let rafId = 0;

    const handleScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const viewportH = window.innerHeight;
        const triggerY = scrollY + viewportH * 0.38;

        // If scrolled all the way to the bottom, activate OUTRO
        if (
          scrollY + viewportH >=
          document.documentElement.scrollHeight - 40
        ) {
          setActiveIndex(MENU_SECTIONS.length - 1);
          return;
        }

        let nextIdx = 0;
        MENU_SECTIONS.forEach((sec, idx) => {
          const el = document.getElementById(sec.id);
          if (el && el.offsetTop <= triggerY) {
            nextIdx = idx;
          }
        });
        setActiveIndex(nextIdx);
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const scrollToSection = (index: number) => {
    const target = MENU_SECTIONS[index];
    if (!target) return;
    const el = document.getElementById(target.id);
    if (el) {
      window.scrollTo({
        top: el.offsetTop,
        behavior: "smooth",
      });
    }
    setActiveIndex(index);
    setMobileOpen(false);
  };

  return (
    <>
      {/* Desktop Fixed Left Radial Wheel (lg+) */}
      <aside
        aria-label="섹션 내비게이션"
        className="pointer-events-none fixed top-1/2 left-0 z-50 hidden h-[360px] w-[245px] -translate-y-1/2 select-none lg:flex lg:items-center"
      >
        {/* Soft left atmospheric gradient backdrop so menu stays crisp over any section */}
        <div
          aria-hidden="true"
          className="absolute inset-y-0 -left-4 w-[240px] bg-gradient-to-r from-[#110E0C]/80 via-[#110E0C]/35 to-transparent"
        />

        {/* Sunset Gradient Glowing Indicator Dot (matching menu-motion.json Accent-color) */}
        <div
          aria-hidden="true"
          className="relative z-20 ml-6 size-3.5 shrink-0 rounded-full shadow-[0_0_18px_rgba(255,89,0,0.65)]"
          style={{
            background:
              "linear-gradient(180deg, #FDF6C8 0%, #FEA864 50%, #FF5900 100%)",
          }}
        />

        {/* Curved Rolling Text Dial */}
        <nav className="pointer-events-auto relative ml-4 h-[320px] flex-1">
          {MENU_SECTIONS.map((sec, idx) => {
            const offset = idx - activeIndex;
            const absOffset = Math.abs(offset);
            const isActive = offset === 0;
            const isHovered = hoveredIndex === idx;

            // Curved radial arc parameters mirrored from menu-motion.json
            const angle = offset * 8.5;
            const yOffset = offset * 39;
            const blurPx = isActive || isHovered ? 0 : Math.min(2.6, absOffset * 0.75);
            const opacity = isActive
              ? 1
              : isHovered
                ? 0.95
                : Math.max(0.18, 0.72 - absOffset * 0.2);

            return (
              <motion.button
                key={sec.id}
                type="button"
                onClick={() => scrollToSection(idx)}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                initial={false}
                animate={{
                  y: yOffset,
                  rotate: angle,
                  opacity,
                  scale: isActive ? 1.05 : isHovered ? 1.02 : 0.96,
                  filter: `blur(${blurPx}px)`,
                }}
                transition={{
                  type: "spring",
                  stiffness: 230,
                  damping: 26,
                  mass: 0.75,
                }}
                style={{
                  transformOrigin: "-190px 50%",
                }}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "absolute top-1/2 left-0 -translate-y-1/2 cursor-pointer whitespace-nowrap text-left font-sans text-[13px] tracking-[0.12em] uppercase transition-colors outline-none focus-visible:text-[#FFF3D1]",
                  isActive
                    ? "font-extrabold text-[#FFF3D1] drop-shadow-[0_0_12px_rgba(244,185,66,0.35)]"
                    : "font-bold text-white/85 hover:text-[#FFF3D1]",
                )}
              >
                {sec.label}
              </motion.button>
            );
          })}
        </nav>
      </aside>

      {/* Mobile Floating Compact Menu Trigger & Drawer (< lg) */}
      <div className="fixed top-4 left-4 z-50 lg:hidden">
        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-expanded={mobileOpen}
          aria-label="섹션 메뉴 열기"
          className="inline-flex cursor-pointer items-center gap-2.5 rounded-full border border-white/15 bg-[#181412]/90 px-3.5 py-2 text-xs font-bold tracking-[0.14em] text-[#FFF3D1] uppercase shadow-lg backdrop-blur-md"
        >
          <span
            aria-hidden="true"
            className="size-2.5 rounded-full"
            style={{
              background:
                "linear-gradient(180deg, #FDF6C8 0%, #FEA864 50%, #FF5900 100%)",
            }}
          />
          <span>{MENU_SECTIONS[activeIndex]?.label}</span>
          {mobileOpen ? (
            <X className="size-3.5 text-muted-foreground" />
          ) : (
            <Menu className="size-3.5 text-muted-foreground" />
          )}
        </button>

        <AnimatePresence>
          {mobileOpen ? (
            <motion.nav
              initial={{ opacity: 0, y: -8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.96 }}
              transition={{ duration: 0.18 }}
              aria-label="모바일 섹션 메뉴"
              className="mt-2 w-52 rounded-2xl border border-white/15 bg-[#161210]/95 p-2 shadow-2xl backdrop-blur-lg"
            >
              {MENU_SECTIONS.map((sec, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <button
                    key={sec.id}
                    type="button"
                    onClick={() => scrollToSection(idx)}
                    className={cn(
                      "flex w-full cursor-pointer items-center gap-2.5 rounded-xl px-3 py-2 text-left text-xs font-bold tracking-[0.12em] uppercase transition-colors",
                      isActive
                        ? "bg-[#E07A2F]/20 text-[#FFF3D1]"
                        : "text-muted-foreground hover:bg-white/[0.05] hover:text-foreground",
                    )}
                  >
                    <span
                      className={cn(
                        "size-1.5 rounded-full",
                        isActive ? "bg-[#FF5900]" : "bg-white/25",
                      )}
                    />
                    {sec.label}
                  </button>
                );
              })}
            </motion.nav>
          ) : null}
        </AnimatePresence>
      </div>
    </>
  );
}
