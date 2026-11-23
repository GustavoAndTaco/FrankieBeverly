import { CurationSection } from "@/components/sections/CurationSection";
import { DiscographySection } from "@/components/sections/DiscographySection";
import { EndingSection } from "@/components/sections/EndingSection";
import { IntroSection } from "@/components/sections/IntroSection";
import { SoundLiveSection } from "@/components/sections/SoundLiveSection";
import { TimelineSection } from "@/components/sections/TimelineSection";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <IntroSection />
      <TimelineSection />
      <DiscographySection />
      <CurationSection />
      <SoundLiveSection />
      <EndingSection />
    </main>
  );
}
