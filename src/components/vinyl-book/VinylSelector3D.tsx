"use client";

import { useCallback, useEffect, useRef, useState } from "react";
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

/** 3D tactile Vinyl LP disc with center album cover artwork & crisp 33⅓ RPM spin. */
function VinylDisc3D({
  album,
  artworkUrl,
  isPlaying,
}: {
  album: AlbumItem;
  artworkUrl: string | null;
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
      className="relative size-[190px] sm:size-[225px] lg:size-[245px]"
    >
      {/* 3D Thickness Rim Shadow */}
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-0 translate-y-2 rounded-full transition-all duration-500",
          isPlaying
            ? "bg-[#E07A2F]/30 blur-[18px]"
            : "bg-black/75 blur-[4px]",
        )}
      />

      {/* Main Spinning Vinyl Platter */}
      <div
        className={cn(
          "relative size-full rounded-full border shadow-[0_24px_50px_rgba(0,0,0,0.85),inset_0_1px_4px_rgba(255,255,255,0.24)] transition-colors duration-300",
          isPlaying
            ? "animate-vinyl-spin border-[#F4B942]/45"
            : "animate-vinyl-spin-paused border-white/20",
        )}
        style={{
          background:
            "repeating-radial-gradient(circle, #191513 0px, #191513 2.5px, #0C0A09 3.5px, #0C0A09 6px)",
        }}
      >
        {/* Asymmetric Light Sheen so rotation is visibly unmistakable */}
        <div
          aria-hidden="true"
          className="absolute inset-0 rounded-full opacity-50"
          style={{
            background:
              "conic-gradient(from 25deg, transparent 0deg, rgba(255,243,209,0.5) 28deg, transparent 62deg, transparent 180deg, rgba(224,122,47,0.38) 212deg, transparent 248deg)",
          }}
        />

        {/* Beveled Inner Groove Ring */}
        <div
          aria-hidden="true"
          className="absolute inset-[13%] rounded-full border border-white/[0.08]"
        />

        {/* Circular Center Label with Album Cover Photo (MiniPlayer style) */}
        <div
          className="absolute top-1/2 left-1/2 flex size-[46%] -translate-x-1/2 -translate-y-1/2 items-center justify-center overflow-hidden rounded-full border-2 border-[#FFF3D1]/40 shadow-[0_0_18px_rgba(0,0,0,0.75)]"
          style={{ backgroundColor: album.vinylLabelColor }}
        >
          {artworkUrl ? (
            <Image
              src={artworkUrl}
              alt={`${album.title} 센터 라벨`}
              fill
              sizes="120px"
              className="object-cover"
            />
          ) : (
            <div className="flex size-full flex-col items-center justify-center p-2 text-center">
              <span className="font-display text-sm tracking-widest text-[#FFF3D1]">
                {album.year}
              </span>
              <span className="font-display text-xs tracking-wider text-[#FFF3D1]/80">
                MAZE
              </span>
            </div>
          )}

          {/* Subtle glossy ring + metallic 3D spindle pin */}
          <span
            aria-hidden="true"
            className="relative z-10 size-4 rounded-full border border-[#FFF3D1]/75 bg-gradient-to-br from-[#FFF3D1] via-[#8C6A4A] to-[#110E0C] shadow-md"
          />
          <span
            aria-hidden="true"
            className="absolute top-1/2 left-1/2 z-20 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#110E0C]"
          />
        </div>
      </div>
    </motion.div>
  );
}

