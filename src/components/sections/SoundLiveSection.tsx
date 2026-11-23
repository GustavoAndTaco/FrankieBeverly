"use client";

import { ExternalLink } from "lucide-react";
import { SectionCard } from "@/components/motion/SectionCard";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LIVE_VIDEOS, SOUND_TRAITS } from "@/data/media";

/** Section 5 (LIVE): Clean full-canvas live embed + 3 bold sound traits (visualizer removed). */
export function SoundLiveSection() {
  return (
    <SectionCard id="live" zIndex={50}>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-5">
        {/* Left: Clean Live Video Embed with Tabs & YouTube link ONLY */}
        <Card className="overflow-hidden p-5 sm:p-7 lg:col-span-8">
          <Tabs defaultValue={LIVE_VIDEOS[0].id} className="w-full">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <TabsList>
                {LIVE_VIDEOS.map((video) => (
                  <TabsTrigger
                    key={video.id}
                    value={video.id}
                    className="font-display text-sm tracking-[0.08em] sm:text-base"
                  >
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
                    className="inline-flex items-center gap-1.5 rounded-full border border-border px-3.5 py-1.5 font-display text-sm tracking-[0.08em] text-muted-foreground transition-colors hover:border-white/20 hover:text-foreground"
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
                <CardDescription className="mt-2 font-sans text-sm leading-relaxed sm:text-base">
                  {trait.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </SectionCard>
  );
}
