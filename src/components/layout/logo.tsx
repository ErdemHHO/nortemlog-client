import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";

/** White transparent logo for the dark theme (trimmed 1251×298 source). */
export function Logo({ priority = false, className = "h-9" }: { priority?: boolean; className?: string }) {
  return (
    <Link href="/" aria-label={`${site.name} ana sayfa`} className="inline-flex shrink-0">
      <Image
        src="/brand/logo-white.png"
        alt={`${site.name} logosu`}
        width={1251}
        height={298}
        preload={priority}
        loading={priority ? "eager" : "lazy"}
        sizes="180px"
        className={`${className} w-auto`}
      />
    </Link>
  );
}
