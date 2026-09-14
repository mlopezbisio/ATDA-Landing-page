import {
  BiotechIcon,
  CollaborationIcon,
  DebateIcon,
  DevelopmentIcon,
  EnergyIcon,
  Industry40Icon,
  KnowledgeIcon,
} from "@/components/Icons";
import type { FocusIcon, ValueIcon } from "@/lib/sanity/types";

const valueIcons: Record<ValueIcon, typeof CollaborationIcon> = {
  collaboration: CollaborationIcon,
  debate: DebateIcon,
  development: DevelopmentIcon,
  knowledge: KnowledgeIcon,
};

const focusIcons: Record<FocusIcon, typeof EnergyIcon> = {
  energy: EnergyIcon,
  industry40: Industry40Icon,
  biotech: BiotechIcon,
};

export function ValueIconView({ name, className }: { name: ValueIcon; className?: string }) {
  const Icon = valueIcons[name] ?? CollaborationIcon;
  return <Icon className={className} />;
}

export function FocusIconView({ name, className }: { name: FocusIcon; className?: string }) {
  const Icon = focusIcons[name] ?? EnergyIcon;
  return <Icon className={className} />;
}
