import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/motion";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-7xl px-5 sm:px-8 ${className}`}>{children}</div>
  );
}

export function Section({
  children,
  className = "",
  id,
  labelledBy,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  labelledBy?: string;
}) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={`py-16 sm:py-24 ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="mb-4 flex items-center gap-3 font-display text-sm font-semibold uppercase tracking-[0.2em] text-brand-text">
      <span aria-hidden="true" className="h-px w-8 bg-brand" />
      {children}
    </p>
  );
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  lead,
}: {
  id: string;
  eyebrow: string;
  title: string;
  lead?: string;
}) {
  return (
    <Reveal className="mb-10 max-w-2xl sm:mb-14">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2
        id={id}
        className="text-balance font-display text-3xl font-bold uppercase leading-[1.05] tracking-tight sm:text-5xl"
      >
        {title}
      </h2>
      {lead ? <p className="mt-4 text-lg leading-relaxed text-fog">{lead}</p> : null}
    </Reveal>
  );
}

/** Page hero used by inner pages. The H1 lives here so every page has exactly one. */
export function PageHero({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: string;
  lead: string;
}) {
  return (
    <header className="relative overflow-hidden border-b border-line pt-32 pb-14 sm:pt-40 sm:pb-20">
      <div aria-hidden="true" className="bg-grid absolute inset-0" />
      <div
        aria-hidden="true"
        className="absolute -top-32 right-0 size-96 rounded-full bg-brand/15 blur-[120px]"
      />
      <Container className="relative">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="text-balance max-w-3xl font-display text-4xl font-bold uppercase leading-[1.02] tracking-tight sm:text-6xl">
          {title}
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-fog">{lead}</p>
      </Container>
    </header>
  );
}

/** Logo-inspired corner brackets that frame any block. */
export function Bracket({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-px -left-px size-5 border-t-2 border-l-2 border-white"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-px -bottom-px size-5 border-r-2 border-b-2 border-white"
      />
      {children}
    </div>
  );
}
