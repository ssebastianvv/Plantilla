import type { Metadata } from "next";
import localFont from "next/font/local";
import { NextIntlClientProvider } from "next-intl";
import { getLocale,getMessages } from "next-intl/server";
import ProviderSession from "./Provider";
import React from "react";
import Navbar from "../app/components/ui/Navbar/Navbar";
import "./globals.css";
import SelectLanguage from "../app/components/ui/SelectLanguage/SelectLanguage";

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
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();
  return (
    <html lang={locale}>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <NextIntlClientProvider messages={messages}>
          <ProviderSession>
          <Navbar/>
          <SelectLanguage />
            {children}
          </ProviderSession>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
