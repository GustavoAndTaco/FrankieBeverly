import { SectionCard } from "@/components/motion/SectionCard";
import { VinylSelector3D } from "@/components/vinyl-book/VinylSelector3D";

/** Section 3 (DISCOGRAPHY): Full-canvas 3D Vinyl Selector with zero heading clutter. */
export function DiscographySection() {
  return (
    <SectionCard id="discography" zIndex={30}>
      <VinylSelector3D />
    </SectionCard>
  );
}
