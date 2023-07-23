import "@/app/globals.css";

export const metadata = {
  title: "Car Clinic | Appointments",
  description: "see all appointments",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="container max-w-7xl mx-auto relative">{children}</div>;
}