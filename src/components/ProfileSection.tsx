import Image from "next/image";
import { PROFILE } from "@/data/profile";

export function ProfileSection() {
  return (
    <div className="mb-8 text-center">
      <div className="mx-auto mb-4 h-20 w-20 overflow-hidden rounded-full">
        <Image
          src={PROFILE.avatar}
          alt={PROFILE.name}
          width={80}
          height={80}
          className="h-full w-full object-cover"
        />
      </div>
      <h1
        className="mb-1 text-xl font-bold"
        style={{ color: "var(--foreground)" }}
      >
        {PROFILE.name}
      </h1>
      <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
        {PROFILE.subtitle}
      </p>
    </div>
  );
}
