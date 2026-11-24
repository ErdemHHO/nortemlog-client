import { ButtonAnchor } from "@/components/ui/button";
import { Bracket } from "@/components/ui/section";
import { offices, site } from "@/lib/site";

/** Google Maps embed (Ankara office) with a dark-theme filter and a directions shortcut. */
export function MapEmbed() {
  const ankara = offices[0];
  return (
    <Bracket className="overflow-hidden border border-line bg-surface">
      <iframe
        title={`${site.legalName}, ${ankara.title} konumu`}
        src={site.map.embedUrl}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
        className="block h-[22rem] w-full border-0 [filter:invert(0.92)_hue-rotate(180deg)_grayscale(0.7)_contrast(1.05)_brightness(0.9)] sm:h-[26rem]"
      />
      <div className="flex flex-col gap-4 border-t border-line p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div>
          <p className="font-display text-xl font-bold uppercase tracking-tight">{ankara.title}</p>
          <p className="text-fog">{ankara.lines.join(", ")}</p>
        </div>
        <ButtonAnchor
          href={site.map.directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          variant="outline"
          icon="arrow"
          aria-label="Google Haritalar'da yol tarifi al (yeni sekmede açılır)"
        >
          Yol tarifi al
        </ButtonAnchor>
      </div>
    </Bracket>
  );
}
