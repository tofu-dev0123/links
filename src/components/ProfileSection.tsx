export function ProfileSection() {
  return (
    <div className="mb-8 text-center">
      <div
        className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full text-[2rem] font-bold"
        style={{
          backgroundColor: "var(--primary)",
          color: "var(--primary-foreground)",
        }}
      >
        T
      </div>
      <h1
        className="mb-1 text-xl font-bold"
        style={{ color: "var(--foreground)" }}
      >
        tofu
      </h1>
      <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
        リンク集
      </p>
    </div>
  );
}