/** Mouse-reactive 3D angled vinyl crate selector with rotating center-cover LP & floating mid-air info. */
export function VinylSelector3D() {
  const { mediaMap, currentAlbumId, isPlaying, playAlbum } = useAudioPlayer();
  const [selectedIndex, setSelectedIndex] = useState<number>(7);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const rackScrollRef = useRef<HTMLDivElement>(null);
  const sleeveRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const hasMountedRef = useRef(false);
  const showcaseTouchStartRef = useRef<{ x: number; y: number } | null>(null);
  const dragStateRef = useRef({
    isDown: false,
    startX: 0,
    startScrollLeft: 0,
    moved: false,
  });

  const selectedAlbum = ALBUMS[selectedIndex];
  const selectedArtwork = mediaMap[selectedAlbum.id]?.artworkUrl ?? null;
  const isCurrentPlaying = currentAlbumId === selectedAlbum.id && isPlaying;

  useEffect(() => {
    ALBUMS.forEach((album) => {
      const url = mediaMap[album.id]?.artworkUrl;
      if (url && typeof window !== "undefined") {
        const img = new window.Image();
        img.src = url;
      }
    });
  }, [mediaMap]);

  useEffect(() => {
    const container = rackScrollRef.current;
    const sleeve = sleeveRefs.current[selectedIndex];
    if (!container || !sleeve) return;
    const targetLeft =
      sleeve.offsetLeft - (container.clientWidth - sleeve.offsetWidth) / 2;
    container.scrollTo({
      left: Math.max(0, targetLeft),
      behavior: hasMountedRef.current ? "smooth" : "auto",
    });
    hasMountedRef.current = true;
  }, [selectedIndex]);

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
      setSelectedIndex((prev) => Math.min(ALBUMS.length - 1, prev + 1));
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.max(0, prev - 1));
    }
  };

  const handleShowcaseTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    if (!touch) return;
    showcaseTouchStartRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleShowcaseTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    const start = showcaseTouchStartRef.current;
    showcaseTouchStartRef.current = null;
    const touch = e.changedTouches[0];
    if (!start || !touch) return;
    const dx = touch.clientX - start.x;
    const dy = touch.clientY - start.y;
    if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.2) {
      if (dx < 0) {
        setSelectedIndex((prev) => Math.min(ALBUMS.length - 1, prev + 1));
      } else {
        setSelectedIndex((prev) => Math.max(0, prev - 1));
      }
    }
  };

  const handleRackPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const container = rackScrollRef.current;
    if (!container) return;
    dragStateRef.current = {
      isDown: true,
      startX: e.clientX,
      startScrollLeft: container.scrollLeft,
      moved: false,
    };
  };

  const handleRackPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragStateRef.current;
    if (!drag.isDown || e.pointerType !== "mouse") return;
    const container = rackScrollRef.current;
    if (!container) return;
    const dx = e.clientX - drag.startX;
    if (Math.abs(dx) > 6) {
      drag.moved = true;
    }
    container.scrollLeft = drag.startScrollLeft - dx;
  };

  const handleRackPointerUp = () => {
    dragStateRef.current.isDown = false;
  };

  const floatOnLeftSide = selectedIndex >= 6;

  return (
    <div
      tabIndex={0}
      onKeyDown={handleKeyDown}
      aria-label="3D 바이닐 셀렉터 (마우스로 탐색하고 클릭하여 재생)"
      className="relative flex min-h-[78vh] w-full flex-col justify-between outline-none"
    >
      {/* Upper Showcase Stage: Rising 3D LP + Floating Mid-Air Description */}
      <div
        onTouchStart={handleShowcaseTouchStart}
        onTouchEnd={handleShowcaseTouchEnd}
        className="relative flex min-h-[320px] w-full touch-pan-y items-center justify-center sm:min-h-[360px]"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedAlbum.id}
            initial={{ opacity: 0, y: 42, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.94 }}
            transition={{ type: "spring", stiffness: 210, damping: 24 }}
            className={cn(
              "relative flex w-full max-w-[940px] flex-col items-center justify-center gap-6 sm:gap-10 md:flex-row",
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
              <VinylDisc3D
                album={selectedAlbum}
                artworkUrl={selectedArtwork}
                isPlaying={isCurrentPlaying}
              />
            </button>

            {/* Mid-Air Floating Compact Description */}
            <motion.div
              initial={{ opacity: 0, x: floatOnLeftSide ? -18 : 18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.08, duration: 0.35 }}
              className="animate-float-gentle relative max-w-[420px] text-center md:text-left"
            >
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

              <h3 className="mt-1 font-display text-3xl tracking-[0.04em] text-[#FFF3D1] drop-shadow-[0_6px_24px_rgba(0,0,0,0.85)] sm:text-4xl lg:text-[44px] lg:leading-[1.04]">
                {selectedAlbum.title}
              </h3>

              <p className="mt-2.5 font-sans text-sm leading-relaxed text-foreground/88 drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] sm:text-base">
                {selectedAlbum.shortDescription}
              </p>

              <div className="mt-4 flex flex-wrap items-center justify-center gap-3 md:justify-start">
                <button
                  type="button"
                  onClick={() => playAlbum(selectedAlbum.id)}
                  className="sunset-bg inline-flex cursor-pointer items-center gap-2 rounded-full px-5 py-2 font-display text-base tracking-[0.08em] text-[#110E0C] shadow-[0_6px_24px_rgba(224,122,47,0.35)] transition-transform hover:scale-[1.03] active:scale-[0.98]"
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
                  className="inline-flex items-center gap-1 font-display text-sm tracking-[0.08em] text-muted-foreground transition-colors hover:text-[#FFF3D1]"
                >
                  Spotify
                  <ExternalLink className="size-3" />
                </a>
                <a
                  href={selectedAlbum.youtubeSearchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-display text-sm tracking-[0.08em] text-muted-foreground transition-colors hover:text-[#FFF3D1]"
                >
                  YouTube
                  <ExternalLink className="size-3" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom 9 Angled 3D Vinyl Sleeves Rack */}
      <div className="mt-8 w-full">
        <div className="relative">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 z-40 w-8 bg-gradient-to-r from-[#110E0C] to-transparent xl:hidden"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 z-40 w-8 bg-gradient-to-l from-[#110E0C] to-transparent xl:hidden"
          />

          <div
            ref={rackScrollRef}
            onMouseLeave={() => {
              setHoveredIndex(null);
              handleRackPointerUp();
            }}
            onPointerDown={handleRackPointerDown}
            onPointerMove={handleRackPointerMove}
            onPointerUp={handleRackPointerUp}
            onPointerCancel={handleRackPointerUp}
            style={{ perspective: "1500px", WebkitOverflowScrolling: "touch" }}
            className="no-scrollbar flex items-end overflow-x-auto overscroll-x-contain pt-16 pb-8 select-none xl:overflow-visible"
          >
            <div className="mx-auto flex w-max items-end px-8 sm:px-10">
              {ALBUMS.map((album, idx) => {
                const artworkUrl = mediaMap[album.id]?.artworkUrl ?? null;
                const isSelected = idx === selectedIndex;
                const isHovered = idx === hoveredIndex;

                const focusIdx = hoveredIndex ?? selectedIndex;
                const delta = idx - focusIdx;
                const spreadX = delta === 0 ? 0 : delta < 0 ? -14 : 18;
                const rotateY = isSelected ? -8 : isHovered ? -14 : -34;
                const liftY = isSelected ? -34 : isHovered ? -18 : 0;

                return (
                  <motion.button
                    key={album.id}
                    ref={(el) => {
                      sleeveRefs.current[idx] = el;
                    }}
                    type="button"
                    draggable={false}
                    onMouseEnter={() => setHoveredIndex(idx)}
                    onClick={() => {
                      if (dragStateRef.current.moved) {
                        dragStateRef.current.moved = false;
                        return;
                      }
                      handleSelectAlbum(idx);
                    }}
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
                        draggable={false}
                        className="object-cover"
                      />
                    ) : (
                      <div
                        className="flex size-full flex-col justify-between p-3 text-left"
                        style={{
                          background: `linear-gradient(150deg, #251D19 0%, ${album.vinylLabelColor}55 100%)`,
                        }}
                      >
                        <span className="font-display text-xs tracking-wider text-[#FFF3D1]/70">
                          {album.year}
                        </span>
                        <span className="line-clamp-2 font-display text-base leading-tight text-[#FFF3D1]">
                          {album.title}
                        </span>
                      </div>
                    )}

                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/25 via-transparent to-white/15"
                    />
                  </motion.button>
                );
              })}
            </div>
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
                  "cursor-pointer rounded-full px-3 py-1 font-display text-sm tracking-[0.08em] transition-colors",
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
