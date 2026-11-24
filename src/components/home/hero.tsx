"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { RouteMap } from "@/components/home/route-map";
import { ButtonAnchor } from "@/components/ui/button";
import { Container, Eyebrow } from "@/components/ui/section";
import { site, whatsappUrl } from "@/lib/site";

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
      className="relative flex items-center overflow-hidden border-b border-line pt-28 pb-16 sm:pt-36 sm:pb-24 lg:min-h-[48rem]"
    >
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_60%_70%_at_75%_50%,rgb(214_42_47/0.14),transparent_70%)]" />
      <div
        aria-hidden="true"
        className="absolute -top-40 -left-24 size-[28rem] rounded-full bg-brand/25 blur-[130px]"
      />

      {/* Translucent truck photo behind the route map, faded into the dark hero */}
      <div
        aria-hidden="true"
        className="absolute inset-y-0 right-0 hidden w-[58%] opacity-45 [mask-image:linear-gradient(to_right,transparent,black_55%)] lg:block"
      >
        <Image
          src="/images/hero-truck.jpg"
          alt=""
          fill
          priority
          sizes="(min-width: 1024px) 58vw, 100vw"
          className="object-cover object-[70%_center]"
        />
      </div>

      <Container className="relative grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="max-w-xl">
          <motion.div {...fade(0)}>
            <Eyebrow>Türkiye → Avrupa</Eyebrow>
          </motion.div>
          <motion.h1
            id="hero-title"
            {...fade(0.08)}
            className="text-balance font-display text-5xl font-bold uppercase leading-[0.98] tracking-tight sm:text-6xl xl:text-7xl"
          >
            Kapsamlı lojistik çözümleriyle{" "}
            <span className="text-brand-text">sınırları aşın.</span>
          </motion.h1>
          <motion.p {...fade(0.16)} className="mt-6 max-w-xl text-lg leading-relaxed text-white/80 sm:text-xl">
            Uluslararası standartlarda, kesintisiz ve güvenilir lojistik hizmetlerimizle işinizin
            sınırlarını genişletin. Türkiye&apos;den Avrupa&apos;ya tüm gönderileriniz için yanınızdayız.
          </motion.p>
          <motion.div {...fade(0.24)} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonAnchor
              href={whatsappUrl("Merhaba, Avrupa'ya gönderi için bilgi almak istiyorum.")}
              target="_blank"
              rel="noopener noreferrer"
              icon="whatsapp"
              aria-label="WhatsApp ile yazın (yeni sekmede açılır)"
            >
              WhatsApp ile yazın
            </ButtonAnchor>
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

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="pointer-events-none hidden w-full lg:block"
        >
          <RouteMap />
        </motion.div>
      </Container>
    </section>
  );
}
