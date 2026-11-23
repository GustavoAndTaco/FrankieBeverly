"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import {
  ExternalLink,
  Pause,
  Play,
  Volume1,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useAudioPlayer } from "@/context/AudioPlayerContext";
import { ALBUMS } from "@/data/albums";
import { cn } from "@/lib/utils";

function formatTime(seconds: number): string {
  const safe = Math.max(0, Math.floor(seconds));
  const mins = Math.floor(safe / 60);
  const secs = safe % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

/** Persistent floating bottom mini vinyl player with track scrub & volume slider. */
export function MiniPlayer() {
  const {
    mediaMap,
    currentAlbumId,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    playbackNotice,
    togglePlay,
    seek,
    setVolume,
    toggleMute,
    closePlayer,
  } = useAudioPlayer();

  const activeAlbum = ALBUMS.find((album) => album.id === currentAlbumId);
  const activeMedia = currentAlbumId ? mediaMap[currentAlbumId] : undefined;
  const percent = duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0;
  const effectiveVolume = isMuted ? 0 : volume;
  const VolumeIcon =
    effectiveVolume === 0
      ? VolumeX
      : effectiveVolume < 0.5
        ? Volume1
        : Volume2;

  return (
    <AnimatePresence>
      {activeAlbum ? (
        <motion.aside
          key="mini-player"
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
          aria-label="하단 미니 바이닐 플레이어"
          className="fixed bottom-4 left-1/2 z-[90] w-[calc(100%-1.5rem)] max-w-[780px] -translate-x-1/2 lg:left-[calc(50%+150px)] lg:w-[calc(100%-340px)]"
        >
          <div className="rounded-2xl border border-white/12 bg-[#161210]/95 px-4 py-3 shadow-[0_16px_48px_rgba(0,0,0,0.75)] backdrop-blur-lg">
            <div className="flex items-center gap-3.5">
              {/* Spinning mini vinyl disc */}
              <div className="relative size-11 shrink-0">
                <div
                  className={cn(
                    "relative size-11 overflow-hidden rounded-full border border-white/15 bg-[#120E0C] shadow-inner",
                    isPlaying
                      ? "animate-vinyl-spin"
                      : "animate-vinyl-spin-paused",
                  )}
                >
                  {activeMedia?.artworkUrl ? (
                    <Image
                      src={activeMedia.artworkUrl}
                      alt={activeAlbum.title}
                      fill
                      sizes="44px"
                      className="object-cover"
                    />
                  ) : (
                    <div
                      className="size-full"
                      style={{
                        background: `radial-gradient(circle, ${activeAlbum.vinylLabelColor} 0%, #110E0C 72%)`,
                      }}
                    />
                  )}
                  <span
                    aria-hidden="true"
                    className="absolute top-1/2 left-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/40 bg-[#110E0C]"
                  />
                </div>
              </div>

              {/* Track & Album Metadata */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="truncate text-sm font-bold text-foreground">
                    {activeAlbum.featuredTrack}
                  </p>
                  <span className="hidden shrink-0 font-mono text-[10px] text-[#F4B942] sm:inline">
                    {activeAlbum.approxRelease}
                  </span>
                </div>
                <p className="truncate text-xs text-muted-foreground">
                  {activeAlbum.title}
                </p>

                {/* Interactive progress scrub */}
                {activeMedia?.previewUrl ? (
                  <div className="mt-1.5 flex items-center gap-2.5">
                    <button
                      type="button"
                      aria-label="재생 위치 이동"
                      onClick={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const ratio = Math.max(
                          0,
                          Math.min(1, (e.clientX - rect.left) / rect.width),
                        );
                        seek(ratio * duration);
                      }}
                      className="group relative flex flex-1 cursor-pointer items-center py-1"
                    >
                      <Progress
                        value={percent}
                        className="h-1 bg-white/10"
                        indicatorClassName="sunset-bg"
                      />
                    </button>
                    <span className="shrink-0 font-mono text-[10px] text-muted-foreground tabular-nums">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </span>
                  </div>
                ) : null}
              </div>

              {/* Volume Control + Play / Close */}
              <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
                {activeMedia?.previewUrl ? (
                  <Button
                    type="button"
                    variant="sunset"
                    size="icon-sm"
                    onClick={togglePlay}
                    aria-label={isPlaying ? "일시정지" : "재생"}
                  >
                    {isPlaying ? (
                      <Pause className="size-3.5 fill-current" />
                    ) : (
                      <Play className="size-3.5 fill-current pl-0.5" />
                    )}
                  </Button>
                ) : (
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="h-7 px-2.5 text-[11px]"
                  >
                    <a
                      href={activeAlbum.spotifySearchUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Spotify
                      <ExternalLink className="size-3" />
                    </a>
                  </Button>
                )}

                {/* Volume Mute + Range Slider */}
                <div className="hidden items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 sm:flex">
                  <button
                    type="button"
                    onClick={toggleMute}
                    aria-label={isMuted ? "음소거 해제" : "음소거"}
                    className="cursor-pointer text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <VolumeIcon className="size-3.5" />
                  </button>
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.01}
                    value={effectiveVolume}
                    onChange={(e) => setVolume(Number(e.target.value))}
                    aria-label={`음량 조절 (${Math.round(effectiveVolume * 100)}%)`}
                    className="volume-slider w-16 md:w-20"
                    style={{
                      background: `linear-gradient(to right, #F4B942 0%, #E07A2F ${
                        effectiveVolume * 100
                      }%, rgba(255,255,255,0.16) ${effectiveVolume * 100}%, rgba(255,255,255,0.16) 100%)`,
                    }}
                  />
                </div>

                {/* Mobile-only compact mute button */}
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  onClick={toggleMute}
                  aria-label={isMuted ? "음소거 해제" : "음소거"}
                  className="sm:hidden"
                >
                  <VolumeIcon className="size-3.5" />
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  onClick={closePlayer}
                  aria-label="플레이어 닫기"
                >
                  <X className="size-3.5" />
                </Button>
              </div>
            </div>

            {playbackNotice ? (
              <div className="mt-2 flex flex-wrap items-center justify-between gap-2 border-t border-white/[0.06] pt-1.5 text-[11px] text-muted-foreground">
                <span>{playbackNotice}</span>
                <div className="flex items-center gap-2">
                  <a
                    href={activeAlbum.spotifySearchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#F4B942] hover:underline"
                  >
                    Spotify ↗
                  </a>
                  <a
                    href={activeAlbum.youtubeSearchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#F4B942] hover:underline"
                  >
                    YouTube ↗
                  </a>
                </div>
              </div>
            ) : null}
          </div>
        </motion.aside>
      ) : null}
    </AnimatePresence>
  );
}
