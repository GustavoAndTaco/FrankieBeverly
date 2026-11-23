"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { ExternalLink, Pause, Play } from "lucide-react";
import { useAudioPlayer } from "@/context/AudioPlayerContext";
import { ALBUMS, type AlbumItem } from "@/data/albums";
import { cn } from "@/lib/utils";

/** 3D tactile Vinyl LP disc that rises upward from the selected album cover and spins. */
function VinylDisc3D({
  album,
  isPlaying,
}: {
  album: AlbumItem;
  isPlaying: boolean;
}) {
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const springTiltX = useSpring(tiltX, { stiffness: 180, damping: 20 });
  const springTiltY = useSpring(tiltY, { stiffness: 180, damping: 20 });
  const rotateX = useTransform(springTiltY, [-0.5, 0.5], [14, -14]);
  const rotateY = useTransform(springTiltX, [-0.5, 0.5], [-16, 16]);

  return (
    <motion.div
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        tiltX.set((e.clientX - rect.left) / rect.width - 0.5);
        tiltY.set((e.clientY - rect.top) / rect.height - 0.5);
      }}
      onMouseLeave={() => {
        tiltX.set(0);
        tiltY.set(0);
      }}
      style={{
        perspective: "900px",
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="relative size-[170px] sm:size-[205px] lg:size-[225px]"
    >
      {/* 3D Thickness Rim Shadow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 translate-y-1.5 rounded-full bg-black/75 blur-[3px]"
      />

      {/* Main Spinning Vinyl Platter */}
      <div
        className={cn(
          "relative size-full rounded-full border border-white/20 shadow-[0_22px_45px_rgba(0,0,0,0.85),inset_0_1px_3px_rgba(255,255,255,0.22)]",
          isPlaying ? "animate-vinyl-spin" : "animate-vinyl-spin-paused",
        )}
        style={{
          background:
            "repeating-radial-gradient(circle, #191513 0px, #191513 2.5px, #0C0A09 3.5px, #0C0A09 6px)",
        }}
      >
        {/* Dynamic Light Sheen */}
        <div
          aria-hidden="true"
          className="absolute inset-0 rounded-full opacity-40"
          style={{
            background:
              "conic-gradient(from 35deg, transparent 0deg, rgba(255,243,209,0.42) 32deg, transparent 68deg, transparent 180deg, rgba(224,122,47,0.3) 215deg, transparent 255deg)",
          }}
        />

        {/* Beveled Inner Groove Ring */}
        <div
          aria-hidden="true"
          className="absolute inset-[14%] rounded-full border border-white/[0.06]"
        />

        {/* Center Label */}
        <div
          className="absolute top-1/2 left-1/2 flex size-[38%] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border-2 border-black/40 p-2 text-center shadow-[inset_0_2px_6px_rgba(255,255,255,0.25)]"
          style={{ backgroundColor: album.vinylLabelColor }}
        >
          <span className="font-mono text-[8px] font-bold tracking-widest text-[#FFF3D1]/90 uppercase sm:text-[9px]">
            {album.year}
          </span>
          {/* Metallic 3D Spindle Pin */}
          <span className="my-1 size-3 rounded-full border border-[#FFF3D1]/60 bg-gradient-to-br from-[#FFF3D1] via-[#8C6A4A] to-[#181310] shadow-sm" />
          <span className="max-w-full truncate font-sans text-[7px] font-bold text-[#FFF3D1]/85 sm:text-[8px]">
            MAZE
          </span>
        </div>
      </div>
    </motion.div>
  );
}

