import { type Link } from "@/types/link";
import { LinkCard } from "@/components/LinkCard";

type LinkSectionProps = {
  links: Link[];
};

export function LinkSection({ links }: LinkSectionProps) {
  const visibleLinks = links.filter((link) => link.visible);

  return (
    <div className="flex justify-center">
      {/* PC: 2-column grid (sm and above) */}
      <div
        className="hidden gap-3 sm:grid"
        style={{
          gridTemplateColumns: "repeat(2, 340px)",
        }}
      >
        {visibleLinks.map((link) => (
          <LinkCard key={link.name} link={link} />
        ))}
      </div>

      {/* Mobile: 1-column grid (below sm) */}
      <div
        className="grid gap-3 sm:hidden"
        style={{
          gridTemplateColumns: "200px",
        }}
      >
        {visibleLinks.map((link) => (
          <LinkCard key={link.name} link={link} />
        ))}
      </div>
    </div>
  );
}
