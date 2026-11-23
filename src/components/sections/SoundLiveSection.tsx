"use client";

import { ExternalLink, Radio } from "lucide-react";
import { SectionCard } from "@/components/motion/SectionCard";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAudioPlayer } from "@/context/AudioPlayerContext";
import { ALBUMS } from "@/data/albums";
import { LIVE_VIDEOS, SOUND_TRAITS } from "@/data/media";
import { cn } from "@/lib/utils";

const VISUALIZER_HEIGHTS = [
  38, 62, 48, 84, 56, 92, 44, 76, 64, 88, 52, 72, 95, 60, 42, 78, 68, 90, 50,
  74, 86, 54, 66, 46, 80, 58, 70, 40,
];

/** Section 5 (LIVE): Clean full-canvas live embed + 3 bold sound traits + visualizer (zero clutter). */
export function SoundLiveSection() {
  const { currentAlbumId, isPlaying } = useAudioPlayer();
  const activeAlbum = ALBUMS.find((album) => album.id === currentAlbumId);

  return (
    <SectionCard id="live" zIndex={50}>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-5">
        {/* Left: Clean Live Video Embed with Tabs & YouTube link ONLY */}
        <Card className="overflow-hidden p-5 sm:p-7 lg:col-span-8">
          <Tabs defaultValue={LIVE_VIDEOS[0].id} className="w-full">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <TabsList>
                {LIVE_VIDEOS.map((video) => (
                  <TabsTrigger key={video.id} value={video.id}>
                    {video.tabLabel}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {LIVE_VIDEOS.map((video) => (
              <TabsContent key={video.id} value={video.id} className="mt-4">
                <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-[#0D0A09]">
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?rel=0`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                    className="size-full border-0"
                  />
                </div>

                <div className="mt-3 flex justify-end">
                  <a
                    href={video.watchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 font-mono text-xs text-muted-foreground transition-colors hover:border-white/20 hover:text-foreground"
                  >
                    YouTube
                    <ExternalLink className="size-3.5" />
                  </a>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </Card>

        {/* Right: 3 Clean Sound Trait Cards with Bold NanumSquare Headings */}
        <div className="grid grid-cols-1 gap-4 lg:col-span-4 lg:gap-5">
          {SOUND_TRAITS.map((trait) => (
            <Card key={trait.title} className="justify-center p-1">
              <CardHeader className="p-6 sm:p-7">
                <CardTitle className="font-sans text-xl font-extrabold text-[#FFF3D1] sm:text-2xl">
                  {trait.title}
                </CardTitle>
                <CardDescription className="mt-2 text-sm leading-relaxed sm:text-base">
                  {trait.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>

      {/* Bottom Full-Width Slim Rhythm Visualizer */}
      <Card className="mt-4 lg:mt-5">
        <CardContent className="flex flex-col justify-between gap-4 p-5 sm:flex-row sm:items-center sm:px-7 sm:py-5">
          <div className="flex items-center gap-3">
            <Radio
              className={cn(
                "size-4 shrink-0 transition-colors",
                isPlaying ? "text-[#F4B942]" : "text-muted-foreground",
              )}
            />
            <p className="font-mono text-xs tracking-wider text-foreground uppercase">
              {isPlaying && activeAlbum
                ? `${activeAlbum.featuredTrack} · ${activeAlbum.title}`
                : "LIVE SOUND VISUALIZER"}
            </p>
          </div>

          <div
            aria-hidden="true"
            className="flex h-9 items-end gap-1.5 self-start sm:self-center"
          >
            {VISUALIZER_HEIGHTS.map((height, idx) => (
              <span
                key={`eq-bar-${idx}`}
                className={cn(
                  "w-1.5 rounded-full transition-colors duration-300",
                  isPlaying
                    ? "animate-equalizer-bar sunset-bg"
                    : "bg-white/18",
                )}
                style={{
                  height: isPlaying ? `${height}%` : `${Math.max(20, height * 0.42)}%`,
                  animationDelay: isPlaying ? `${(idx % 7) * 0.14}s` : undefined,
                }}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </SectionCard>
  );
}
