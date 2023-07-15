import { SideBar } from "@/components";
import "@/app/globals.css";

export const metadata = {
  title: "Car Clinic | Dashboard",
  description: "Admin Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <div className="container max-w-7xl mx-auto relative">
        <SideBar>{children}</SideBar>
      </div>
  );
}