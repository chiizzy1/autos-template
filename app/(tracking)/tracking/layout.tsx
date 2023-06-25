import { Footer, Navbar } from "@/components";
import "@/app/globals.css";

export const metadata = {
  title: "Car Clinic | Tracking",
  description: "Track your car repair details!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <div className="pt-[5rem]">{children}</div>
      <Footer />
    </>
  );
}
