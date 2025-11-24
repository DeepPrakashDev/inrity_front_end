import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import { AuthProvider } from "./context/UserAuthContext";
import "./globals.css";
import { Providers } from "./providers";
// import "./custom_color.css";
import ReportTypes from "./components/ReportTypes";
import Header from "./header/page";
import Footer from "./footer/page";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Intrity - Market Research Reports & Consulting",
  description:
    "Intrity is a global market research and consulting firm providing syndicated research reports, customized research, and consulting services to help businesses make informed decisions.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <AuthProvider>
          {/* -------------Header--------------- */}
          <Header />
          {/* -------------Report Types--------------- */}
          <Providers>{children}</Providers>
          {/* {children} */}
          {/* -------------Footer--------------- */}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
