import { CtaBand } from "@/components/home/cta-band";
import { MapEmbed } from "@/components/home/map-embed";
import { OfficeCards } from "@/components/home/office-cards";
import { ButtonAnchor } from "@/components/ui/button";
import { Icon, type IconId } from "@/components/ui/icon";
import { JsonLd } from "@/components/ui/json-ld";
import { HoverCard, Reveal, Stagger, StaggerItem } from "@/components/ui/motion";
import { Bracket, Container, PageHero, Section, SectionHeading } from "@/components/ui/section";
import { absoluteUrl, buildMetadata } from "@/lib/seo";
import { site, whatsappUrl } from "@/lib/site";

export const metadata = buildMetadata({
  title: "İletişim",
  description:
    "Nortem Log ile iletişime geçin: telefon, WhatsApp, e-posta ve Instagram üzerinden ulaşın; Ankara, İstanbul ve Almanya ofislerimizi görün.",
  path: "/iletisim",
});

const ld = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ContactPage",
      "@id": absoluteUrl("/iletisim"),
      url: absoluteUrl("/iletisim"),
      name: `İletişim | ${site.name}`,
      inLanguage: "tr-TR",
      about: { "@id": `${site.url}/#organization` },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: absoluteUrl("/") },
        { "@type": "ListItem", position: 2, name: "İletişim", item: absoluteUrl("/iletisim") },
      ],
    },
  ],
};

const socials: { id: IconId; name: string; text: string; href: string }[] = [
  {
    id: "instagram",
    name: "Instagram",
    text: "Duyurular ve sevkiyatlarımızdan kareler",
    href: site.social.instagram,
  },
];

