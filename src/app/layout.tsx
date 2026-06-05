import type { Metadata } from "next";
import { Outfit, Inter, DM_Mono } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit-var",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter-var",
  subsets: ["latin"],
  display: "swap",
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono-var",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "MOVVA — Mudanças inteligentes",
  description:
    "A forma mais inteligente de fazer sua mudança. Simule online, acompanhe em tempo real e receba tudo no lugar certo. Sem estresse. Sem surpresas.",
  keywords: [
    "mudança residencial",
    "mudança corporativa",
    "mudança interestadual",
    "transportadora premium",
    "simulador de mudança",
    "orçamento mudança online",
  ],
  openGraph: {
    title: "MOVVA — Mudanças inteligentes",
    description:
      "Simule sua mudança em 30 segundos. Sem compromisso. Resultado instantâneo.",
    type: "website",
    locale: "pt_BR",
    siteName: "MOVVA",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${outfit.variable} ${inter.variable} ${dmMono.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
