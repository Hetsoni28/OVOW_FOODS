import { Badge } from "@/components/atoms/Badge";

interface SectionHeaderProps {
  badgeText: string;
  badgeColor?: string;
  title: string;
  titleColor?: string;
  className?: string;
}

export function SectionHeader({
  badgeText,
  badgeColor = "text-tertiary",
  title,
  titleColor = "text-primary",
  className = "",
}: SectionHeaderProps) {
  return (
    <div className={className}>
      <Badge className={badgeColor}>{badgeText}</Badge>
      <h2 className={`mt-3 font-serif text-5xl ${titleColor}`}>{title}</h2>
    </div>
  );
}
