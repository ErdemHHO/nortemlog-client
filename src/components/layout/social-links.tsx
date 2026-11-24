import { Icon, type IconId } from "@/components/ui/icon";
import { site, whatsappUrl } from "@/lib/site";

const links: { id: IconId; label: string; href: string }[] = [
  { id: "instagram", label: "Instagram", href: site.social.instagram },
  { id: "facebook", label: "Facebook", href: site.social.facebook },
  { id: "whatsapp", label: "WhatsApp", href: whatsappUrl() },
];

/** Consistent 44px touch targets; the icon is decorative, the link carries the name. */
export function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <ul className={`flex items-center gap-3 ${className}`}>
      {links.map(({ id, label, href }) => (
        <li key={id}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${site.name} ${label} (yeni sekmede açılır)`}
            className="group flex size-11 items-center justify-center rounded-sm border border-line text-fog transition-all duration-200 hover:-translate-y-0.5 hover:border-brand hover:bg-brand hover:text-white"
          >
            <Icon name={id} className="size-5" />
          </a>
        </li>
      ))}
    </ul>
  );
}
