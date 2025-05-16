import SideBar from "@/components/SideBar";
import TopBar from "@/components/TopBar";
import type { Metadata } from "next";

import "../globals.css";

export const metadata: Metadata = {
  title: "Websouls Dashboard",
  description: "Created by Websouls",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="poppins">
        <div className="wrapper w-full relative">
          <div className="w-full relative">
            <main className="grid grid-cols-1 lg:grid-cols-2">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
