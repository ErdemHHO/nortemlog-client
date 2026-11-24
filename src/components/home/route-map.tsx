"use client";

import { motion } from "framer-motion";
import { useId } from "react";

const origin = { x: 90, y: 310 };
const destinations = [
  { x: 290, y: 140 },
  { x: 430, y: 92 },
  { x: 480, y: 220 },
  { x: 350, y: 262 },
] as const;

const curve = (to: { x: number; y: number }) =>
  `M${origin.x} ${origin.y} Q ${(origin.x + to.x) / 2} ${Math.min(origin.y, to.y) - 80} ${to.x} ${to.y}`;

/** Schematic Türkiye → Europe route diagram. Decorative illustration, labelled for screen readers. */
export function RouteMap() {
  const dotsId = `dots-${useId().replace(/:/g, "")}`;
  return (
    <svg
      viewBox="0 0 560 420"
      role="img"
      aria-label="Türkiye'den Avrupa'daki varış noktalarına uzanan gönderi rotalarını gösteren şematik çizim"
      className="h-auto w-full"
    >
      <defs>
        <pattern id={dotsId} width="28" height="28" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.2" fill="#fff" opacity="0.14" />
        </pattern>
      </defs>
      <rect width="560" height="420" fill={`url(#${dotsId})`} />

      {/* Logo-style corner brackets */}
      <path d="M8 60V8h52" fill="none" stroke="#fff" strokeWidth="3" />
      <path d="M552 360v52h-52" fill="none" stroke="#fff" strokeWidth="3" />

      {destinations.map((to, index) => (
        <motion.path
          key={`${to.x}-${to.y}`}
          d={curve(to)}
          fill="none"
          stroke="#d62a2f"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="2 9"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.4, delay: 0.5 + index * 0.25, ease: "easeOut" }}
        />
      ))}

      {destinations.map((to, index) => (
        <g key={`node-${to.x}-${to.y}`}>
          <motion.circle
            cx={to.x}
            cy={to.y}
            r="14"
            fill="#d62a2f"
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: [0.4, 1.6], opacity: [0.5, 0] }}
            transition={{
              duration: 2.2,
              delay: 1.6 + index * 0.25,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
          <motion.circle
            cx={to.x}
            cy={to.y}
            r="6"
            fill="#fff"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
            transition={{ delay: 1.4 + index * 0.25, duration: 0.4 }}
          />
        </g>
      ))}

      <circle cx={origin.x} cy={origin.y} r="10" fill="#d62a2f" />
      <circle cx={origin.x} cy={origin.y} r="4" fill="#fff" />

      <text
        x={origin.x - 6}
        y={origin.y + 38}
        fill="#fff"
        fontSize="20"
        fontWeight="700"
        letterSpacing="3"
        style={{ fontFamily: "var(--font-saira), sans-serif" }}
      >
        TÜRKİYE
      </text>
      <text
        x="300"
        y="62"
        fill="#fff"
        fontSize="20"
        fontWeight="700"
        letterSpacing="3"
        style={{ fontFamily: "var(--font-saira), sans-serif" }}
      >
        AVRUPA
      </text>
    </svg>
  );
}
