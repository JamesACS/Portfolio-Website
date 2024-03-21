import type { Metadata } from "next";
import { Antonio } from "next/font/google";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
// import { ThemeProvider } from "@/components/themeProvider";
import "./globals.css";

const antonio = Antonio({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "James Amey's Portfolio",
  description: "Various projects from the mind of James Amey",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={antonio.className}>
        <div className="mx-auto max-w-2xl px-4 py-10">
          {/* <ThemeProvider attribute="class" defaultTheme="system" enableSystem> */}
          <Header />
          <main>{children}</main>
          <Footer />
          {/* </ThemeProvider> */}
        </div>
      </body>
    </html>
  );
}
