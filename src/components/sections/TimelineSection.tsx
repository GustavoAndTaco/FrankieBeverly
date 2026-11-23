"use client";

import { useState } from "react";
import Image from "next/image";
import { Disc3 } from "lucide-react";
import { SectionCard } from "@/components/motion/SectionCard";
import { Card } from "@/components/ui/card";
import { useAudioPlayer } from "@/context/AudioPlayerContext";
import {
  TIMELINE_MILESTONES,
  type TimelineMilestone,
} from "@/data/timeline";
import { cn } from "@/lib/utils";

function MilestoneBackdropPhoto({
  milestone,
  src,
}: {
  milestone: TimelineMilestone;
  src: string | null;
}) {
  const [failed, setFailed] = useState(false);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-0 right-0 w-[68%] overflow-hidden sm:w-[60%]"
    >
      {src && !failed ? (
        <Image
          src={src}
          alt={milestone.photoAlt ?? milestone.title}
          fill
          sizes="(max-width: 768px) 80vw, 480px"
          onError={() => setFailed(true)}
          className={cn(
            "object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]",
            milestone.id === "S4"
              ? "object-top grayscale-[18%] contrast-[1.06] opacity-70 group-hover:opacity-85"
              : milestone.id === "S1"
                ? "object-center grayscale-[20%] contrast-[1.08] opacity-75 group-hover:opacity-90"
                : "object-center opacity-55 contrast-[1.05] group-hover:opacity-75",
          )}
        />
      ) : (
        <div className="flex size-full items-center justify-end pr-8 opacity-20">
          <Disc3 className="size-36 text-[#F4B942]" />
        </div>
      )}

      {/* Multi-directional dark fade so left text stays crisp & borders vanish seamlessly */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, #181412 0%, rgba(24,20,18,0.92) 22%, rgba(24,20,18,0.42) 62%, rgba(24,20,18,0.18) 100%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(24,20,18,0.55) 0%, transparent 25%, transparent 70%, rgba(24,20,18,0.75) 100%)",
        }}
      />
    </div>
  );
}

/** Section 2 (ABOUT MAZE): Enlarged 2x2 Bento Timeline with A-style integrated era photos. */
export function TimelineSection() {
  const { mediaMap } = useAudioPlayer();

  return (
    <SectionCard id="about-maze" zIndex={20} innerClassName="py-16 lg:py-20">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {TIMELINE_MILESTONES.map((milestone) => {
          const resolvedSrc =
            milestone.photoSrc ??
            (milestone.albumIdForArt
              ? (mediaMap[milestone.albumIdForArt]?.artworkUrl ?? null)
              : null);

          return (
            <Card
              key={milestone.id}
              className="group relative min-h-[340px] justify-between overflow-hidden p-7 transition-all duration-300 hover:-translate-y-1 hover:border-white/25 sm:min-h-[390px] sm:p-9 lg:min-h-[430px] lg:p-10"
            >
              <MilestoneBackdropPhoto
                milestone={milestone}
                src={resolvedSrc}
              />

              <div className="relative z-10 flex h-full max-w-[66%] flex-col justify-between sm:max-w-[60%]">
                <div>
                  <span className="font-display text-xl tracking-[0.14em] text-[#F4B942] sm:text-2xl">
                    {milestone.era}
                  </span>

                  <h2 className="mt-2 font-sans text-2xl font-extrabold tracking-tight text-[#FFF3D1] sm:text-3xl lg:text-[34px]">
                    {milestone.title}
                  </h2>
                </div>

                <p className="mt-6 font-sans text-base leading-relaxed text-foreground/88 drop-shadow-[0_2px_10px_rgba(17,14,12,0.9)] sm:text-[17px]">
                  {milestone.summary}
                </p>
              </div>
            </Card>
          );
        })}
      </div>
    </SectionCard>
  );
}
