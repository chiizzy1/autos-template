import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { notFound } from "next/navigation";
import Header from "@/components/dashboard/Header";
import DashboardCards from "@/components/dashboard/DashboardCards";

const page = async () => {
  const user = await getServerSession(authOptions);
  if (!user) return notFound();

  return (
    <main className="bg-gray-100 min-h-screen">
      <div className="container max-w-7xl mx-auto">
        <Header page="dashboard" />
        <DashboardCards />
      </div>
    </main>
  );
};

export default page;
