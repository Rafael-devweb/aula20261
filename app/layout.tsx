import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./context/AuthContext";
import { ClienteProvider } from "./context/ClienteContext";
import { VeiculoProvider } from "./context/VeiculoContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AutoFix",
  description: "Sistema de gestão de oficinas mecânicas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${geistSans.variable} ${geistMono.variable} h-full`}>
      <body>
        <AuthProvider>
          <ClienteProvider>
            <VeiculoProvider>
              {children}
            </VeiculoProvider>
          </ClienteProvider>
        </AuthProvider>
      </body>
    </html>
  );
}