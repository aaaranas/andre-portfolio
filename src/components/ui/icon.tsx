"use client";
import {
  BarChart3, Bot, Brain, Bus, Camera, Cpu, Database, FlaskConical, Globe,
  GraduationCap, Mail, Map, MapPin, MessageSquare, Search, Settings,
  TrendingUp, Zap,
} from "lucide-react";
import { SiGithub } from "react-icons/si";
import type { CSSProperties } from "react";

/**
 * Name → SVG registry.
 *
 * Data files (`lib/data.ts`) name an icon as a plain string so they stay free of
 * JSX; components resolve it here. Every glyph the UI used to draw with an emoji
 * or a Unicode symbol now resolves to a real SVG, which keeps rendering
 * identical across platforms instead of leaning on the system emoji font.
 */
const REGISTRY = {
  "bar-chart": BarChart3,
  bot: Bot,
  brain: Brain,
  bus: Bus,
  camera: Camera,
  cpu: Cpu,
  database: Database,
  flask: FlaskConical,
  git: SiGithub,
  globe: Globe,
  graduation: GraduationCap,
  mail: Mail,
  map: Map,
  "map-pin": MapPin,
  message: MessageSquare,
  search: Search,
  settings: Settings,
  trending: TrendingUp,
  zap: Zap,
} as const;

export type IconName = keyof typeof REGISTRY;

export default function Icon({
  name,
  size = 20,
  color = "currentColor",
  style,
}: {
  name: string;
  size?: number;
  color?: string;
  style?: CSSProperties;
}) {
  const Glyph = REGISTRY[name as IconName];
  if (!Glyph) return null;
  return <Glyph aria-hidden style={{ width: size, height: size, color, flexShrink: 0, ...style }} />;
}
