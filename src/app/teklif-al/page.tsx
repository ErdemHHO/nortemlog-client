import { ButtonAnchor } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { JsonLd } from "@/components/ui/json-ld";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion";
import { Bracket, Container, PageHero, Section, SectionHeading } from "@/components/ui/section";
import { absoluteUrl, buildMetadata } from "@/lib/seo";
import { processSteps, site, whatsappUrl } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Teklif Al",
  description:
    "Türkiye'den Avrupa'ya gönderiniz için teklif isteyin. WhatsApp, telefon veya e-posta ile yük bilgilerinizi paylaşın, Nortem Log ekibi size dönsün.",
  path: "/teklif-al",
});

const shareList = [
  "Çıkış ve varış noktası (şehir / ülke)",
  "Yükün türü, adedi ve yaklaşık ağırlığı",
  "Ölçüler veya palet sayısı",
  "Tercih ettiğiniz taşıma türü (kara, deniz, hava, parsiyel, ekspres)",
  "Gönderi için istediğiniz tarih aralığı",
] as const;

const ld = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": absoluteUrl("/teklif-al"),
      url: absoluteUrl("/teklif-al"),
      name: `Teklif Al | ${site.name}`,
      inLanguage: "tr-TR",
      isPartOf: { "@id": `${site.url}/#website` },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: absoluteUrl("/") },
        { "@type": "ListItem", position: 2, name: "Teklif Al", item: absoluteUrl("/teklif-al") },
      ],
    },
  ],
};

export default function QuotePage() {
  const message = "Merhaba, Avrupa'ya gönderi için teklif almak istiyorum.";

  return (
    <>
      <PageHero
        eyebrow="Teklif Al"
        title="Gönderiniz için teklif isteyin"
        lead="Yükünüzün bilgilerini bize iletin; inceleyip size en uygun çözümle ve teklifle dönelim."
      />

      <Container className="grid gap-12 py-16 sm:py-24 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
        <Reveal>
          <Bracket className="border border-line bg-surface p-6 sm:p-10">
            <h2 className="font-display text-3xl font-bold uppercase leading-tight tracking-tight sm:text-4xl">
              Teklif için bize şunları iletin
            </h2>
            <ul className="mt-6 space-y-3">
              {shareList.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Icon name="check" className="mt-0.5 size-5 shrink-0 text-brand-text" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonAnchor
                href={whatsappUrl(message)}
                target="_blank"
                rel="noopener noreferrer"
                icon="whatsapp"
                aria-label="WhatsApp ile teklif isteyin (yeni sekmede açılır)"
              >
                WhatsApp ile yazın
              </ButtonAnchor>
              <ButtonAnchor
                href={`mailto:${site.email}?subject=${encodeURIComponent("Teklif talebi")}`}
                variant="outline"
                icon="mail"
              >
                E-posta gönderin
              </ButtonAnchor>
            </div>
          </Bracket>
        </Reveal>

        <Reveal delay={0.1}>
          <aside aria-label="Hızlı iletişim">
            <h2 className="font-display text-2xl font-bold uppercase tracking-tight">Hemen ulaşın</h2>
            <p className="mt-2 text-fog">Acil gönderiler için doğrudan arayabilirsiniz.</p>
            <div className="mt-5 flex flex-col gap-3">
              {site.phones.map(({ display, tel }) => (
                <ButtonAnchor key={tel} href={`tel:${tel}`} variant="outline" icon="phone">
                  {display}
                </ButtonAnchor>
              ))}
            </div>
          </aside>
        </Reveal>
      </Container>

      <Section labelledBy="steps-title" className="border-t border-line bg-surface">
        <SectionHeading id="steps-title" eyebrow="Süreç" title="Sonrasında ne olur?" />
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
      <JsonLd data={ld} />
    </>
  );
}
