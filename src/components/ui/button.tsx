"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { ComponentProps, ReactNode } from "react";
import { Icon, type IconId } from "@/components/ui/icon";

type Variant = "primary" | "outline" | "ghost";

const base =
  "group inline-flex min-h-12 cursor-pointer whitespace-nowrap select-none items-center justify-center gap-2 rounded-sm px-6 font-display text-base font-semibold uppercase tracking-wider transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary: "bg-brand text-white hover:bg-brand-hover",
  outline: "border border-white/30 text-snow hover:border-white hover:bg-white/5",
  ghost: "text-snow hover:text-brand-text",
};

const press = { scale: 0.97 } as const;

const MotionLink = motion.create(Link);

interface CommonProps {
  variant?: Variant;
  icon?: IconId;
  children: ReactNode;
  className?: string;
}

function Inner({ icon, children }: Pick<CommonProps, "icon" | "children">) {
  return (
    <>
      {children}
      {icon ? (
        <Icon
          name={icon}
          className="size-5 transition-transform duration-200 group-hover:translate-x-0.5"
        />
      ) : null}
    </>
  );
}

export function ButtonLink({
  variant = "primary",
  icon,
  children,
  className = "",
  ...rest
}: CommonProps &
  Omit<
    ComponentProps<typeof Link>,
    "className" | "children" | "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart"
  >) {
  return (
    <MotionLink
      whileTap={press}
      className={`${base} ${variants[variant]} ${className}`}
      {...rest}
    >
      <Inner icon={icon}>{children}</Inner>
    </MotionLink>
  );
}

/** Plain anchor for external schemes (tel:, https://wa.me) where next/link adds nothing. */
export function ButtonAnchor({
  variant = "primary",
  icon,
  children,
  className = "",
  ...rest
}: CommonProps & Omit<ComponentProps<typeof motion.a>, "className" | "children">) {
  return (
    <motion.a
      whileTap={press}
      className={`${base} ${variants[variant]} ${className}`}
      {...rest}
    >
      <Inner icon={icon}>{children}</Inner>
    </motion.a>
  );
}

export function Button({
  variant = "primary",
  icon,
  children,
  className = "",
  ...rest
}: CommonProps & Omit<ComponentProps<typeof motion.button>, "className" | "children">) {
  return (
    <motion.button
      whileTap={press}
      className={`${base} ${variants[variant]} ${className}`}
      {...rest}
    >
      <Inner icon={icon}>{children}</Inner>
    </motion.button>
  );
}
