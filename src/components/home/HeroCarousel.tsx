"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useState } from "react";

import banner1 from "@/src/assets/banner-1.jpg";

const SLIDES: StaticImageData[] = [banner1, banner1, banner1, banner1, banner1];
const AUTOPLAY_MS = 5000;

export function HeroCarousel() {
  const total = SLIDES.length;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setIndex((prev) => (prev + 1) % total), AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [total]);

  return (
    <section className="w-full border-b border-[#e5e5e5] bg-[#fafafa]">
      <div className="relative w-full overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {SLIDES.map((src, i) => (
            <div key={i} className="w-full shrink-0">
              <Image
                src={src}
                alt={`히든카이스 배너 ${i + 1}`}
                loading={i === 0 ? "eager" : "lazy"}
                fetchPriority={i === 0 ? "high" : "auto"}
                sizes="100vw"
                style={{ width: "100%", height: "auto" }}
              />
            </div>
          ))}
        </div>

        <div className="absolute bottom-[6.5%] right-[3.6%] rounded-full bg-black/80 px-5 py-1.5 text-sm font-medium text-white backdrop-blur">
          <span className="tabular-nums">
            {index + 1}/{total}
          </span>
        </div>
      </div>
    </section>
  );
}
