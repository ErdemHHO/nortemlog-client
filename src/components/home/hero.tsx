"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ButtonAnchor, ButtonLink } from "@/components/ui/button";
import { Container, Eyebrow } from "@/components/ui/section";
import { quoteHref, site } from "@/lib/site";

const EASE = [0.22, 1, 0.36, 1] as const;

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: EASE },
});

export function Hero() {
  const primaryPhone = site.phones[0];

  return (
    <section
      aria-labelledby="hero-title"
      className="relative flex min-h-[44rem] items-center overflow-hidden border-b border-line pt-28 pb-16 sm:min-h-[48rem] sm:pt-36 sm:pb-24"
    >
      <Image
        src="/images/hero-truck.jpg"
        alt="Nortem Log logolu tır karayolunda ilerliyor"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[70%_center]"
      />
      {/* Brand-dark scrims keep the headline readable on any crop */}
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/20 sm:via-ink/70" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />
      <div
        aria-hidden="true"
        className="absolute -top-40 -left-24 size-[28rem] rounded-full bg-brand/25 blur-[130px]"
      />

      <Container className="relative">
        <div className="max-w-2xl">
          <motion.div {...fade(0)}>
            <Eyebrow>Türkiye → Avrupa</Eyebrow>
          </motion.div>
          <motion.h1
            id="hero-title"
            {...fade(0.08)}
            className="text-balance font-display text-5xl font-bold uppercase leading-[0.98] tracking-tight sm:text-7xl"
          >
            Kapsamlı lojistik çözümleriyle{" "}
            <span className="text-brand-text">sınırları aşın.</span>
          </motion.h1>
          <motion.p {...fade(0.16)} className="mt-6 max-w-xl text-lg leading-relaxed text-white/80 sm:text-xl">
            Uluslararası standartlarda, kesintisiz ve güvenilir lojistik hizmetlerimizle işinizin
            sınırlarını genişletin. Türkiye&apos;den Avrupa&apos;ya tüm gönderileriniz için yanınızdayız.
          </motion.p>
          <motion.div {...fade(0.24)} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={quoteHref} icon="arrow">
              Teklif Al
            </ButtonLink>
            <ButtonAnchor href={`tel:${primaryPhone.tel}`} variant="outline" icon="phone">
              {primaryPhone.display}
            </ButtonAnchor>
          </motion.div>
          <motion.ul
            {...fade(0.32)}
            className="mt-10 flex flex-wrap gap-x-6 gap-y-2 font-display text-sm font-semibold uppercase tracking-[0.18em] text-white/70"
          >
            {["Karayolu", "Denizyolu", "Havayolu", "Parsiyel"].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span aria-hidden="true" className="size-1.5 bg-brand" />
                {item}
              </li>
            ))}
          </motion.ul>
        </div>
      </Container>
    </section>
  );
}
