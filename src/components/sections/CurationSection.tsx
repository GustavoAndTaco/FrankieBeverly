"use client";

import { ExternalLink, Pause, Play } from "lucide-react";
import { SectionCard } from "@/components/motion/SectionCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAudioPlayer } from "@/context/AudioPlayerContext";
import { ALBUMS } from "@/data/albums";
import { CURATION_PICKS, CURATOR_ESSAY } from "@/data/curation";
import { cn } from "@/lib/utils";

/** Section 4 (RECOMMENDS): Full-canvas curator card + large 2x2 track picks with zero section headers. */
export function CurationSection() {
  const { currentAlbumId, isPlaying, playAlbum } = useAudioPlayer();

  return (
    <SectionCard id="recommends" zIndex={40}>
      {/* Bold NanumSquare Curator Essay Card */}
      <Card className="mb-4 p-2 lg:mb-5">
        <CardHeader className="p-6 sm:p-8">
          <CardTitle className="font-sans text-2xl font-extrabold text-[#FFF3D1] sm:text-3xl">
            &ldquo;{CURATOR_ESSAY.heading}&rdquo;
          </CardTitle>
          <CardDescription className="mt-2 max-w-[920px] text-base leading-relaxed text-foreground/88 sm:text-lg">
            {CURATOR_ESSAY.body}
          </CardDescription>
        </CardHeader>
      </Card>

      {/* 2x2 Large Readable Track Bento Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-5">
        {CURATION_PICKS.map((pick) => {
          const album = ALBUMS.find((item) => item.id === pick.albumId);
          const isThisPlaying = currentAlbumId === pick.albumId && isPlaying;

          return (
            <Card
              key={pick.albumId}
              className={cn(
                "justify-between p-1 transition-all duration-300 hover:-translate-y-1",
                isThisPlaying
                  ? "border-[#E07A2F]/60 bg-[#1B1512]"
                  : "hover:border-white/20",
              )}
            >
              <CardHeader className="p-6 pb-3 sm:p-7 sm:pb-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <Badge
                      variant={pick.isTopFavorite ? "sunset" : "secondary"}
                      className="mb-2.5 text-[11px]"
                    >
                      {pick.pickLabel}
                    </Badge>
                    <CardTitle className="font-serif text-2xl font-bold sm:text-3xl">
                      {pick.trackTitle}
                    </CardTitle>
                    <p className="mt-1 font-mono text-xs text-muted-foreground">
                      {pick.albumTitle} · {pick.approxYear}
                    </p>
                  </div>

                  <Button
                    type="button"
                    variant={isThisPlaying ? "sunset" : "outline"}
                    size="icon"
                    onClick={() => playAlbum(pick.albumId)}
                    aria-label={
                      isThisPlaying
                        ? `${pick.trackTitle} 일시정지`
                        : `${pick.trackTitle} 30초 미리듣기`
                    }
                    className="size-11 shrink-0"
                  >
                    {isThisPlaying ? (
                      <Pause className="size-4 fill-current" />
                    ) : (
                      <Play className="size-4 fill-current pl-0.5" />
                    )}
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="p-6 pt-1 sm:p-7 sm:pt-1">
                <p className="text-base leading-relaxed text-muted-foreground">
                  {pick.note}
                </p>

                {album ? (
                  <div className="mt-4 flex items-center gap-4 font-mono text-xs text-muted-foreground">
                    <a
                      href={album.spotifySearchUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 transition-colors hover:text-[#F4B942]"
                    >
                      Spotify
                      <ExternalLink className="size-3" />
                    </a>
                    <a
                      href={album.youtubeSearchUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 transition-colors hover:text-[#F4B942]"
                    >
                      YouTube
                      <ExternalLink className="size-3" />
                    </a>
                  </div>
                ) : null}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </SectionCard>
  );
}
