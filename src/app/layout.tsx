import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Type and Learn App",
  description:
    "A Web app where one could practice their typing skills while at the same time learning about a subject",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen px-2 md:px-20">
          <div className="w-full h-full">{children}</div>
          <div className="flex-grow"></div>
        </div>
      </body>
    </html>
  );
}
