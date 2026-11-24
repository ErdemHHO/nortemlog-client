"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { site } from "@/lib/site";

export function SuccessPanel({
  title,
  text,
  onReset,
  resetLabel,
}: {
  title: string;
  text: string;
  onReset: () => void;
  resetLabel: string;
}) {
  return (
    <motion.div
      role="status"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-start gap-4 py-6"
    >
      <span className="flex size-14 items-center justify-center rounded-full bg-brand/15 text-brand-text">
        <Icon name="check" className="size-7" />
      </span>
      <h3 className="font-display text-3xl font-bold uppercase tracking-tight">{title}</h3>
      <p className="max-w-md leading-relaxed text-fog">{text}</p>
      <Button type="button" variant="outline" onClick={onReset}>
        {resetLabel}
      </Button>
    </motion.div>
  );
}

export function FormAlert({
  kind,
  children,
}: {
  kind: "validation" | "server" | "limited";
  children?: React.ReactNode;
}) {
  return (
    <div
      role="alert"
      className="flex items-start gap-3 rounded-sm border border-brand/60 bg-brand/10 p-4 text-sm leading-relaxed"
    >
      <Icon name="alert" className="mt-0.5 size-5 shrink-0 text-brand-text" />
      <p>
        {kind === "validation" ? (
          "Lütfen işaretli alanları kontrol edip tekrar deneyin."
        ) : kind === "limited" ? (
          <>
            Kısa sürede çok fazla mesaj gönderildi. Lütfen birkaç dakika sonra tekrar deneyin veya
            bizi arayın:{" "}
            <a className="font-semibold underline" href={`tel:${site.phones[0].tel}`}>
              {site.phones[0].display}
            </a>
            .
          </>
        ) : (
          <>
            Mesajınız gönderilemedi. Lütfen tekrar deneyin veya bizi doğrudan arayın:{" "}
            <a className="font-semibold underline" href={`tel:${site.phones[0].tel}`}>
              {site.phones[0].display}
            </a>
            .
          </>
        )}
        {children}
      </p>
    </div>
  );
}
