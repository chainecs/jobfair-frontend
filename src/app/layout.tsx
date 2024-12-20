import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "../components/Navbar";
import { authOptions } from "@/libs/authOptions";
import { getServerSession } from "next-auth";
import NextAuthProviders from "@/providers/NextAuthProviders";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "JobFair",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const nextAuthSession = await getServerSession(authOptions);
  return (
    <html lang='en'>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <NextAuthProviders session={nextAuthSession}>
          <Navbar />
          {children}
        </NextAuthProviders>
      </body>
    </html>
  );
}
