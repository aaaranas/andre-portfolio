/**
 * Typographic marks, used instead of an icon pack.
 *
 * The portfolio speaks in monospace — a shell, a boot log, command-line
 * labels. Arrows and ticks drawn from the same
 * typeface as the rest of the page belong to that language in a way imported
 * SVG glyphs never did, and they cost nothing to ship.
 */
import type { CSSProperties } from "react";

export const MARK = {
  /** Forward motion: calls to action, list bullets that lead somewhere. */
  arrow: "→",
  /** Leaves the page. */
  external: "↗",
  /** Back to the top. */
  up: "↑",
  /** Dismiss. */
  close: "×",
  /** Done, verified, passed. */
  check: "✓",
  /** A nested item under a heading. */
  chevron: "›",
  /** The shell prompt. */
  prompt: "$",
  /** Light theme. */
  sun: "☀",
  /** Dark theme. */
  moon: "◑",
} as const;

export type MarkName = keyof typeof MARK;

export default function Mark({
  name,
  size = 13,
  color = "currentColor",
  style,
}: {
  name: MarkName;
  size?: number;
  color?: string;
  style?: CSSProperties;
}) {
  return (
    <span
      aria-hidden="true"
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: `${size}px`,
        lineHeight: 1,
        color,
        flexShrink: 0,
        display: "inline-block",
        ...style,
      }}
    >
      {MARK[name]}
    </span>
  );
}

/**
 * The numeral that leads a card, in place of a decorative icon. Numbering the
 * work reads as a catalogue rather than a sticker sheet, and it matches the
 * `01 / projects` labels the sections already use.
 */
export function Numeral({
  n,
  color = "var(--accent)",
  size = 13,
  style,
}: {
  n: number;
  color?: string;
  size?: number;
  style?: CSSProperties;
}) {
  return (
    <span
      aria-hidden="true"
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: `${size}px`,
        fontWeight: 500,
        letterSpacing: "0.08em",
        color,
        flexShrink: 0,
        fontVariantNumeric: "tabular-nums",
        ...style,
      }}
    >
      {String(n).padStart(2, "0")}
    </span>
  );
}

/**
 * Issuer initials, standing in for a certification badge. Two letters of the
 * issuer's own name identify it better than a generic award glyph did.
 */
export function Monogram({ text, color, size = 34 }: { text: string; color: string; size?: number }) {
  const words = text.split(/[\s·]+/).filter(Boolean);
  // "Google Cloud" -> GC; "DataCamp" -> DC (internal capitals); "Google" -> GO.
  const initials = (
    words.length > 1
      ? words.slice(0, 2).map((w) => w[0]).join("")
      : (words[0].match(/[A-Z]/g) ?? []).length > 1
        ? words[0].match(/[A-Z]/g)!.slice(0, 2).join("")
        : words[0].slice(0, 2)
  ).toUpperCase();
  return (
    <span
      aria-hidden="true"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        fontFamily: "var(--font-mono)",
        fontSize: `${Math.round(size * 0.38)}px`,
        fontWeight: 600,
        letterSpacing: "0.04em",
        color,
        border: `1px solid ${color}55`,
        borderRadius: "var(--r)",
        background: `${color}12`,
      }}
    >
      {initials}
    </span>
  );
}
