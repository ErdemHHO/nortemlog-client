import Link from "next/link";
import { Logo } from "@/components/layout/logo";
import { SocialLinks } from "@/components/layout/social-links";
import { Icon } from "@/components/ui/icon";
import { Container } from "@/components/ui/section";
import { nav, offices, services, site } from "@/lib/site";

const linkClass = "inline-block py-1.5 text-fog transition-colors hover:text-white";
const headingClass = "mb-3 font-display text-lg font-bold uppercase tracking-wider";

export function Footer() {
  const hq = offices[0];

  return (
    <footer className="border-t border-line bg-surface">
      <Container className="grid gap-12 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_0.9fr_1.1fr_1.3fr]">
        <div>
          <Logo className="h-11" />
          <p className="mt-5 max-w-xs leading-relaxed text-fog">
            Kapsamlı lojistik çözümleriyle sınırları aşıyor, Türkiye&apos;den Avrupa&apos;ya
            gönderilerinizi taşıyoruz.
          </p>
          <SocialLinks className="mt-6" />
        </div>

        <nav aria-labelledby="footer-pages">
          <h2 id="footer-pages" className={headingClass}>
            Sayfalar
          </h2>
          <ul>
            {nav.map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className={linkClass}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-labelledby="footer-services">
          <h2 id="footer-services" className={headingClass}>
            Hizmetler
          </h2>
          <ul>
            {services.map(({ slug, title }) => (
              <li key={slug}>
                <Link href={`/hizmetler#${slug}`} className={linkClass}>
                  {title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className={headingClass}>İletişim</h2>
          <ul className="space-y-1">
            {site.phones.map(({ display, tel }) => (
              <li key={tel}>
                <a href={`tel:${tel}`} className={`${linkClass} inline-flex items-center gap-2`}>
                  <Icon name="phone" className="size-4 text-brand-text" />
                  {display}
                </a>
              </li>
            ))}
            <li>
              <a href={`mailto:${site.email}`} className={`${linkClass} inline-flex items-center gap-2`}>
                <Icon name="mail" className="size-4 text-brand-text" />
                {site.email}
              </a>
            </li>
            <li>
              <address className="flex items-start gap-2 py-1.5 not-italic text-fog">
                <Icon name="pin" className="mt-0.5 size-4 shrink-0 text-brand-text" />
                <span>
                  {hq.lines[0]}
                  <br />
                  {hq.lines[1]}
                </span>
              </address>
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-line">
        <Container className="flex flex-col gap-2 py-5 text-sm text-fog sm:flex-row sm:items-center sm:justify-between">
          <p>© {site.legalName}. Tüm hakları saklıdır.</p>
          <p>{offices.map((office) => office.city).join(" · ")}</p>
        </Container>
      </div>
    </footer>
  );
}
