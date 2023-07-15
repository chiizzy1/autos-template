import { Footer, Navbar } from "@/components";
import "@/app/globals.css";

export const metadata = {
  title: "Car Clinic | Customers",
  description: "All car page!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="container max-w-7xl mx-auto relative">{children}</div>;
}