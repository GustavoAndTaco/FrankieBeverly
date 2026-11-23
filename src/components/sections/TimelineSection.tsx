"use client";

import Image from "next/image";
import { Disc3 } from "lucide-react";
import { SectionCard } from "@/components/motion/SectionCard";
import { Card } from "@/components/ui/card";
import { useAudioPlayer } from "@/context/AudioPlayerContext";
import {
  TIMELINE_MILESTONES,
  type TimelineMilestone,
} from "@/data/timeline";

function MilestoneVisual({
  milestone,
  artworkUrl,
}: {
  milestone: TimelineMilestone;
  artworkUrl: string | null;
}) {
  if (milestone.visualVariant === "origins") {
    return (
      <div className="relative h-28 w-48 overflow-hidden rounded-xl border border-white/12 bg-[#120E0C] p-3.5 shadow-xl rotate-[-2deg] transition-transform duration-300 group-hover:rotate-0 sm:h-32 sm:w-52">
        <div className="flex items-center justify-between font-mono text-[11px] font-medium text-[#F4B942]">
          <span>PHL 1963</span>
          <span>→</span>
          <span>SF 1976</span>
        </div>
        <div className="mt-3 space-y-2">
          <div className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1.5 text-xs text-foreground/85">
            <span className="font-bold">The Butlers</span>
            <span className="font-mono text-[10px] text-muted-foreground">60s</span>
          </div>
          <div className="flex items-center justify-between rounded-lg border border-[#E07A2F]/40 bg-[#E07A2F]/15 px-2.5 py-1.5 text-xs font-bold text-[#FFF3D1]">
            <span>Raw Soul → Maze</span>
            <span className="font-mono text-[10px] text-[#F4B942]">76</span>
          </div>
        </div>
      </div>
    );
  }

  if (milestone.visualVariant === "golden" || milestone.visualVariant === "warner") {
    const fallbackLabel =
      milestone.visualVariant === "golden"
        ? "Live in New Orleans"
        : "Silky Soul";
    return (
      <div className="relative flex h-28 w-48 items-end justify-between overflow-hidden rounded-xl border border-white/12 bg-[#120E0C] p-3 shadow-xl rotate-[2deg] transition-transform duration-300 group-hover:rotate-0 sm:h-32 sm:w-52">
        {/* Vinyl peeking behind sleeve */}
        <div
          aria-hidden="true"
          className="absolute -top-5 right-3 size-28 rounded-full border border-white/15 bg-[repeating-radial-gradient(circle,#171412_0px,#171412_3px,#0D0B0A_4px,#0D0B0A_5px)]"
        >
          <span className="absolute top-1/2 left-1/2 size-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#E07A2F]" />
        </div>

        <div className="relative z-10 size-20 overflow-hidden rounded-lg border border-white/15 bg-[#1D1714] shadow-md sm:size-24">
          {artworkUrl ? (
            <Image
              src={artworkUrl}
              alt={fallbackLabel}
              fill
              sizes="96px"
              className="object-cover"
            />
          ) : (
            <div className="flex size-full flex-col items-center justify-center p-2 text-center">
              <Disc3 className="size-6 text-[#F4B942]" />
              <span className="mt-1 font-serif text-xs leading-tight text-foreground">
                {fallbackLabel}
              </span>
            </div>
          )}
        </div>

        <span className="relative z-10 font-mono text-[10px] text-muted-foreground">
          {milestone.visualVariant === "golden" ? "Capitol" : "Warner"}
        </span>
      </div>
    );
  }

  // Legacy card (S4)
  return (
    <div className="relative flex h-28 w-48 flex-col justify-between overflow-hidden rounded-xl border border-[#FAF8F5]/30 bg-[#FAF8F5] p-3.5 text-[#181310] shadow-xl rotate-[-1.5deg] transition-transform duration-300 group-hover:rotate-0 sm:h-32 sm:w-52">
      <div className="flex items-center justify-between font-mono text-[10px] font-semibold tracking-wider text-[#8C6A4A]">
        <span>ALL-WHITE LEGACY</span>
        <span>1946–2024</span>
      </div>
      <div>
        <p className="font-serif text-lg font-bold leading-tight text-[#181310] sm:text-xl">
          I Wanna Thank You
        </p>
        <p className="mt-0.5 text-[11px] font-medium text-[#6E6257]">
          Forever Frankie Beverly
        </p>
      </div>
    </div>
  );
}

/** Section 2 (ABOUT MAZE): Full-canvas 2x2 Bento Timeline with zero cluttered headers. */
export function TimelineSection() {
  const { mediaMap } = useAudioPlayer();

  return (
    <SectionCard id="about-maze" zIndex={20}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-5">
        {TIMELINE_MILESTONES.map((milestone) => {
          const artworkUrl = milestone.albumIdForArt
            ? (mediaMap[milestone.albumIdForArt]?.artworkUrl ?? null)
            : null;

          return (
            <Card
              key={milestone.id}
              className="group relative min-h-[275px] justify-between overflow-hidden p-7 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 sm:p-9 lg:min-h-[330px]"
            >
              <div>
                <span className="font-mono text-xs font-medium tracking-widest text-[#F4B942]">
                  {milestone.era}
                </span>

                <h2 className="mt-2.5 font-sans text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl lg:text-[32px]">
                  {milestone.title}
                </h2>

                <p className="mt-3 text-base leading-relaxed text-muted-foreground sm:text-[17px]">
                  {milestone.summary}
                </p>
              </div>

              <div className="mt-6 flex justify-end">
                <MilestoneVisual
                  milestone={milestone}
                  artworkUrl={artworkUrl}
                />
              </div>
            </Card>
          );
        })}
      </div>
    </SectionCard>
  );
}