const channelCard =
  "group relative flex h-full flex-col gap-4 rounded-sm border border-line bg-surface p-6 transition-colors duration-300 hover:border-brand/70 sm:p-7";

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="İletişim"
        title="Bize hemen ulaşın"
        lead="Gönderiniz hakkında sormak istediklerinizi telefon, WhatsApp veya e-posta ile iletin; ekibimiz size doğrudan yanıt versin."
      />

      <Container className="grid gap-6 py-16 sm:py-24 lg:grid-cols-12 lg:gap-8">
        <div className="space-y-6 lg:col-span-7">
          <Reveal>
            <a
              href={whatsappUrl("Merhaba, Avrupa'ya gönderi için bilgi almak istiyorum.")}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp ile yazın (yeni sekmede açılır)"
              className="group relative flex flex-col gap-6 overflow-hidden rounded-sm bg-brand p-7 transition-colors duration-300 hover:bg-brand-hover sm:p-10"
            >
              <div aria-hidden="true" className="absolute -right-16 -bottom-20 size-72 rounded-full bg-black/20 blur-3xl" />
              <span className="relative flex size-14 items-center justify-center rounded-sm bg-white/15">
                <Icon name="whatsapp" className="size-7 text-white" />
              </span>
              <div className="relative">
                <p className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-white/80">
                  En hızlı yol
                </p>
                <p className="mt-1 font-display text-4xl font-bold uppercase leading-tight tracking-tight text-white sm:text-5xl">
                  WhatsApp&apos;tan yazın
                </p>
                <p className="mt-3 max-w-md text-lg leading-relaxed text-white/90">
                  Çıkış, varış ve yük bilgisini mesaj olarak iletin; size dönüş yapalım.
                </p>
              </div>
              <span className="relative inline-flex items-center gap-2 font-display text-lg font-semibold uppercase tracking-wider text-white">
                {site.phones[0].display}
                <Icon name="arrow" className="size-5 transition-transform duration-200 group-hover:translate-x-1" />
              </span>
            </a>
          </Reveal>

          <Stagger className="grid gap-6 sm:grid-cols-2">
            {site.phones.map(({ display, tel }, index) => (
              <StaggerItem key={tel}>
                <HoverCard className="h-full">
                  <a
                    href={`tel:${tel}`}
                    aria-label={`${index === 0 ? "Birinci" : "İkinci"} numarayı ara: ${display}`}
                    className={channelCard}
                  >
                    <span className="flex size-12 items-center justify-center rounded-sm bg-brand/15 text-brand-text">
                      <Icon name="phone" className="size-6" />
                    </span>
                    <div>
                      <p className="text-sm text-fog">{index === 0 ? "Telefon 1" : "Telefon 2"}</p>
                      <p className="mt-1 whitespace-nowrap font-display text-2xl font-bold tracking-wide lg:text-xl xl:text-2xl 2xl:text-3xl">
                        {display}
                      </p>
                    </div>
                    <span className="mt-auto inline-flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-wider">
                      Şimdi ara
                      <Icon name="arrow" className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </span>
                  </a>
                </HoverCard>
              </StaggerItem>
            ))}
            <StaggerItem className="sm:col-span-2">
              <HoverCard>
                <a href={`mailto:${site.email}`} className={`${channelCard} sm:flex-row sm:items-center`}>
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-sm bg-brand/15 text-brand-text">
                    <Icon name="mail" className="size-6" />
                  </span>
                  <div className="flex-1">
                    <p className="text-sm text-fog">E-posta</p>
                    <p className="mt-1 break-all font-display text-2xl font-bold tracking-wide sm:text-3xl">
                      {site.email}
                    </p>
                  </div>
                  <Icon name="arrow" className="size-6 text-fog transition-transform duration-200 group-hover:translate-x-1 group-hover:text-white" />
                </a>
              </HoverCard>
            </StaggerItem>
          </Stagger>
        </div>

        <Reveal delay={0.1} className="lg:col-span-5">
          <Bracket className="flex h-full flex-col justify-between gap-8 overflow-hidden border border-line bg-surface p-6 sm:p-8">
            <div aria-hidden="true" className="absolute -top-24 -right-24 size-72 rounded-full bg-brand/15 blur-[90px]" />
            <div className="relative">
              <h2 className="font-display text-3xl font-bold uppercase leading-tight tracking-tight">
                Teklif için bize yazın
              </h2>
              <p className="mt-3 leading-relaxed text-fog">
                Çıkış ve varış noktasını, yük bilgilerinizi e-posta ile paylaşın; size özel teklifle
                dönelim.
              </p>
            </div>
            <div className="relative">
              <ButtonAnchor href={`mailto:${site.email}`} icon="mail" className="w-full sm:w-auto">
                E-posta gönder
              </ButtonAnchor>
            </div>
          </Bracket>
        </Reveal>
      </Container>

      <Section labelledBy="map-title" className="border-y border-line bg-surface">
        <SectionHeading
          id="map-title"
          eyebrow="Konum"
          title="Ofislerimiz ve harita"
          lead="Ankara merkez ofisimizi haritada görün, yol tarifi alın."
        />
        <div className="space-y-6">
          <Reveal>
            <MapEmbed />
          </Reveal>
          <OfficeCards />
        </div>
      </Section>

      <Section labelledBy="social-title">
        <SectionHeading
          id="social-title"
          eyebrow="Sosyal medya"
          title="Bizi takip edin"
          lead="Güncel paylaşımlarımız için sosyal medya hesaplarımıza göz atın."
        />
        <Stagger as="ul" className="grid gap-6">
          {socials.map(({ id, name, text, href }) => (
            <StaggerItem as="li" key={id}>
              <HoverCard>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${site.name} ${name} (yeni sekmede açılır)`}
                  className="group flex items-center gap-5 rounded-sm border border-line bg-surface p-6 transition-colors duration-300 hover:border-brand/70 sm:p-8"
                >
                  <span className="flex size-16 shrink-0 items-center justify-center rounded-sm border border-line text-snow transition-colors duration-300 group-hover:border-brand group-hover:bg-brand">
                    <Icon name={id} className="size-8" />
                  </span>
                  <span className="flex-1">
                    <span className="block font-display text-2xl font-bold uppercase tracking-tight">{name}</span>
                    <span className="mt-1 block text-fog">{text}</span>
                  </span>
                  <Icon name="arrow" className="size-6 shrink-0 text-fog transition-transform duration-200 group-hover:translate-x-1 group-hover:text-white" />
                </a>
              </HoverCard>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <CtaBand
        title="Gönderiniz için hazırız"
        text="Çıkış ve varış noktasını paylaşın, size en uygun çözümle dönelim."
      />
      <JsonLd data={ld} />
    </>
  );
}
