import Image from "next/image";
import { heroBackgroundImages } from "@/data/hero";
import { HeroContent } from "./HeroContent";

export function HeroSection() {
  return (
    <section className="hero-section relative flex min-h-screen flex-col items-center overflow-hidden px-4 pb-16 pt-12 text-white md:pt-16">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[#111111]" />

        <div className="absolute inset-0 opacity-[0.35]">
          {heroBackgroundImages.map((image) => (
            <div
              key={image.src}
              className={`hero-bg-image absolute overflow-hidden rounded-2xl border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.45)] ${image.className}`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 768px) 120px, 220px"
                className="object-cover"
                priority
              />
            </div>
          ))}
        </div>

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(154,253,13,0.14),transparent_42%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(103,232,249,0.08),transparent_35%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#111111]/20 via-[#111111]/72 to-[#111111]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-[#111111]/80" />

        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(154, 253, 13, 0.35) 1px, transparent 1px),
              linear-gradient(90deg, rgba(154, 253, 13, 0.35) 1px, transparent 1px)
            `,
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <HeroContent />
    </section>
  );
}
