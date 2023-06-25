import { Footer, Navbar } from "@/components";
import "@/app/globals.css";

export const metadata = {
  title: "Car Clinic | Customers",
  description: "Customer's car repair page!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container max-w-7xl mx-auto relative">
      <div>{children}</div>
    </div>
  );
}