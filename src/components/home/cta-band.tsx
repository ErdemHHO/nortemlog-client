import { ButtonAnchor, ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/motion";
import { Bracket, Container } from "@/components/ui/section";
import { quoteHref, site, whatsappUrl } from "@/lib/site";

export function CtaBand({
  title = "Gönderiniz için teklif alın",
  text = "Çıkış ve varış noktasını, yükünüzü paylaşın; size en uygun çözümle dönelim.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section aria-labelledby="cta-title" className="pb-16 sm:pb-24">
      <Container>
        <Reveal>
          <Bracket className="overflow-hidden border border-line bg-surface px-6 py-12 sm:px-14 sm:py-16">
            <div
              aria-hidden="true"
              className="absolute -right-20 -bottom-24 size-80 rounded-full bg-brand/25 blur-[100px]"
            />
            <div className="relative max-w-2xl">
              <h2
                id="cta-title"
                className="text-balance font-display text-4xl font-bold uppercase leading-[1.02] tracking-tight sm:text-5xl"
              >
                {title}
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-fog">{text}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href={quoteHref} icon="arrow">
                  Teklif Al
                </ButtonLink>
                <ButtonAnchor
                  href={whatsappUrl("Merhaba, Avrupa'ya gönderi için bilgi almak istiyorum.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outline"
                  icon="whatsapp"
                  aria-label="WhatsApp ile yazın (yeni sekmede açılır)"
                >
                  WhatsApp
                </ButtonAnchor>
                <ButtonAnchor href={`tel:${site.phones[0].tel}`} variant="ghost" icon="phone">
                  Ara
                </ButtonAnchor>
              </div>
            </div>
          </Bracket>
        </Reveal>
      </Container>
    </section>
  );
}
