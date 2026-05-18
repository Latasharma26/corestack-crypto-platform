import type { Metadata } from "next";
import "./globals.css";
import { TRPCProvider } from "./provider";

export const metadata: Metadata = {
  title: "CoreStack // Developer Workflow Platform",
  description: "Enterprise-grade monochromatic automation system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <TRPCProvider>
          {children}
        </TRPCProvider>
      </body>
    </html>
  );
}