// Brand illustrations, drawn in code.
//
// These replace the stock photography and the leftover theme PNGs. Nothing here
// loads a file: each one is inline SVG built from the two brand colours, so it
// is always on-brand, always crisp at any size, weighs a couple of hundred bytes,
// and can never show a white box behind itself.
//
// Every drawing uses the same palette and the same 400x320 canvas, so they sit
// together as one family. `tone` switches them for a light section or the navy
// hero.

import type { ReactElement } from "react";
import { cx } from "@/components/ui";

export type IllustrationName =
  | "signal"
  | "bundle"
  | "fibre"
  | "globe"
  | "message"
  | "wallet"
  | "shield"
  | "building"
  | "device"
  | "support"
  | "topup"
  | "invoice"
  | "unlimited"
  | "minutes"
  | "tv"
  | "mix"
  | "router"
  | "esim"
  | "savings"
  | "api"
  | "ivr"
  | "store"
  | "home"
  | "dahabplus"
  | "superapp";

// Read from the theme rather than fixed, so a re-themed section (eDahab runs in
// green) draws in its own colour instead of staying Somtel navy. Falls back to
// the navy literal for anything rendering outside a themed tree.
const NAVY = "rgb(var(--primary-600, 31 47 94))";
const YELLOW = "#fed900";
const CYAN = "#29abe3";

/** Colours for the two backgrounds a drawing can sit on. */
function palette(tone: "light" | "navy") {
  return tone === "navy"
    ? { line: "rgba(255,255,255,0.55)", fill: "rgba(255,255,255,0.08)", ink: "#ffffff", accent: YELLOW, support: CYAN }
    : {
        line: "rgb(var(--primary-600, 31 47 94) / 0.30)",
        fill: "rgb(var(--primary-600, 31 47 94) / 0.05)",
        ink: NAVY,
        accent: YELLOW,
        support: CYAN,
      };
}

type Props = {
  name: IllustrationName;
  tone?: "light" | "navy";
  className?: string;
};

/**
 * Renders one of the brand drawings.
 * Decorative by definition, so it is hidden from assistive technology.
 */
export default function Illustration({ name, tone = "light", className }: Props) {
  const c = palette(tone);
  const Draw = drawings[name] ?? drawings.signal;

  return (
    <svg
      viewBox="0 0 400 320"
      role="presentation"
      aria-hidden="true"
      className={cx("h-auto w-full", className)}
    >
      {/* Soft brand glow behind every drawing, so it never looks pasted on. */}
      <defs>
        <radialGradient id={`glow-${name}-${tone}`} cx="50%" cy="48%" r="52%">
          <stop offset="0%" stopColor={YELLOW} stopOpacity={tone === "navy" ? 0.16 : 0.2} />
          <stop offset="100%" stopColor={YELLOW} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="320" fill={`url(#glow-${name}-${tone})`} />

      <Draw c={c} />
    </svg>
  );
}

type Colors = ReturnType<typeof palette>;

