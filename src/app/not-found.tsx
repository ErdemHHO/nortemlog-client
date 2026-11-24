import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/section";

export const metadata: Metadata = {
  title: "Sayfa bulunamadı",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <Container className="flex min-h-[70dvh] flex-col items-start justify-center gap-6 pt-28">
      <p className="font-display text-8xl font-bold leading-none text-brand-text sm:text-9xl">404</p>
      <h1 className="font-display text-4xl font-bold uppercase tracking-tight sm:text-5xl">
        Aradığınız sayfa bulunamadı
      </h1>
      <p className="max-w-md text-lg text-fog">Adres değişmiş ya da sayfa kaldırılmış olabilir.</p>
      <ButtonLink href="/" icon="arrow">
        Ana sayfaya dön
      </ButtonLink>
    </Container>
  );
}
