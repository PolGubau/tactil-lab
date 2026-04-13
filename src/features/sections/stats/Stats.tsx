"use client";
import { useTranslation } from "@/shared/i18n/hooks";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

// Parses "30+" -> { num: 30, suffix: "+" }, "100%" -> { num: 100, suffix: "%" }, "24h" -> { num: 24, suffix: "h" }
function parseStatValue(raw: string): { num: number; suffix: string } {
  const match = raw.match(/^(\d+(?:\.\d+)?)(.*)$/);
  if (!match) return { num: 0, suffix: raw };
  return { num: Number.parseFloat(match[1]), suffix: match[2] };
}

export default function Stats() {
  const t = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);

  const stats = [
    { value: t.stat_1_value, label: t.stat_1_label },
    { value: t.stat_2_value, label: t.stat_2_label },
    { value: t.stat_3_value, label: t.stat_3_label },
    { value: t.stat_4_value, label: t.stat_4_label },
    { value: t.stat_5_value, label: t.stat_5_label },
    { value: t.stat_6_value, label: t.stat_6_label },
  ];

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      // Header reveal: line grows + text fades up
      gsap.set("[data-s-line]", { scaleX: 0 });
      gsap.fromTo(
        "[data-stats-header]",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 76%" },
        },
      );
      gsap.to("[data-s-line]", {
        scaleX: 1,
        duration: 1.1,
        ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 72%" },
      });

      // Stat cards: staggered rise-from-below with clip
      gsap.fromTo(
        "[data-stat-card]",
        { y: 48, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 72%" },
        },
      );

      // Counter animation — animate each number from 0 to target
      const cards =
        sectionRef.current!.querySelectorAll<HTMLElement>("[data-stat-card]");
      cards.forEach((card, i) => {
        const raw = stats[i].value;
        const { num, suffix } = parseStatValue(raw);
        if (num === 0) return;
        const el = card.querySelector<HTMLElement>("[data-stat-num]");
        if (!el) return;
        const proxy = { val: 0 };
        gsap.to(proxy, {
          val: num,
          duration: 1.6,
          ease: "power2.out",
          delay: 0.1 * i,
          snap: { val: 1 },
          onUpdate: () => {
            el.textContent = Math.round(proxy.val) + suffix;
          },
          scrollTrigger: { trigger: sectionRef.current, start: "top 72%" },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [t]);

  return (
    <section
      ref={sectionRef}
      id="stats"
      className="bg-tint"
      style={{ padding: "clamp(4.5rem,9vw,7rem) clamp(1.5rem,5vw,5rem)" }}
    >
      <div className="max-w-7xl mx-auto">
        <span className="pill mb-8 block w-fit">{t.stats_label}</span>
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">
          {/* Left: editorial headline */}
          <div data-stats-header className="lg:col-span-2 opacity-0">
            <h2
              className="font-black leading-[0.92] tracking-tight mb-5 text-ink text-balance"
              style={{ fontSize: "clamp(2.2rem,4.5vw,4rem)" }}
            >
              {t.stats_headline}
            </h2>
            <p
              className="text-base leading-relaxed text-muted text-pretty"
              style={{ maxWidth: "30ch" }}
            >
              {t.stats_description}
            </p>
            <div data-s-line className="mt-10 h-px w-16 origin-left bg-accent" />
          </div>

          {/* Right: 3x2 stat grid */}
          <div className="lg:col-span-3 grid grid-cols-2 sm:grid-cols-3 gap-4">
            {stats.map((stat) => {
              const { num, suffix } = parseStatValue(stat.value);
              return (
                <div
                  key={stat.label}
                  data-stat-card
                  className="card opacity-0 p-7 flex flex-col gap-2"
                >
                  <span
                    data-stat-num
                    className="font-black tracking-tight leading-none text-accent tabular-nums"
                    style={{ fontSize: "clamp(2.4rem,4.5vw,3.2rem)" }}
                  >
                    {num === 0 ? stat.value : "0" + suffix}
                  </span>
                  <span className="text-[10px] tracking-[0.18em] uppercase font-semibold leading-snug text-muted">
                    {stat.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