/** Mouse-reactive 3D angled vinyl crate selector modeled on vinyl-selector.riv + user sketch. */
export function VinylSelector3D() {
  const { mediaMap, currentAlbumId, isPlaying, playAlbum } = useAudioPlayer();
  const [selectedIndex, setSelectedIndex] = useState<number>(7); // Default highlight: Silky Soul (1989)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const selectedAlbum = ALBUMS[selectedIndex];
  const isCurrentPlaying = currentAlbumId === selectedAlbum.id && isPlaying;

  // Prefetch all 9 covers once mediaMap arrives so the entire 9-album crate looks crisp immediately
  useEffect(() => {
    ALBUMS.forEach((album) => {
      const url = mediaMap[album.id]?.artworkUrl;
      if (url && typeof window !== "undefined") {
        const img = new window.Image();
        img.src = url;
      }
    });
  }, [mediaMap]);

  const handleSelectAlbum = useCallback(
    (idx: number) => {
      const album = ALBUMS[idx];
      if (!album) return;
      setSelectedIndex(idx);
      playAlbum(album.id);
    },
    [playAlbum],
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      const next = Math.min(ALBUMS.length - 1, selectedIndex + 1);
      setSelectedIndex(next);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      const prev = Math.max(0, selectedIndex - 1);
      setSelectedIndex(prev);
    }
  };

  const floatOnLeftSide = selectedIndex >= 6;

  return (
    <div
      tabIndex={0}
      onKeyDown={handleKeyDown}
      aria-label="3D 바이닐 셀렉터 (마우스로 탐색하고 클릭하여 재생)"
      className="relative flex min-h-[76vh] w-full flex-col justify-between outline-none"
    >
      {/* Upper Showcase Stage: Rising 3D LP + Floating Mid-Air Description */}
      <div className="relative flex min-h-[300px] w-full items-center justify-center sm:min-h-[340px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedAlbum.id}
            initial={{ opacity: 0, y: 42, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.94 }}
            transition={{ type: "spring", stiffness: 210, damping: 24 }}
            className={cn(
              "relative flex w-full max-w-[920px] flex-col items-center justify-center gap-6 sm:gap-10 md:flex-row",
              floatOnLeftSide ? "md:flex-row-reverse" : "md:flex-row",
            )}
          >
            {/* 3D Vinyl LP emerging upward from the album crate */}
            <button
              type="button"
              onClick={() => playAlbum(selectedAlbum.id)}
              aria-label={
                isCurrentPlaying
                  ? `${selectedAlbum.featuredTrack} 일시정지`
                  : `${selectedAlbum.featuredTrack} 재생`
              }
              className="group relative shrink-0 cursor-pointer outline-none"
            >
              <VinylDisc3D album={selectedAlbum} isPlaying={isCurrentPlaying} />
            </button>

            {/* Mid-Air Floating Compact Description (No Box Card — pure floating typography + curved pointer) */}
            <motion.div
              initial={{ opacity: 0, x: floatOnLeftSide ? -18 : 18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.08, duration: 0.35 }}
              className="animate-float-gentle relative max-w-[400px] text-center md:text-left"
            >
              {/* Delicate curved pointer line matching the user sketch */}
              <svg
                aria-hidden="true"
                viewBox="0 0 64 32"
                className={cn(
                  "mb-1 hidden h-6 w-12 text-[#F4B942]/80 md:block",
                  floatOnLeftSide ? "ml-auto -scale-x-100" : "-ml-8",
                )}
                fill="none"
              >
                <path
                  d="M4 26 C 20 8, 40 6, 58 14"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeDasharray="3 3"
                />
                <path
                  d="M52 9 L 59 14 L 51 18"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <p className="font-mono text-xs font-medium tracking-[0.18em] text-[#F4B942]">
                {selectedAlbum.approxRelease}
              </p>

              <h3 className="mt-1 font-sans text-2xl font-extrabold tracking-tight text-[#FFF3D1] drop-shadow-[0_6px_24px_rgba(0,0,0,0.85)] sm:text-3xl lg:text-[34px]">
                {selectedAlbum.title}
              </h3>

              <p className="mt-2.5 font-sans text-sm leading-relaxed text-foreground/88 drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] sm:text-base">
                {selectedAlbum.shortDescription}
              </p>

              <div className="mt-4 flex flex-wrap items-center justify-center gap-3 md:justify-start">
                <button
                  type="button"
                  onClick={() => playAlbum(selectedAlbum.id)}
                  className="sunset-bg inline-flex cursor-pointer items-center gap-2 rounded-full px-4 py-2 font-sans text-xs font-extrabold text-[#110E0C] shadow-[0_6px_24px_rgba(224,122,47,0.35)] transition-transform hover:scale-[1.03] active:scale-[0.98]"
                >
                  {isCurrentPlaying ? (
                    <>
                      <Pause className="size-3.5 fill-current" />
                      {selectedAlbum.featuredTrack}
                    </>
                  ) : (
                    <>
                      <Play className="size-3.5 fill-current" />
                      {selectedAlbum.featuredTrack}
                    </>
                  )}
                </button>

                <a
                  href={selectedAlbum.spotifySearchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-mono text-[11px] text-muted-foreground transition-colors hover:text-[#FFF3D1]"
                >
                  Spotify
                  <ExternalLink className="size-3" />
                </a>
                <a
                  href={selectedAlbum.youtubeSearchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-mono text-[11px] text-muted-foreground transition-colors hover:text-[#FFF3D1]"
                >
                  YouTube
                  <ExternalLink className="size-3" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom 9 Angled 3D Vinyl Sleeves Rack (Rive-style mouse wave crate) */}
      <div className="mt-8 w-full">
        <div
          onMouseLeave={() => setHoveredIndex(null)}
          style={{ perspective: "1500px" }}
          className="flex items-end justify-start overflow-x-auto px-4 pt-12 pb-6 sm:justify-center sm:overflow-visible"
        >
          <div className="flex items-end">
            {ALBUMS.map((album, idx) => {
              const artworkUrl = mediaMap[album.id]?.artworkUrl ?? null;
              const isSelected = idx === selectedIndex;
              const isHovered = idx === hoveredIndex;

              // Spread neighboring sleeves smoothly around hovered/selected record
              const focusIdx = hoveredIndex ?? selectedIndex;
              const delta = idx - focusIdx;
              const spreadX =
                delta === 0 ? 0 : delta < 0 ? -14 : 18;
              const rotateY = isSelected ? -8 : isHovered ? -14 : -34;
              const liftY = isSelected ? -34 : isHovered ? -18 : 0;

              return (
                <motion.button
                  key={album.id}
                  type="button"
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onClick={() => handleSelectAlbum(idx)}
                  aria-label={`${album.title} (${album.year}) 선택 및 재생`}
                  aria-pressed={isSelected}
                  initial={false}
                  animate={{
                    y: liftY,
                    x: spreadX,
                    rotateY,
                    scale: isSelected ? 1.12 : isHovered ? 1.05 : 1,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 22,
                  }}
                  style={{
                    transformStyle: "preserve-3d",
                    zIndex: isSelected ? 30 : isHovered ? 20 : 10 + idx,
                  }}
                  className={cn(
                    "relative -ml-7 aspect-square w-[112px] shrink-0 cursor-pointer overflow-hidden rounded-xl border bg-[#1A1512] shadow-[-10px_14px_28px_rgba(0,0,0,0.72)] transition-shadow first:ml-0 sm:-ml-9 sm:w-[138px] lg:-ml-10 lg:w-[156px]",
                    isSelected
                      ? "border-[#F4B942]/80 ring-2 ring-[#E07A2F]/45 shadow-[0_22px_45px_rgba(224,122,47,0.3)]"
                      : "border-white/15 hover:border-white/40",
                  )}
                >
                  {artworkUrl ? (
                    <Image
                      src={artworkUrl}
                      alt={album.title}
                      fill
                      sizes="160px"
                      className="object-cover"
                    />
                  ) : (
                    <div
                      className="flex size-full flex-col justify-between p-3 text-left"
                      style={{
                        background: `linear-gradient(150deg, #251D19 0%, ${album.vinylLabelColor}55 100%)`,
                      }}
                    >
                      <span className="font-mono text-[10px] text-[#FFF3D1]/70">
                        {album.year}
                      </span>
                      <span className="line-clamp-2 font-serif text-sm font-bold leading-tight text-[#FFF3D1]">
                        {album.title}
                      </span>
                    </div>
                  )}

                  {/* Sleeve top gloss highlight */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/25 via-transparent to-white/15"
                  />
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Minimal Year Strip under the 9 sleeves */}
        <div className="mt-2 flex flex-wrap items-center justify-center gap-1.5">
          {ALBUMS.map((album, idx) => {
            const isSelected = idx === selectedIndex;
            return (
              <button
                key={`${album.id}-pill`}
                type="button"
                onClick={() => handleSelectAlbum(idx)}
                className={cn(
                  "cursor-pointer rounded-full px-3 py-1 font-mono text-[11px] font-medium transition-colors",
                  isSelected
                    ? "bg-[#E07A2F]/25 text-[#FFF3D1]"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                &apos;{String(album.year).slice(2)}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
