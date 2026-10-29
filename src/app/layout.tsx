import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Novella | Every Find Has a New Story",
  description: "Discover and rent beautiful things on Novella.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
