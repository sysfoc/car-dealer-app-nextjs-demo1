import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { ThemeModeScript } from "flowbite-react";
import LayoutRenderer from "@/app/components/LayoutRenderer";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { NuqsAdapter } from "nuqs/adapters/next/app";

import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Auto Car Dealers",
  description: "Make Deals Of Cars And Any Other Vehical",
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
      <head>
        <ThemeModeScript />
      </head>
      <body
        className={`transition-all dark:bg-gray-800 dark:text-gray-200 ${poppins.className}`}
      >
        <NextIntlClientProvider messages={messages}>
          <LayoutRenderer>
            <NuqsAdapter>{children}</NuqsAdapter>
          </LayoutRenderer>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
