import type { Metadata } from "next";
import { Antonio, Montserrat } from "next/font/google";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ThemeProvider } from "@/components/themeProvider";
import "./globals.css";

const antonio = Antonio({ 
  subsets: ["latin"],
  variable: "--font-antonio",
});

const montserrat = Montserrat({ 
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "James Amey | Support Leader, Developer, Builder",
  description: "Portfolio and blog of James Amey - solving complex problems with technology, building communities, and occasionally writing about Star Trek.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${antonio.variable} ${montserrat.variable}`}>
      <body className={`${antonio.className} antialiased`}>
        <ThemeProvider 
          attribute="class" 
          defaultTheme="system" 
          enableSystem
          disableTransitionOnChange={false}
        >
          <div className="min-h-screen flex flex-col">
            <div className="flex-1 mx-auto w-full max-w-5xl px-4 py-6">
              <Header />
              <main>{children}</main>
            </div>
            <div className="mx-auto w-full max-w-5xl px-4">
              <Footer />
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
