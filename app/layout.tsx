import { ToastContainer } from "react-toastify";
import { ProgressBar, ProgressBarProvider } from "kbatkov-react-transition-progress";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Footer, Header, ModalLayout } from "@/_src/components/layout";
import { ModalProvider } from "@/_src/providers/modal-context";

import "react-toastify/dist/ReactToastify.css";
import "react-loading-skeleton/dist/skeleton.css";
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
    <ModalProvider>
      <html lang="ru">
        <body className={inter.className}>
          <ProgressBarProvider>
            <ProgressBar className="progressBar" />
            <ToastContainer position="bottom-right" />
            <Header />
            {children}
            <Footer />
            <ModalLayout />
          </ProgressBarProvider>
        </body>
      </html>
    </ModalProvider>
  );
}
