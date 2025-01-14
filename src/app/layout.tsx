import type { Metadata } from "next";
import "./globals.css";
import ClientOnlyWrapper from "@/components/ClientOnlyWrapper";

export const metadata: Metadata = {
  title: "Caveo Frontend Test",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <ClientOnlyWrapper>{children}</ClientOnlyWrapper>
      </body>
    </html>
  );
}
