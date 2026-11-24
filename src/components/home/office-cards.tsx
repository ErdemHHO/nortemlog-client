import { Icon } from "@/components/ui/icon";
import { HoverCard, Stagger, StaggerItem } from "@/components/ui/motion";
import { offices } from "@/lib/site";

export function OfficeCards() {
  return (
    <Stagger as="ul" className="grid gap-5 md:grid-cols-3">
      {offices.map((office) => (
        <StaggerItem as="li" key={office.id}>
          <HoverCard className="h-full">
            <article
              aria-labelledby={`office-${office.id}`}
              className="relative h-full rounded-sm border border-line bg-surface p-6 sm:p-7"
            >
              <span
                aria-hidden="true"
                className="absolute -top-px -left-px size-4 border-t-2 border-l-2 border-white"
              />
              <span className="mb-5 flex size-11 items-center justify-center rounded-sm bg-brand/15 text-brand-text">
                <Icon name="pin" className="size-5" />
              </span>
              <h3
                id={`office-${office.id}`}
                className="font-display text-2xl font-bold uppercase tracking-tight"
              >
                {office.title}
              </h3>
              <address className="mt-3 space-y-0.5 not-italic leading-relaxed text-fog">
                {office.lines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
                {office.note ? <p className="pt-1 text-sm">({office.note})</p> : null}
              </address>
            </article>
          </HoverCard>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
