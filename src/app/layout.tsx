import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  JetBrains_Mono,
  Monoton,
} from "next/font/google";
import localFont from "next/font/local";
import { LeftRadialMenu } from "@/components/layout/LeftRadialMenu";
import { MiniPlayer } from "@/components/layout/MiniPlayer";
import { AudioPlayerProvider } from "@/context/AudioPlayerContext";
import { cn } from "@/lib/utils";
import "./globals.css";

const monoton = Monoton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-monoton",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const nanumSquare = localFont({
  src: [
    {
      path: "./fonts/NanumSquareL.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/NanumSquareR.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/NanumSquareB.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/NanumSquareEB.otf",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-nanum",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "GOLDEN TIME OF DAY — Maze featuring Frankie Beverly",
  description:
    "프랭키 베벌리와 메이즈(Maze featuring Frankie Beverly)의 음악과 유산을 경험하는 인터랙티브 디지털 소울 전시.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ko"
      className={cn(
        "dark scroll-smooth",
        monoton.variable,
        cormorant.variable,
        nanumSquare.variable,
        jetbrainsMono.variable,
      )}
    >
      <body className="min-h-screen bg-background text-foreground antialiased selection:bg-[#E07A2F]/30 selection:text-[#FFF3D1]">
        <AudioPlayerProvider>
          <div className="film-grain" aria-hidden="true" />
          <LeftRadialMenu />
          {children}
          <MiniPlayer />
        </AudioPlayerProvider>
      </body>
    </html>
  );
}
