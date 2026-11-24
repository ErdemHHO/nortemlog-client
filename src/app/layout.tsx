import type { Metadata, Viewport } from "next";
import { Inter, Saira_Condensed } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/layout/footer";
import { BackToTop } from "@/components/ui/back-to-top";
import { Header } from "@/components/layout/header";
import { JsonLd } from "@/components/ui/json-ld";
import { MotionProvider } from "@/components/ui/motion";
import { offices, site } from "@/lib/site";

const display = Saira_Condensed({
  variable: "--font-saira",
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const sans = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Kapsamlı Lojistik Çözümleriyle Sınırları Aşın`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  openGraph: {
    type: "website",
    locale: site.locale,
    siteName: site.name,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#060607",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

const organizationLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${site.url}/#organization`,
      name: site.name,
      url: site.url,
      logo: `${site.url}/brand/logo-black.png`,
      legalName: site.legalName,
      email: site.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: offices[0].street,
        addressLocality: offices[0].locality,
        addressRegion: offices[0].region,
        addressCountry: offices[0].country,
      },
      location: offices.map((office) => ({
        "@type": "Place",
        name: office.title,
        address: {
          "@type": "PostalAddress",
          streetAddress: office.street,
          addressLocality: office.locality,
          ...(office.region ? { addressRegion: office.region } : {}),
          ...(office.postalCode ? { postalCode: office.postalCode } : {}),
          addressCountry: office.country,
        },
      })),
      description: site.description,
      areaServed: [
        { "@type": "Country", name: "Türkiye" },
        { "@type": "Continent", name: "Avrupa" },
      ],
      contactPoint: site.phones.map(({ tel }) => ({
        "@type": "ContactPoint",
        telephone: tel,
        contactType: "customer service",
        availableLanguage: ["Turkish"],
      })),
      sameAs: [site.social.instagram],
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: site.name,
      inLanguage: "tr-TR",
      publisher: { "@id": `${site.url}/#organization` },
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="tr" className={`${display.variable} ${sans.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#icerik"
          className="sr-only z-[60] rounded-sm bg-white px-4 py-3 font-semibold text-black focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          İçeriğe geç
        </a>
        <MotionProvider>
          <Header />
          <main id="icerik" className="flex-1">
            {children}
          </main>
          <Footer />
          <BackToTop />
        </MotionProvider>
        <JsonLd data={organizationLd} />
      </body>
    </html>
  );
}
