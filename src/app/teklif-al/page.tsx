import { QuoteForm } from "@/components/forms/quote-form";
import { ButtonAnchor } from "@/components/ui/button";
import { JsonLd } from "@/components/ui/json-ld";
import { Reveal } from "@/components/ui/motion";
import { Bracket, Container, PageHero } from "@/components/ui/section";
import { absoluteUrl, buildMetadata } from "@/lib/seo";
import { processSteps, site, whatsappUrl } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Teklif Al",
  description:
    "Türkiye'den Avrupa'ya gönderiniz için ücretsiz teklif isteyin. Formu doldurun, Nortem Log ekibi en kısa sürede sizinle iletişime geçsin.",
  path: "/teklif-al",
});

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
  return (
    <>
      <PageHero
        eyebrow="Teklif Al"
        title="Gönderiniz için teklif isteyin"
        lead="Formu doldurun; yükünüzü inceleyip size en uygun çözümle dönelim."
      />

      <Container className="grid gap-12 py-16 sm:py-24 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
        <Reveal>
          <Bracket className="border border-line bg-surface p-6 sm:p-10">
            <h2 className="sr-only">Teklif talep formu</h2>
            <QuoteForm />
          </Bracket>
        </Reveal>

        <aside aria-label="Süreç ve hızlı iletişim" className="space-y-10">
          <Reveal delay={0.1}>
            <h2 className="font-display text-2xl font-bold uppercase tracking-tight">Sonrasında ne olur?</h2>
            <ol className="mt-5 space-y-5">
              {processSteps.map(({ title, text }, index) => (
                <li key={title} className="flex gap-4">
                  <span
                    aria-hidden="true"
                    className="flex size-9 shrink-0 items-center justify-center rounded-sm border border-brand font-display text-lg font-bold text-brand-text"
                  >
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="font-semibold">{title}</h3>
                    <p className="text-fog">{text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal delay={0.15}>
            <h2 className="font-display text-2xl font-bold uppercase tracking-tight">Hemen ulaşın</h2>
            <p className="mt-2 text-fog">Acil gönderiler için doğrudan arayabilir ya da yazabilirsiniz.</p>
            <div className="mt-5 flex flex-col gap-3">
              {site.phones.map(({ display, tel }) => (
                <ButtonAnchor key={tel} href={`tel:${tel}`} variant="outline" icon="phone">
                  {display}
                </ButtonAnchor>
              ))}
              <ButtonAnchor
                href={whatsappUrl("Merhaba, Avrupa'ya gönderi için teklif almak istiyorum.")}
                target="_blank"
                rel="noopener noreferrer"
                variant="ghost"
                icon="whatsapp"
                aria-label="WhatsApp ile yazın (yeni sekmede açılır)"
              >
                WhatsApp ile yazın
              </ButtonAnchor>
              <ButtonAnchor href={`mailto:${site.email}`} variant="ghost" icon="mail">
                {site.email}
              </ButtonAnchor>
            </div>
          </Reveal>
        </aside>
      </Container>
      <JsonLd data={ld} />
    </>
  );
}
