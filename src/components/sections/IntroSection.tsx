"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { SectionCard } from "@/components/motion/SectionCard";

/** Section 1 (INTRO): 150% enlarged centered Monoton sunset logo with subtle mouse 3D parallax. */
export function IntroSection() {
  const stageRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 120, damping: 22 });
  const springY = useSpring(mouseY, { stiffness: 120, damping: 22 });

  const rotateY = useTransform(springX, [-0.5, 0.5], [-6, 6]);
  const rotateX = useTransform(springY, [-0.5, 0.5], [5, -5]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = stageRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <SectionCard
      id="intro"
      zIndex={10}
      isFirst
      innerClassName="flex min-h-screen items-center justify-center"
    >
      <div
        ref={stageRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative flex w-full items-center justify-center py-12"
        style={{ perspective: "1200px" }}
      >
        {/* Warm Sunset Horizon Glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-1/2 h-[420px] w-[680px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-65 blur-[130px]"
          style={{
            background:
              "radial-gradient(circle, rgba(224,122,47,0.22) 0%, rgba(196,73,45,0.09) 50%, transparent 74%)",
          }}
        />

        <motion.h1
          initial={{ opacity: 0, y: 18, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          style={{ rotateX, rotateY }}
          className="relative z-10 flex flex-col items-center select-none text-center will-change-transform"
          aria-label="Maze featuring Frankie Beverly"
        >
          {/* Row 1: ~150% enlarged MAZE with small 'ft' tucked cleanly at lower-right */}
          <span className="relative inline-flex items-end leading-none">
            <span className="monoton-regular sunset-text text-[clamp(5rem,16vw,12.25rem)] tracking-[0.04em]">
              MAZE
            </span>
            <span
              className="monoton-regular sunset-text ml-2 mb-[0.15em] text-[clamp(1.5rem,4vw,3.1rem)] tracking-[0.06em] sm:ml-4"
              aria-label="featuring"
            >
              ft
            </span>
          </span>

          {/* Row 2: ~150% enlarged FRANKIE BEVERLY directly centered beneath */}
          <span className="monoton-regular sunset-text mt-1 text-[clamp(2rem,6vw,4.9rem)] leading-[1.12] tracking-[0.06em] sm:mt-2">
            FRANKIE BEVERLY
          </span>
        </motion.h1>
      </div>
    </SectionCard>
  );
}
