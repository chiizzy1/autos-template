import { Providers, Toaster } from "@/components";
import "./globals.css";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import MobileMenu from "@/components/MobileMenu";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Car Clinic",
  description: "where you car gets the care it deserves!",
};

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          "bg-slate-100 antialiased text-black min-h-screen",
          inter.className
        )}
      >
        {" "}
        <Providers>
          <Toaster position="bottom-left" />
          {modal}

          {children}
        </Providers>
      </body>
    </html>
  );
}
