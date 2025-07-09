import "@/app/ui/global.css";
import { inter } from "@/app/ui/fonts";
import { Metadata } from "next";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Providers from "./Provider";
import { lusitana } from "@/app/ui/fonts";
import { Header } from "./ui/header/header";
import { Navigation } from "./ui/navigation/navigation";
import { Footer } from "./ui/footer/footer";

export const metadata: Metadata = {
  title: {
    template: "%s | Acme Dashboard",
    default: "Acme Dashboard",
  },
  description: "The official Next.js Learn Dashboard built with App Router.",
  metadataBase: new URL("https://next-learn-dashboard.vercel.sh"),
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-fuul w-full">
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
