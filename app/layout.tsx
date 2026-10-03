import "./globals.css";
import Navbar from "@/components/ui/Navbar";

/* -------------------------------------------------------
   METADATA — Combined favicon set + cache‑busted favicon.ico
-------------------------------------------------------- */

export const metadata = {
  title: "GenXBaby",
  description: "Fintech OS for Borrowers, Investors, Owners, and Admins.",
  icons: {
    // Light + Dark mode favicons
    icon: [
      {
        rel: "icon",
        url: "/favicon-light.svg",
        media: "(prefers-color-scheme: light)",
      },
      {
        rel: "icon",
        url: "/favicon-dark.svg",
        media: "(prefers-color-scheme: dark)",
      },

      // Cache‑busted primary favicon.ico
      {
        rel: "icon",
        url: "/favicon.ico?v=5",
      },
    ],

    // iOS home screen icon
    apple: "/apple-touch-icon.png",

    // Browser quick icon
    shortcut: "/favicon.ico?v=5",

    // Animated favicon
    other: [
      {
        rel: "icon",
        url: "/favicon-animated.svg",
        type: "image/svg+xml",
      },
    ],
  },
};

/* -------------------------------------------------------
   ROOT LAYOUT
-------------------------------------------------------- */

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-black text-white">
        <Navbar />
        <main className="pt-16">{children}</main>
      </body>
    </html>
  );
}
