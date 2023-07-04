import { Footer, Navbar } from "@/components";
import "@/app/globals.css";

// You need to import our styles for the button to look right. Best to import in the root /layout.tsx
import "@uploadthing/react/styles.css";


export const metadata = {
  title: "Car Clinic | Upload Files",
  description: "Upload Images!",
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
