import { ArrowUp, Disc3 } from "lucide-react";
import { SectionCard } from "@/components/motion/SectionCard";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { EDUCATIONAL_DISCLAIMER } from "@/data/media";

/** Section 6 (OUTRO): Enlarged sunset tribute closing + 1px dashed divider + clean 3-column footer. */
export function EndingSection() {
  return (
    <SectionCard id="outro" zIndex={60} isLast innerClassName="pb-28">
      {/* Tribute Hero Closing */}
      <div className="flex flex-col items-center py-10 text-center sm:py-16">
        <h2 className="sunset-text font-serif text-4xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
          In Loving Memory of Frankie Beverly
        </h2>

        <p className="mt-4 font-mono text-base tracking-[0.26em] text-muted-foreground sm:text-lg">
          1946 — 2024
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3.5">
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

      {/* 1px Dashed Divider */}
      <Separator dashed className="my-10" />

      {/* Minimal 3-Column Footer */}
      <footer className="grid grid-cols-1 gap-8 text-xs leading-relaxed text-muted-foreground md:grid-cols-12 sm:text-sm">
        <div className="md:col-span-3">
          <p className="font-mono text-xs font-semibold tracking-widest text-foreground uppercase">
            MAZE ft. FRANKIE BEVERLY
          </p>
          <p className="mt-2">Golden Time of Day</p>
          <p className="mt-1.5 font-mono text-xs text-foreground/75">
            20231044 박해신
          </p>
        </div>

        <div className="md:col-span-6">
          <p className="font-mono text-xs font-semibold tracking-widest text-foreground uppercase">
            비상업적 교육 과제 고지
          </p>
          <p className="mt-2 text-muted-foreground/90">
            {EDUCATIONAL_DISCLAIMER}
          </p>
        </div>

        <div className="md:col-span-3">
          <p className="font-mono text-xs font-semibold tracking-widest text-foreground uppercase">
            멀티미디어 출처
          </p>
          <ul className="mt-2 space-y-1.5">
            <li>음원 미리듣기 · 커버: Apple iTunes API</li>
            <li>라이브 영상 · 전체 곡: YouTube &amp; Spotify</li>
          </ul>
        </div>
      </footer>
    </SectionCard>
  );
}
