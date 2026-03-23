import { ProfileSection } from "@/components/ProfileSection";
import { LinkSection } from "@/components/LinkSection";
import { LINKS } from "@/data/links";

export default function Home() {
  return (
    <main className="mx-auto px-6 py-12" style={{ maxWidth: "440px" }}>
      <ProfileSection />
      <LinkSection links={LINKS} />
    </main>
  );
}
