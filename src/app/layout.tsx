import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "tofu | Links",
  description: "tofu の各種サービスへのリンク集です。",
  icons: {
    icon: "/icons/tofu.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
          <img
            src="/icons/tofu-icon.png"
            alt=""
            className="absolute w-[130vmin] opacity-5 mix-blend-multiply top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 sm:left-0 sm:right-auto sm:translate-x-0"
          />
        </div>
        {children}
      </body>
    </html>
  );
}
