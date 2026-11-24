"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/ui/icon";
import type { IconId } from "@/components/ui/icon";
import { Container, Eyebrow } from "@/components/ui/section";

const stats: readonly { icon: IconId; value: number; suffix: string; label: string }[] = [
  { icon: "globe", value: 1538, suffix: "+", label: "Dünya çapındaki müşteriler" },
  { icon: "package", value: 5154, suffix: "+", label: "Teslim edilen ürünler" },
  { icon: "truck", value: 18845, suffix: " km", label: "Kat edilen kilometreler" },
];

const format = (n: number) => new Intl.NumberFormat("tr-TR").format(Math.round(n));

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduced = useReducedMotion();
  const [shown, setShown] = useState(reduced ? value : 0);

  useEffect(() => {
    if (!inView || reduced) return;
    const controls = animate(0, value, { duration: 1.8, ease: "easeOut", onUpdate: setShown });
    return () => controls.stop();
  }, [inView, reduced, value]);

  return (
    <span ref={ref}>
      {format(reduced ? value : shown)}
      {suffix}
    </span>
  );
}

/** Photo band with animated counters. */
export function StatsBand() {
  return (
    <section aria-labelledby="stats-title" className="relative overflow-hidden border-y border-line py-20 sm:py-28">
      <Image src="/images/globe.jpg" alt="" fill sizes="100vw" className="object-cover object-[center_35%]" />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-ink/60" />
      <Container className="relative grid items-center gap-12 lg:grid-cols-[1fr_1.3fr]">
        <div>
          <Eyebrow>Sizin kargonuz, sizin kurallarınız</Eyebrow>
          <h2
            id="stats-title"
            className="text-balance font-display text-4xl font-bold uppercase leading-[1.02] tracking-tight sm:text-5xl"
          >
            Zaman kazandıran dijital taşımacılık
          </h2>
        </div>
        <dl className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {stats.map(({ icon, value, suffix, label }) => (
            <div key={label} className="flex flex-col items-start sm:items-center sm:text-center">
              <Icon name={icon} className="mb-4 size-10 text-white" />
              <dd className="order-1 whitespace-nowrap font-display text-4xl font-bold tabular-nums lg:text-[2.6rem] xl:text-5xl">
                <Counter value={value} suffix={suffix} />
              </dd>
              <dt className="order-2 mt-2 text-sm font-semibold uppercase tracking-wider text-white/80">{label}</dt>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
