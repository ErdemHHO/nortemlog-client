import Image from "next/image";
import { CtaBand } from "@/components/home/cta-band";
import { OfficeCards } from "@/components/home/office-cards";
import { Icon } from "@/components/ui/icon";
import { JsonLd } from "@/components/ui/json-ld";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion";
import { Bracket, PageHero, Section, SectionHeading } from "@/components/ui/section";
import { absoluteUrl, buildMetadata } from "@/lib/seo";
import { mission, site, vision, whyUs } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Hakkımızda",
  description:
    "Nortem Log; küresel vizyonu ve yerel uzmanlığıyla işletmelere özelleştirilmiş lojistik çözümleri sunar. Misyonumuzu, vizyonumuzu ve ofislerimizi tanıyın.",
  path: "/hakkimizda",
});

const ld = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AboutPage",
      "@id": absoluteUrl("/hakkimizda"),
      url: absoluteUrl("/hakkimizda"),
      name: `Hakkımızda | ${site.name}`,
      inLanguage: "tr-TR",
      about: { "@id": `${site.url}/#organization` },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: absoluteUrl("/") },
        { "@type": "ListItem", position: 2, name: "Hakkımızda", item: absoluteUrl("/hakkimizda") },
      ],
    },
  ],
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Hakkımızda"
        title="Yenilikçi lojistik, sınırsız çözümler"
        lead="Küresel vizyonumuz ve yerel uzmanlığımızla lojistikte sınırları aşıyor, işlerinizi büyütüyoruz."
      />

      <Section labelledBy="story-title">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal className="space-y-5 text-lg leading-relaxed text-fog">
            <h2 id="story-title" className="font-display text-3xl font-bold uppercase leading-tight tracking-tight text-snow sm:text-5xl">
              Ne yapıyoruz?
            </h2>
            <p>
              Müşterilerimize kapsamlı lojistik çözümleri sunuyoruz. Teknolojiyi ve yenilikçi
              stratejileri kullanarak taşımacılık ve depolama hizmetlerinde sınırları zorluyor,
              küresel ağımız ve yerel pazar bilgimizle işletmelerin her ölçekteki lojistik
              ihtiyaçlarını karşılayacak özelleştirilmiş çözümler geliştiriyoruz.
            </p>
            <p>
              Karayolu, denizyolu ve havayolu taşımacılığından gümrüklemeye, depolamadan ihracat ve
              ithalat süreçlerine kadar tüm adımlarda tek muhatapla çalışırsınız.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <Bracket className="overflow-hidden">
              <Image
                src="/images/night-haul.jpg"
                alt="Gece yola çıkan ağır yük tırı"
                width={1344}
                height={896}
                sizes="(min-width: 1024px) 560px, 100vw"
                className="aspect-[3/2] w-full object-cover"
              />
            </Bracket>
          </Reveal>
        </div>
      </Section>

      <Section labelledBy="mv-title" className="border-y border-line bg-surface">
        <SectionHeading id="mv-title" eyebrow="Misyon ve vizyon" title="Hedefimiz sizin başarınız" />
        <Stagger className="grid gap-5 md:grid-cols-2">
          {[
            { title: "Misyonumuz", text: mission, icon: "shield" as const },
            { title: "Vizyonumuz", text: vision, icon: "globe" as const },
          ].map(({ title, text, icon }) => (
            <StaggerItem key={title}>
              <Bracket className="h-full border border-line bg-ink p-7 sm:p-10">
                <Icon name={icon} className="mb-5 size-9 text-brand-text" />
                <h3 className="font-display text-3xl font-bold uppercase tracking-tight">{title}</h3>
                <p className="mt-3 text-lg leading-relaxed text-fog">{text}</p>
              </Bracket>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <Section labelledBy="values-title">
        <SectionHeading id="values-title" eyebrow="Neden Nortem Log?" title="Çalışma prensiplerimiz" />
        <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {whyUs.map(({ icon, title, text }) => (
            <StaggerItem key={title}>
              <div className="h-full rounded-sm border border-line bg-surface p-7">
                <Icon name={icon} className="mb-4 size-7 text-brand-text" />
                <h3 className="font-display text-2xl font-bold uppercase tracking-tight">{title}</h3>
                <p className="mt-2 leading-relaxed text-fog">{text}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <Section labelledBy="offices-title" className="border-t border-line bg-surface">
        <SectionHeading id="offices-title" eyebrow="Lokasyonlarımız" title="Ofislerimiz" />
        <OfficeCards />
      </Section>

      <div className="pt-16 sm:pt-24">
        <CtaBand
          title="Birlikte çalışalım"
          text="Gönderi ihtiyacınızı paylaşın, size en uygun çözümü birlikte planlayalım."
        />
      </div>
      <JsonLd data={ld} />
    </>
  );
}
