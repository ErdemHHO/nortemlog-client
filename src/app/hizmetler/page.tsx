import Image from "next/image";
import { CtaBand } from "@/components/home/cta-band";
import { ButtonAnchor } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { JsonLd } from "@/components/ui/json-ld";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion";
import { Bracket, Container, PageHero, Section, SectionHeading } from "@/components/ui/section";
import { absoluteUrl, buildMetadata } from "@/lib/seo";
import { carried, services, site, whatsappUrl } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Hizmetler",
  description:
    "Karayolu, denizyolu, havayolu, parsiyel ve ekspres taşımacılık; depolama, gümrükleme ile ihracat-ithalat hizmetleri. Nortem Log hizmetlerini inceleyin.",
  path: "/hizmetler",
});

const ld = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ItemList",
      name: `${site.name} hizmetleri`,
      itemListElement: services.map((service, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Service",
          name: service.title,
          description: service.detail,
          url: absoluteUrl(`/hizmetler#${service.slug}`),
          serviceType: "Uluslararası lojistik ve taşımacılık",
          provider: { "@id": `${site.url}/#organization` },
        },
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: absoluteUrl("/") },
        { "@type": "ListItem", position: 2, name: "Hizmetler", item: absoluteUrl("/hizmetler") },
      ],
    },
  ],
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Hizmetlerimiz"
        title="Her yük, her yolculuk için özel çözümler"
        lead="Her ölçekteki müşteriye taşımacılık, depolama, gümrükleme ve özel lojistik projeler dahil geniş hizmet yelpazesi sunuyoruz."
      />

      <Container className="space-y-6 py-16 sm:space-y-8 sm:py-24">
        {services.map((service, index) => (
          <Reveal key={service.slug}>
            <Bracket>
              <article
                id={service.slug}
                aria-labelledby={`${service.slug}-title`}
                className="grid scroll-mt-28 overflow-hidden border border-line bg-surface lg:grid-cols-[0.8fr_1.2fr]"
              >
                <div className={`relative min-h-64 ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                  <Image
                    src={service.image}
                    alt={`${service.title} görseli`}
                    fill
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="object-cover"
                  />
                  <span className="absolute bottom-4 left-4 flex size-12 items-center justify-center rounded-sm bg-brand text-white">
                    <Icon name={service.icon} className="size-6" />
                  </span>
                </div>
                <div className="p-6 sm:p-10">
                  <p aria-hidden="true" className="font-display text-5xl font-bold leading-none text-white/10">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h2
                    id={`${service.slug}-title`}
                    className="mt-2 font-display text-3xl font-bold uppercase leading-tight tracking-tight sm:text-4xl"
                  >
                    {service.title}
                  </h2>
                  <p className="mt-3 text-lg leading-relaxed text-fog">{service.detail}</p>
                  <ul className="mt-5 space-y-2.5">
                    {service.points.map((point) => (
                      <li key={point} className="flex items-start gap-3">
                        <Icon name="check" className="mt-0.5 size-5 shrink-0 text-brand-text" />
                        {point}
                      </li>
                    ))}
                  </ul>
                  <ButtonAnchor
                    href={whatsappUrl(`Merhaba, ${service.title} hakkında bilgi almak istiyorum.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="outline"
                    icon="whatsapp"
                    className="mt-7"
                    aria-label={`${service.title} için WhatsApp'tan bilgi al (yeni sekmede açılır)`}
                  >
                    Bilgi al
                  </ButtonAnchor>
                </div>
              </article>
            </Bracket>
          </Reveal>
        ))}
      </Container>

      <Section labelledBy="carry-title" className="border-y border-line bg-surface">
        <SectionHeading id="carry-title" eyebrow="Neler taşıyoruz?" title="Taşıdığımız yük türleri" />
        <Stagger as="ul" className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {carried.map((item) => (
            <StaggerItem
              as="li"
              key={item}
              className="flex min-h-20 items-center gap-3 rounded-sm border border-line bg-ink px-4 py-3"
            >
              <Icon name="package" className="size-5 shrink-0 text-brand-text" />
              <span className="font-display text-lg font-semibold uppercase leading-tight tracking-wide">
                {item}
              </span>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <div className="pt-16 sm:pt-24">
        <CtaBand />
      </div>
      <JsonLd data={ld} />
    </>
  );
}
