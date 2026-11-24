import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import { HoverCard } from "@/components/ui/motion";
import type { Service } from "@/lib/site";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <HoverCard className="h-full">
      <Link
        href={`/hizmetler#${service.slug}`}
        className="group relative flex h-full flex-col overflow-hidden rounded-sm border border-line bg-surface transition-colors duration-300 hover:border-brand/70"
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={service.image}
            alt={`${service.title} görseli`}
            width={370}
            height={462}
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 45vw, 90vw"
            className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
          <span className="absolute bottom-3 left-3 flex size-11 items-center justify-center rounded-sm bg-brand text-white">
            <Icon name={service.icon} className="size-5" />
          </span>
        </div>
        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <h3 className="font-display text-2xl font-bold uppercase leading-tight tracking-tight">
            {service.title}
          </h3>
          <p className="mt-2 flex-1 leading-relaxed text-fog">{service.summary}</p>
          <span className="mt-5 inline-flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-wider text-snow">
            Bilgi al
            <Icon name="arrow" className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    </HoverCard>
  );
}
