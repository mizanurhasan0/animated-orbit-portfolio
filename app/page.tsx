import { HeroSection } from "@/components/hero/HeroSection";
import { OurProcess } from "@/components/our-process/OurProcess";
import { TeamSection } from "@/components/team/TeamSection";

export default function Home() {
  return (
    <main id="main-content" className="bg-[#111111]">
      <HeroSection />

      <OurProcess />

      <TeamSection />

      <div className="h-[40vh] bg-[#111111]" />
    </main>
  );
}
