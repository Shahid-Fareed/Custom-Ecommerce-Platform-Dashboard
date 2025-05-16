import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Clush Dashboard",
  description: "Created by Websouls",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="poppins">{children}</body>
    </html>
  );
}
