import Image from "next/image";
import { ArrowUp, Disc3 } from "lucide-react";
import { SectionCard } from "@/components/motion/SectionCard";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ARTIST_PHOTO, EDUCATIONAL_DISCLAIMER } from "@/data/media";

/** Section 6 (OUTRO): Centered tribute beside feathered portrait + 1px dashed footer. */
export function EndingSection() {
  return (
    <SectionCard id="outro" zIndex={60} isLast innerClassName="pb-28">
      {/* Unified Horizontally Centered Tribute + Feathered Portrait */}
      <div className="mx-auto flex max-w-[960px] flex-col items-center justify-center gap-10 py-10 md:flex-row md:gap-12 lg:py-16">
        {/* Left Tribute Copy & Actions */}
        <div className="flex flex-col items-center text-center md:items-start md:text-left">
          <h2 className="sunset-text font-display text-5xl tracking-[0.04em] sm:text-6xl lg:text-[68px] lg:leading-[1.02]">
            In Loving Memory of
            <br />
            Frankie Beverly
          </h2>

          <p className="mt-3 font-display text-2xl tracking-[0.22em] text-muted-foreground sm:text-3xl">
            1946 — 2024
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5 md:justify-start">
            <Button asChild variant="outline" size="lg">
              <a href="#intro">
                <ArrowUp className="size-4" />
                맨 위로
              </a>
            </Button>
            <Button asChild variant="sunset" size="lg">
              <a href="#discography">
                <Disc3 className="size-4" />
                바이닐 다시 보기
              </a>
            </Button>
          </div>
        </div>

        {/* Right Seamless Feathered Portrait */}
        <div className="relative shrink-0">
          {/* Warm Ambient Sunset Halo Behind Portrait */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 left-1/2 h-[82%] w-[82%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-45 blur-[55px]"
            style={{
              background:
                "radial-gradient(circle, rgba(224,122,47,0.35) 0%, rgba(196,73,45,0.12) 55%, transparent 75%)",
            }}
          />

          <div className="soft-edge-mask relative aspect-[2/3] w-[250px] overflow-hidden sm:w-[290px] lg:w-[320px]">
            <Image
              src="/images/frankie-outro.jpg"
              alt="따뜻하게 웃고 있는 프랭키 베벌리 포트레이트"
              fill
              sizes="(max-width: 640px) 250px, 320px"
              className="object-cover object-top brightness-[0.96] contrast-[1.05]"
            />
            {/* Perimeter dark feather vignette melting cleanly into #110E0C */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse 68% 72% at 50% 48%, transparent 45%, rgba(17,14,12,0.55) 75%, #110E0C 100%)",
              }}
            />
          </div>
        </div>
      </div>

      {/* 1px Dashed Divider */}
      <Separator dashed className="my-10" />

      {/* Minimal 3-Column Footer */}
      <footer className="grid grid-cols-1 gap-8 text-xs leading-relaxed text-muted-foreground md:grid-cols-12 sm:text-sm">
        <div className="md:col-span-3">
          <p className="font-display text-base tracking-[0.14em] text-foreground uppercase">
            MAZE ft. FRANKIE BEVERLY
          </p>
          <p className="mt-2">Golden Time of Day</p>
          <p className="mt-1.5 font-mono text-xs text-foreground/75">
            20231044 박해신
          </p>
        </div>

        <div className="md:col-span-6">
          <p className="font-sans text-xs font-bold tracking-wider text-foreground uppercase">
            비상업적 교육 과제 고지
          </p>
          <p className="mt-2 text-muted-foreground/90">
            {EDUCATIONAL_DISCLAIMER}
          </p>
        </div>

        <div className="md:col-span-3">
          <p className="font-sans text-xs font-bold tracking-wider text-foreground uppercase">
            멀티미디어 출처
          </p>
          <ul className="mt-2 space-y-1.5">
            <li>음원 미리듣기 · 커버: Apple iTunes API</li>
            <li>라이브 영상 · 전체 곡: YouTube &amp; Spotify</li>
            <li>
              공연 사진:{" "}
              <a
                href={ARTIST_PHOTO.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/85 underline underline-offset-4 hover:text-[#F4B942]"
              >
                Wikimedia Commons ({ARTIST_PHOTO.license})
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </SectionCard>
  );
}
