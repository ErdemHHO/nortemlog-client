import Image from "next/image";
import { CtaBand } from "@/components/home/cta-band";
import { Hero } from "@/components/home/hero";
import { OfficeCards } from "@/components/home/office-cards";
import { ServiceCard } from "@/components/home/service-card";
import { ButtonLink } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion";
import { Bracket, Eyebrow, Section, SectionHeading } from "@/components/ui/section";
import { buildMetadata } from "@/lib/seo";
import { carried, mission, processSteps, services, vision, whyUs } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Nortem Log | Kapsamlı Lojistik Çözümleriyle Sınırları Aşın",
  description:
    "Nortem Log; karayolu, denizyolu, havayolu, parsiyel ve ekspres taşımacılık, depolama, gümrükleme ve ihracat-ithalat hizmetleriyle Türkiye'den Avrupa'ya güvenilir lojistik. Hemen teklif alın.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />

      <Section labelledBy="services-title">
        <SectionHeading
          id="services-title"
          eyebrow="Hizmetlerimiz"
          title="Her yük, her yolculuk için özel çözümler"
          lead="Taşımacılık, depolama, gümrükleme ve özel lojistik projeler dahil geniş hizmet yelpazesi sunuyoruz."
        />
        <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <StaggerItem key={service.slug}>
              <ServiceCard service={service} />
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <Section labelledBy="about-title" className="border-y border-line bg-surface">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <Bracket className="overflow-hidden">
              <Image
                src="/images/port.jpg"
                alt="Liman sahasında konteyner taşıyan tırlar"
                width={1024}
                height={1024}
                sizes="(min-width: 1024px) 560px, 100vw"
                className="aspect-[4/3] w-full object-cover"
              />
            </Bracket>
          </Reveal>
          <Reveal delay={0.1}>
            <Eyebrow>Hakkımızda</Eyebrow>
            <h2
              id="about-title"
              className="text-balance font-display text-3xl font-bold uppercase leading-[1.05] tracking-tight sm:text-5xl"
            >
              Yenilikçi lojistik, sınırsız çözümler
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-fog">
              Küresel vizyonumuz ve yerel uzmanlığımızla lojistikte sınırları aşıyor, işlerinizi
              büyütüyoruz. Her ölçekteki işletmenin lojistik ihtiyacına özel çözümler geliştiriyoruz.
            </p>
            <dl className="mt-8 grid gap-6 sm:grid-cols-2">
              <div className="border-l-2 border-brand pl-5">
                <dt className="font-display text-xl font-bold uppercase tracking-wide">Misyonumuz</dt>
                <dd className="mt-1 leading-relaxed text-fog">{mission}</dd>
              </div>
              <div className="border-l-2 border-brand pl-5">
                <dt className="font-display text-xl font-bold uppercase tracking-wide">Vizyonumuz</dt>
                <dd className="mt-1 leading-relaxed text-fog">{vision}</dd>
              </div>
            </dl>
            <ButtonLink href="/hakkimizda" variant="outline" icon="arrow" className="mt-8">
              Daha fazla bilgi
            </ButtonLink>
          </Reveal>
        </div>
      </Section>

      <section aria-labelledby="carry-title" className="relative overflow-hidden py-16 sm:py-24">
        <Image
          src="/images/storage.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-25"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-ink via-ink/70 to-ink" />
        <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-8">
          <SectionHeading
            id="carry-title"
            eyebrow="Neler taşıyoruz?"
            title="Kimlere, neleri taşıyoruz"
            lead="Bireysel eşyalardan sanayi ürünlerine kadar farklı yük türleri için çözümümüz var."
          />
          <Stagger as="ul" className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {carried.map((item) => (
              <StaggerItem
                as="li"
                key={item}
                className="flex min-h-20 items-center gap-3 rounded-sm border border-line bg-surface/80 px-4 py-3 backdrop-blur-sm transition-colors hover:border-brand/70"
              >
                <Icon name="package" className="size-5 shrink-0 text-brand-text" />
                <span className="font-display text-lg font-semibold uppercase leading-tight tracking-wide">
                  {item}
                </span>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <Section labelledBy="why-title" className="border-y border-line bg-surface">
        <SectionHeading id="why-title" eyebrow="Neden Nortem Log?" title="Sizin kargonuz, sizin kurallarınız" />
        <Stagger className="grid gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {whyUs.map(({ icon, title, text }) => (
            <StaggerItem key={title} className="bg-ink p-7 sm:p-8">
              <Icon name={icon} className="mb-5 size-8 text-brand-text" />
              <h3 className="font-display text-2xl font-bold uppercase tracking-tight">{title}</h3>
              <p className="mt-2 leading-relaxed text-fog">{text}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <Section labelledBy="process-title">
        <SectionHeading id="process-title" eyebrow="Nasıl çalışıyoruz" title="Dört adımda varış noktasında" />
        <Stagger as="ol" className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map(({ title, text }, index) => (
            <StaggerItem as="li" key={title} className="border-l-2 border-brand pl-6">
              <span aria-hidden="true" className="font-display text-6xl font-bold leading-none text-white/10">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 font-display text-2xl font-bold uppercase tracking-tight">{title}</h3>
              <p className="mt-2 leading-relaxed text-fog">{text}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <Section labelledBy="offices-title" className="border-t border-line bg-surface">
        <SectionHeading
          id="offices-title"
          eyebrow="Lokasyonlarımız"
          title="Türkiye'de ve Avrupa'da ofislerimiz"
        />
        <OfficeCards />
      </Section>

      <div className="pt-16 sm:pt-24">
        <CtaBand />
      </div>
    </>
  );
}
