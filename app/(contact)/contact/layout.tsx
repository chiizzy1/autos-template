import { Footer, Navbar } from "@/components";
import "@/app/globals.css";

export const metadata = {
  title: "Car Clinic | Contact",
  description: "We're always online to help you!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <div className="pt-[4rem]">{children}</div>
      <Footer />
    </>
  );
}