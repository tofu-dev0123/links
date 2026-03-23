"use client";

import { ExternalLink } from "lucide-react";
import { type Link } from "@/types/link";

type LinkCardProps = {
  link: Link;
};

export function LinkCard({ link }: LinkCardProps) {
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block"
    >
      {/* PC layout: horizontal (sm and above) */}
      <div
        className="hidden w-full cursor-pointer items-center gap-3 rounded-[var(--radius)] border bg-[var(--background)] p-4 no-underline sm:flex"
        style={{
          borderColor: "var(--border)",
          color: "inherit",
          transition:
            "transform 150ms ease, box-shadow 150ms ease, border-color 150ms ease",
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget;
          el.style.transform = "translateY(-4px)";
          el.style.boxShadow = "0 8px 24px -4px rgba(0,0,0,0.12)";
          el.style.borderColor = "var(--primary)";
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget;
          el.style.transform = "";
          el.style.boxShadow = "";
          el.style.borderColor = "var(--border)";
        }}
      >
        <img
          src={link.icon}
          alt={link.name}
          width={40}
          height={40}
          className="flex-shrink-0"
          style={{ color: "var(--primary)" }}
        />
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span
            className="text-[0.9rem] font-semibold"
            style={{ color: "var(--foreground)" }}
          >
            {link.name}
          </span>
          <span
            className="overflow-hidden text-[0.8rem] text-ellipsis whitespace-nowrap"
            style={{ color: "var(--muted-foreground)" }}
          >
            {link.description}
          </span>
        </div>
        <ExternalLink
          size={16}
          className="flex-shrink-0"
          style={{ color: "var(--muted-foreground)" }}
        />
      </div>

      {/* Mobile layout: vertical card (below sm) */}
      <div
        className="relative flex h-[220px] w-[200px] cursor-pointer flex-col rounded-[var(--radius)] border bg-[var(--background)] p-4 sm:hidden"
        style={{
          borderColor: "var(--border)",
          color: "inherit",
          transition:
            "transform 150ms ease, box-shadow 150ms ease, border-color 150ms ease",
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget;
          el.style.transform = "translateY(-4px)";
          el.style.boxShadow = "0 8px 24px -4px rgba(0,0,0,0.12)";
          el.style.borderColor = "var(--primary)";
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget;
          el.style.transform = "";
          el.style.boxShadow = "";
          el.style.borderColor = "var(--border)";
        }}
      >
        <div className="absolute top-3 right-3">
          <ExternalLink
            size={16}
            style={{ color: "var(--muted-foreground)" }}
          />
        </div>
        <div className="flex flex-1 items-center justify-center">
          <img
            src={link.icon}
            alt={link.name}
            width={64}
            height={64}
            style={{ color: "var(--primary)" }}
          />
        </div>
        <div className="flex flex-col gap-0.5">
          <span
            className="text-[0.9rem] font-semibold"
            style={{ color: "var(--foreground)" }}
          >
            {link.name}
          </span>
          <span
            className="overflow-hidden text-[0.8rem] text-ellipsis whitespace-nowrap"
            style={{ color: "var(--muted-foreground)" }}
          >
            {link.description}
          </span>
        </div>
      </div>
    </a>
  );
}
