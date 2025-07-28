import "@/app/ui/global.css";
import { inter } from "@/app/ui/fonts";
import { Metadata } from "next";
import Providers from "./Provider";
import { lusitana } from "@/app/ui/fonts";
import { Header } from "./ui/header/header";
import { Navigation } from "./ui/navigation/navigation";
import { Footer } from "./ui/footer/footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://вашсайт.ру"), // Добавьте ваш реальный домен
  title: {
    template: "%s | Аренда техники",
    default: "Аренда техники",
  },
  description:
    "Аренда строительной и складской техники в Москве и Московской области. Широкий парк техники, гибкие условия аренды.",
  verification: {
    yandex: "365b66ad9ebdaca3",
  },
  openGraph: {
    title: "Аренда спецтехники | Москва и Московская область",
    description:
      "Профессиональная аренда строительной техники с доставкой. Катки, манипуляторы, грузовики и другая спецтехника.",
    url: "/", // Используем относительный путь
    siteName: "АрендаТехники",
    images: [
      {
        url: "/logo.png", // Путь от корня public
        width: 1200,
        height: 630,
        alt: "Аренда спецтехники",
      },
    ],
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Аренда спецтехники | Москва и Московская область",
    description: "Профессиональная аренда строительной техники с доставкой",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className="h-full w-full">
      <body
        className={`${inter.className} antialiased flex min-h-screen flex-col items-center min-w-full bg-[#f1f1f1]`}
      >
        <Providers>
          <Header />
          <Navigation />
          <main className={`${lusitana.className} flex-1`}>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
