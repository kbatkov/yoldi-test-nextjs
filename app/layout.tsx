import { ProgressBar, ProgressBarProvider } from "react-transition-progress";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Footer, Header } from "./_src/components/layout";

import "@/_src/styles/globals.scss";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Yoldi Agency",
  description: "Разрабатываем и запускаем сложные веб проекты",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <ProgressBarProvider>
          <ProgressBar className="progressBar" />
          <Header />
          {children}
          <Footer />
        </ProgressBarProvider>
      </body>
    </html>
  );
}