/** Each drawing is a small function so the file stays readable. */
const drawings: Record<IllustrationName, (p: { c: Colors }) => ReactElement> = {
  // Concentric broadcast arcs rising from a mast — coverage and network.
  signal: ({ c }) => (
    <g fill="none" strokeLinecap="round">
      {[58, 92, 126, 160].map((r, i) => (
        <path
          key={r}
          d={`M ${200 - r} 210 A ${r} ${r} 0 0 1 ${200 + r} 210`}
          stroke={i === 1 ? c.accent : c.line}
          strokeWidth={i === 1 ? 7 : 4}
          opacity={1 - i * 0.18}
        />
      ))}
      <path d="M200 210 L182 288 h36 Z" fill={c.ink} stroke="none" />
      <circle cx="200" cy="200" r="12" fill={c.accent} stroke="none" />
    </g>
  ),

  // A stack of plan cards, the top one highlighted — bundles and pricing.
  bundle: ({ c }) => (
    <g>
      <rect x="96" y="96" width="208" height="132" rx="18" fill={c.fill} stroke={c.line} strokeWidth="3" />
      <rect x="112" y="74" width="176" height="132" rx="18" fill={c.fill} stroke={c.line} strokeWidth="3" />
      <rect x="128" y="52" width="144" height="132" rx="18" fill={c.fill} stroke={c.accent} strokeWidth="4" />
      <rect x="150" y="80" width="62" height="10" rx="5" fill={c.accent} />
      <rect x="150" y="102" width="100" height="8" rx="4" fill={c.line} />
      <rect x="150" y="120" width="78" height="8" rx="4" fill={c.line} />
      <circle cx="248" cy="150" r="18" fill={c.accent} />
      <path d="M241 150 l5 5 l11 -12" fill="none" stroke={NAVY} strokeWidth="3.5" strokeLinecap="round" />
    </g>
  ),

  // Strands of light running between two nodes — fibre.
  fibre: ({ c }) => (
    <g fill="none" strokeLinecap="round">
      {[-46, -16, 16, 46].map((offset, i) => (
        <path
          key={offset}
          d={`M56 ${160 + offset} C 150 ${160 + offset * 2.1}, 250 ${160 - offset * 2.1}, 344 ${160 - offset}`}
          stroke={i === 1 ? c.accent : i === 2 ? c.support : c.line}
          strokeWidth={i === 1 ? 6 : 4}
          opacity={i === 1 ? 1 : 0.75}
        />
      ))}
      <circle cx="56" cy="160" r="22" fill={c.ink} />
      <circle cx="344" cy="160" r="22" fill={c.ink} />
      <circle cx="56" cy="160" r="9" fill={c.accent} />
      <circle cx="344" cy="160" r="9" fill={c.accent} />
    </g>
  ),

  // A wireframe globe with a route arc — roaming and international.
  globe: ({ c }) => (
    <g fill="none">
      <circle cx="200" cy="160" r="104" stroke={c.line} strokeWidth="3" />
      <ellipse cx="200" cy="160" rx="44" ry="104" stroke={c.line} strokeWidth="3" />
      <ellipse cx="200" cy="160" rx="84" ry="104" stroke={c.line} strokeWidth="3" opacity="0.6" />
      <path d="M96 160 h208 M112 110 h176 M112 210 h176" stroke={c.line} strokeWidth="3" />
      <path d="M126 206 C 190 108, 250 108, 288 130" stroke={c.accent} strokeWidth="6" strokeLinecap="round" />
      <circle cx="126" cy="206" r="11" fill={c.accent} />
      <circle cx="288" cy="130" r="11" fill={c.support} />
    </g>
  ),

  // Two chat bubbles — SMS and messaging.
  message: ({ c }) => (
    <g>
      <path
        d="M78 84 h180 a20 20 0 0 1 20 20 v86 a20 20 0 0 1 -20 20 h-96 l-44 34 v-34 h-40 a20 20 0 0 1 -20 -20 v-86 a20 20 0 0 1 20 -20 Z"
        fill={c.fill}
        stroke={c.line}
        strokeWidth="3"
      />
      <rect x="104" y="120" width="128" height="9" rx="4.5" fill={c.line} />
      <rect x="104" y="144" width="92" height="9" rx="4.5" fill={c.line} />
      <path
        d="M214 148 h108 a18 18 0 0 1 18 18 v64 a18 18 0 0 1 -18 18 h-58 l-34 26 v-26 h-16 a18 18 0 0 1 -18 -18 v-64 a18 18 0 0 1 18 -18 Z"
        fill={c.accent}
        stroke="none"
      />
      <rect x="238" y="178" width="76" height="9" rx="4.5" fill={NAVY} opacity="0.55" />
      <rect x="238" y="200" width="52" height="9" rx="4.5" fill={NAVY} opacity="0.35" />
    </g>
  ),

  // A card and a coin — mobile money.
  wallet: ({ c }) => (
    <g>
      <rect x="70" y="96" width="212" height="132" rx="20" fill={c.fill} stroke={c.line} strokeWidth="3" />
      <rect x="70" y="130" width="212" height="24" fill={c.ink} opacity="0.8" />
      <rect x="94" y="180" width="72" height="10" rx="5" fill={c.line} />
      <rect x="94" y="200" width="46" height="10" rx="5" fill={c.line} />
      <circle cx="286" cy="196" r="52" fill={c.accent} />
      <path
        d="M286 168 v56 M272 182 h22 a10 10 0 0 1 0 20 h-20 a10 10 0 0 0 0 20 h22"
        fill="none"
        stroke={NAVY}
        strokeWidth="6"
        strokeLinecap="round"
      />
    </g>
  ),

  // A shield with a tick — security and trust.
  shield: ({ c }) => (
    <g>
      <path
        d="M200 44 l104 38 v78 c0 62 -44 100 -104 118 c-60 -18 -104 -56 -104 -118 v-78 Z"
        fill={c.fill}
        stroke={c.line}
        strokeWidth="3"
      />
      <path
        d="M200 78 l72 26 v56 c0 44 -30 70 -72 84 c-42 -14 -72 -40 -72 -84 v-56 Z"
        fill={c.accent}
        opacity="0.16"
        stroke="none"
      />
      <path d="M164 158 l26 28 l50 -60" fill="none" stroke={c.accent} strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  ),

  // A small skyline — business and enterprise.
  building: ({ c }) => (
    <g>
      <rect x="72" y="140" width="86" height="136" rx="8" fill={c.fill} stroke={c.line} strokeWidth="3" />
      <rect x="166" y="72" width="98" height="204" rx="8" fill={c.fill} stroke={c.line} strokeWidth="3" />
      <rect x="272" y="168" width="80" height="108" rx="8" fill={c.fill} stroke={c.line} strokeWidth="3" />
      {[0, 1, 2].map((col) =>
        [0, 1, 2, 3].map((row) => (
          <rect
            key={`${col}-${row}`}
            x={186 + col * 26}
            y={96 + row * 34}
            width="16"
            height="20"
            rx="3"
            fill={col === 1 && row === 1 ? c.accent : c.line}
          />
        ))
      )}
      <rect x="92" y="166" width="14" height="18" rx="3" fill={c.line} />
      <rect x="122" y="166" width="14" height="18" rx="3" fill={c.accent} />
      <rect x="292" y="194" width="14" height="18" rx="3" fill={c.line} />
      <rect x="320" y="194" width="14" height="18" rx="3" fill={c.line} />
    </g>
  ),

  // A handset with a SIM chip — devices and eSIM.
  device: ({ c }) => (
    <g>
      <rect x="142" y="36" width="116" height="212" rx="22" fill={c.fill} stroke={c.line} strokeWidth="3" />
      <rect x="156" y="58" width="88" height="150" rx="10" fill={c.ink} opacity="0.08" />
      <rect x="182" y="44" width="36" height="7" rx="3.5" fill={c.line} />
      <circle cx="200" cy="226" r="10" fill={c.line} />
      <rect x="228" y="150" width="92" height="76" rx="12" fill={c.accent} />
      <path
        d="M252 150 v76 M228 176 h92 M276 150 v76"
        stroke={NAVY}
        strokeWidth="4"
        opacity="0.45"
        fill="none"
      />
      <rect x="240" y="162" width="68" height="52" rx="6" fill="none" stroke={NAVY} strokeWidth="4" opacity="0.7" />
    </g>
  ),

  // A headset ring — customer care.
  support: ({ c }) => (
    <g fill="none">
      <path d="M108 192 v-24 a92 92 0 0 1 184 0 v24" stroke={c.line} strokeWidth="10" strokeLinecap="round" />
      <rect x="80" y="182" width="52" height="76" rx="22" fill={c.accent} stroke="none" />
      <rect x="268" y="182" width="52" height="76" rx="22" fill={c.accent} stroke="none" />
      <path d="M292 250 v10 a26 26 0 0 1 -26 26 h-38" stroke={c.line} strokeWidth="8" strokeLinecap="round" />
      <circle cx="212" cy="286" r="14" fill={c.ink} stroke="none" />
    </g>
  ),

  // ---- One dedicated drawing per page, so no two pages open on the same motif ----

  // A phone taking a top-up, coins dropping in — Prepaid.
  topup: ({ c }) => (
    <g>
      <rect x="142" y="48" width="116" height="196" rx="22" fill={c.fill} stroke={c.line} strokeWidth="3" />
      <rect x="182" y="58" width="36" height="7" rx="3.5" fill={c.line} />
      <circle cx="200" cy="146" r="38" fill={c.accent} />
      <path d="M200 128 v36 M182 146 h36" stroke={NAVY} strokeWidth="7" strokeLinecap="round" />
      <circle cx="106" cy="96" r="22" fill={c.line} opacity="0.7" />
      <circle cx="300" cy="80" r="16" fill={c.accent} opacity="0.85" />
      <circle cx="316" cy="196" r="26" fill={c.support} opacity="0.8" />
    </g>
  ),

  // A monthly statement with a total — Postpaid.
  invoice: ({ c }) => (
    <g>
      <path
        d="M112 40 h176 v216 l-22 -16 l-22 16 l-22 -16 l-22 16 l-22 -16 l-22 16 l-22 -16 Z"
        fill={c.fill}
        stroke={c.line}
        strokeWidth="3"
      />
      <rect x="140" y="76" width="92" height="10" rx="5" fill={c.accent} />
      <rect x="140" y="106" width="120" height="8" rx="4" fill={c.line} />
      <rect x="140" y="130" width="100" height="8" rx="4" fill={c.line} />
      <rect x="140" y="154" width="112" height="8" rx="4" fill={c.line} />
      <rect x="140" y="188" width="64" height="14" rx="7" fill={c.accent} />
      <rect x="216" y="188" width="44" height="14" rx="7" fill={c.support} />
    </g>
  ),

  // An infinity loop wrapped in sound — Muraadso, unlimited calling.
  unlimited: ({ c }) => (
    <g fill="none" strokeLinecap="round">
      <path
        d="M144 160 c0 -30 -48 -30 -48 0 c0 30 48 30 48 0 c0 -30 44 -60 76 -30 c22 20 22 40 0 60 c-32 30 -76 0 -76 -30 Z"
        stroke={c.accent}
        strokeWidth="12"
      />
      <path d="M288 116 a56 56 0 0 1 0 88" stroke={c.line} strokeWidth="6" />
      <path d="M312 96 a86 86 0 0 1 0 128" stroke={c.line} strokeWidth="5" opacity="0.7" />
      <circle cx="264" cy="160" r="10" fill={c.support} stroke="none" />
    </g>
  ),

  // A clock beside a call badge — Akram, minutes that never expire.
  minutes: ({ c }) => (
    <g>
      <circle cx="182" cy="150" r="94" fill={c.fill} stroke={c.line} strokeWidth="3" />
      <path
        d="M182 92 v60 l40 24"
        fill="none"
        stroke={c.accent}
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {[0, 90, 180, 270].map((a) => (
        <rect
          key={a}
          x="178"
          y="66"
          width="8"
          height="18"
          rx="4"
          fill={c.line}
          transform={`rotate(${a} 182 150)`}
        />
      ))}
      <circle cx="296" cy="240" r="42" fill={c.accent} />
      <path
        d="M280 224 c-5 14 12 31 27 26 l7 -10 l-15 -9 l-7 5 c-5 -3 -9 -7 -12 -12 l5 -7 l-5 -14 Z"
        fill={NAVY}
      />
    </g>
  ),

  // A screen with a play mark — Dhamays Plus, IPTV included.
  tv: ({ c }) => (
    <g>
      <rect x="74" y="62" width="252" height="156" rx="16" fill={c.fill} stroke={c.line} strokeWidth="3" />
      <path d="M176 108 l62 32 l-62 32 Z" fill={c.accent} />
      <path
        d="M200 218 v30 M152 254 h96"
        stroke={c.line}
        strokeWidth="8"
        strokeLinecap="round"
        fill="none"
      />
      <rect x="96" y="232" width="46" height="8" rx="4" fill={c.support} opacity="0.8" />
      <rect x="258" y="232" width="46" height="8" rx="4" fill={c.line} />
    </g>
  ),

  // Three allowances side by side — Kaafiye Plus: voice, data and SMS.
  mix: ({ c }) => (
    <g>
      {[0, 1, 2].map((i) => (
        <rect
          key={i}
          x={74 + i * 88}
          y={210 - i * 44}
          width="72"
          height={i === 1 ? 90 : i === 0 ? 46 : 134}
          rx="12"
          fill={i === 1 ? c.accent : c.fill}
          stroke={i === 1 ? "none" : c.line}
          strokeWidth="3"
        />
      ))}
      <rect x="250" y="76" width="72" height="180" rx="12" fill={c.fill} stroke={c.line} strokeWidth="3" />
      <circle cx="110" cy="188" r="12" fill={c.support} />
      <circle cx="198" cy="144" r="12" fill={NAVY} opacity="0.5" />
      <circle cx="286" cy="110" r="12" fill={c.accent} />
    </g>
  ),

  // A pocket hotspot broadcasting — Mifi.
  router: ({ c }) => (
    <g>
      <rect x="140" y="150" width="120" height="110" rx="20" fill={c.fill} stroke={c.line} strokeWidth="3" />
      <rect x="164" y="180" width="72" height="34" rx="8" fill={c.ink} opacity="0.1" />
      <circle cx="200" cy="236" r="9" fill={c.accent} />
      {[36, 62, 88].map((r, i) => (
        <path
          key={r}
          d={`M ${200 - r} 130 A ${r} ${r} 0 0 1 ${200 + r} 130`}
          fill="none"
          stroke={i === 0 ? c.accent : c.line}
          strokeWidth={i === 0 ? 7 : 5}
          strokeLinecap="round"
          opacity={1 - i * 0.22}
        />
      ))}
    </g>
  ),

  // A chip soldered into the handset — eSIM.
  esim: ({ c }) => (
    <g>
      <rect x="132" y="42" width="136" height="208" rx="24" fill={c.fill} stroke={c.line} strokeWidth="3" />
      <rect x="160" y="112" width="80" height="66" rx="10" fill={c.accent} />
      <path d="M160 134 h80 M160 156 h80 M186 112 v66 M214 112 v66" stroke={NAVY} strokeWidth="3.5" opacity="0.5" />
      <path
        d="M148 134 h-26 M148 156 h-26 M252 134 h26 M252 156 h26"
        stroke={c.line}
        strokeWidth="5"
        strokeLinecap="round"
      />
      <circle cx="200" cy="226" r="9" fill={c.support} />
    </g>
  ),

  // Coins behind a padlock — Keydso savings.
  savings: ({ c }) => (
    <g>
      {[0, 1, 2].map((i) => (
        <ellipse
          key={i}
          cx="146"
          cy={232 - i * 34}
          rx="66"
          ry="20"
          fill={i === 2 ? c.accent : c.fill}
          stroke={c.line}
          strokeWidth="3"
        />
      ))}
      <path d="M80 164 v68 M212 164 v68" stroke={c.line} strokeWidth="3" fill="none" />
      <rect x="248" y="150" width="86" height="72" rx="14" fill={c.accent} />
      <path d="M266 150 v-18 a25 25 0 0 1 50 0 v18" fill="none" stroke={c.line} strokeWidth="10" />
      <circle cx="291" cy="182" r="11" fill={NAVY} />
    </g>
  ),

  // Angle brackets with a payload passing through — SMS API.
  api: ({ c }) => (
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M128 104 L70 160 l58 56" stroke={c.line} strokeWidth="12" />
      <path d="M272 104 l58 56 l-58 56" stroke={c.line} strokeWidth="12" />
      <path d="M224 88 l-48 144" stroke={c.accent} strokeWidth="12" />
      <circle cx="200" cy="160" r="26" fill={c.accent} stroke="none" />
      <path d="M188 160 h24 M204 152 l8 8 l-8 8" stroke={NAVY} strokeWidth="4" />
    </g>
  ),

  // A call fanning out into menu options — IVR.
  ivr: ({ c }) => (
    <g>
      <rect x="56" y="128" width="84" height="64" rx="16" fill={c.accent} />
      <path
        d="M76 150 c-4 16 14 34 30 30 l8 -10 l-16 -10 l-8 5 c-5 -3 -9 -7 -11 -12 l5 -7 l-8 -16 Z"
        fill={NAVY}
      />
      <path
        d="M140 160 h44 M184 160 v-66 h44 M184 160 v66 h44 M184 160 h44"
        fill="none"
        stroke={c.line}
        strokeWidth="4"
      />
      {[94, 160, 226].map((y, i) => (
        <rect
          key={y}
          x="228"
          y={y - 22}
          width="112"
          height="44"
          rx="12"
          fill={c.fill}
          stroke={i === 0 ? c.accent : c.line}
          strokeWidth="3"
        />
      ))}
      {[94, 160, 226].map((y, i) => (
        <rect
          key={`bar-${y}`}
          x="248"
          y={y - 5}
          width={i === 0 ? 56 : 40}
          height="10"
          rx="5"
          fill={i === 0 ? c.accent : c.line}
        />
      ))}
    </g>
  ),

  // A shopfront with an awning — Somtel outlets and devices.
  store: ({ c }) => (
    <g>
      <path d="M72 108 l24 -46 h208 l24 46 Z" fill={c.accent} />
      {[1, 2, 3, 4].map((i) => (
        <path
          key={i}
          d={`M${72 + i * 51.2} 108 l${i < 3 ? -12 : 12} -46`}
          stroke={NAVY}
          strokeWidth="3"
          opacity="0.3"
          fill="none"
        />
      ))}
      <rect x="88" y="108" width="224" height="146" rx="10" fill={c.fill} stroke={c.line} strokeWidth="3" />
      <rect x="112" y="136" width="72" height="58" rx="8" fill={c.support} opacity="0.55" />
      <rect x="216" y="136" width="72" height="118" rx="8" fill={c.line} opacity="0.5" />
      <circle cx="232" cy="196" r="7" fill={c.accent} />
    </g>
  ),

  // A house under a WiFi arc — Home Internet.
  home: ({ c }) => (
    <g>
      <path
        d="M200 96 L86 186 v78 a10 10 0 0 0 10 10 h208 a10 10 0 0 0 10 -10 v-78 Z"
        fill={c.fill}
        stroke={c.line}
        strokeWidth="3"
      />
      <rect x="172" y="212" width="56" height="62" rx="6" fill={c.accent} />
      <rect x="112" y="206" width="44" height="38" rx="6" fill={c.support} opacity="0.55" />
      <rect x="244" y="206" width="44" height="38" rx="6" fill={c.line} opacity="0.5" />
      {[34, 62].map((r, i) => (
        <path
          key={r}
          d={`M ${200 - r} 72 A ${r} ${r} 0 0 1 ${200 + r} 72`}
          fill="none"
          stroke={i === 0 ? c.accent : c.line}
          strokeWidth={i === 0 ? 7 : 5}
          strokeLinecap="round"
        />
      ))}
      <circle cx="200" cy="80" r="7" fill={c.accent} />
    </g>
  ),

  // A handset mid-transfer, coin leaving the screen — the DahabPlus money app.
  dahabplus: ({ c }) => (
    <g>
      <rect x="128" y="30" width="144" height="260" rx="26" fill={c.fill} stroke={c.line} strokeWidth="3" />
      <rect x="180" y="40" width="40" height="7" rx="3.5" fill={c.line} />

      {/* The balance card at the top of the screen. */}
      <rect x="146" y="64" width="108" height="62" rx="12" fill={c.ink} opacity="0.08" />
      <rect x="160" y="80" width="52" height="8" rx="4" fill={c.line} />
      <rect x="160" y="98" width="76" height="12" rx="6" fill={c.accent} />

      {/* Rows of recent movements. */}
      {[142, 172, 202].map((y, i) => (
        <g key={y}>
          <circle cx="164" cy={y + 9} r="9" fill={i === 0 ? c.support : c.line} opacity={i === 0 ? 0.85 : 0.45} />
          <rect x="182" y={y + 3} width={i === 1 ? 44 : 60} height="7" rx="3.5" fill={c.line} opacity="0.7" />
          <rect x="182" y={y + 15} width="32" height="5" rx="2.5" fill={c.line} opacity="0.4" />
        </g>
      ))}

      <rect x="146" y="240" width="108" height="30" rx="15" fill={c.accent} />

      {/* A coin arcing out of the phone — money on its way. */}
      <path d="M272 120 C 320 110, 340 150, 322 188" fill="none" stroke={c.accent} strokeWidth="4" strokeLinecap="round" strokeDasharray="9 8" />
      <circle cx="322" cy="198" r="22" fill={c.accent} />
      <circle cx="322" cy="198" r="14" fill="none" stroke={NAVY} strokeWidth="3" opacity="0.5" />
      <path d="M322 189 v18 M317 194 h10 M317 202 h10" stroke={NAVY} strokeWidth="3" strokeLinecap="round" opacity="0.65" />
    </g>
  ),

  // A handset showing a grid of service tiles — the Somtel SuperApp.
  superapp: ({ c }) => (
    <g>
      <rect x="128" y="30" width="144" height="260" rx="26" fill={c.fill} stroke={c.line} strokeWidth="3" />
      <rect x="180" y="40" width="40" height="7" rx="3.5" fill={c.line} />

      <rect x="146" y="62" width="70" height="10" rx="5" fill={c.line} opacity="0.7" />

      {/* Nine tiles: everything the app puts on one screen. */}
      {[0, 1, 2].map((row) =>
        [0, 1, 2].map((col) => {
          const highlight = row * 3 + col;
          return (
            <rect
              key={`${row}-${col}`}
              x={146 + col * 38}
              y={86 + row * 38}
              width="32"
              height="32"
              rx="9"
              fill={highlight === 0 ? c.accent : highlight === 4 ? c.support : c.ink}
              opacity={highlight === 0 || highlight === 4 ? 1 : 0.12}
            />
          );
        })
      )}

      <rect x="146" y="208" width="108" height="34" rx="12" fill={c.ink} opacity="0.08" />
      <rect x="158" y="220" width="46" height="10" rx="5" fill={c.line} opacity="0.7" />
      <rect x="146" y="252" width="108" height="22" rx="11" fill={c.accent} />

      {/* Signal arcs rising off the corner — the network behind the app. */}
      {[26, 48, 70].map((r, i) => (
        <path
          key={r}
          d={`M ${300 - r * 0.7} ${120 + r * 0.7} A ${r} ${r} 0 0 1 ${300 + r * 0.7} ${120 - r * 0.7}`}
          fill="none"
          stroke={i === 0 ? c.accent : c.line}
          strokeWidth={i === 0 ? 6 : 4}
          strokeLinecap="round"
          opacity={1 - i * 0.22}
        />
      ))}
      <circle cx="300" cy="120" r="7" fill={c.accent} />
    </g>
  ),
};

/**
 * A drawing for an event, picked from its title.
 *
 * Events rarely carry a photograph, and a card with nothing in it reads as
 * broken rather than plain. Both the events list and the event page ask for
 * this, so the guess lives here and the two cannot drift apart.
 */
export function illustrationForEvent(title: string): IllustrationName {
  if (/5g|network|coverage|launch/i.test(title)) return "signal";
  if (/edahab|dahabplus|merchant|money/i.test(title)) return "wallet";
  if (/fib(re|er)|home/i.test(title)) return "fibre";
  if (/school|community|programme/i.test(title)) return "support";
  return "building";
}
