import { processSection } from "@/data/process";
import { ProcessTable } from "./ProcessTable";
import { ProcessTimeline } from "./ProcessTimeline";

export function OurProcess() {
  const { badge, title, description, items } = processSection;

  return (
    <section className="our-process relative bg-[#111111] py-16 text-white md:py-[86px] lg:py-40">
      <div className="relative z-10 mx-auto max-w-[1020px] px-4 text-center lg:px-0">
        <div className="six2eight-heading">
          <div className="block-top">
            <div className="block-title">
              <span className="inline-block rounded-[40px] bg-[#6060603D] px-4 py-2 text-base leading-6 font-medium text-white">
                <span className="mr-3 inline-flex h-3 w-3 rounded-full bg-[#9AFD0D]" />
                {badge}
              </span>
            </div>
          </div>
          <div className="main-heading mt-3">
            <h2 className="main-title text-[32px] leading-[1.13] font-semibold md:text-5xl md:tracking-tight lg:text-[72px] lg:leading-[82px]">
              {title}
            </h2>
          </div>
        </div>
        <p className="mt-4 text-base leading-[1.4] font-normal text-[#B5B5B5] lg:text-xl lg:leading-8">
          {description}
        </p>
      </div>

      <div className="relative z-10 mx-auto max-w-267.5 text-white">
        <ProcessTable items={items} />
        <div className="hidden md:block">
          <ProcessTimeline items={items} />
        </div>
      </div>
    </section>
  );
}
