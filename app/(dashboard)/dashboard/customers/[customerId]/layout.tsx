import "@/app/globals.css";

export const metadata = {
  title: "Car Clinic | Customer ",
  description: "View Customer Info",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="container max-w-7xl mx-auto relative">{children}</div>;
}
