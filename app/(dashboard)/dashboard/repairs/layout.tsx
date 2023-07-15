import "@/app/globals.css";

export const metadata = {
  title: "Car Clinic | Repairs",
  description: "Customer's car repair page!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="container max-w-7xl mx-auto relative">{children}</div>;
}