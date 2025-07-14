import type { Metadata } from "next";
import "@/styles/globals.css";


export const metadata: Metadata = {
  title: "[BEST] Note Taking app",
  description: "created to help young students take notes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
