import Header from "@/components/dashboard/Header";
import Mock from "@/components/dashboard/Mock";

export default async function CustomerPage() {
  return (
    <div>
      <Header page="" />
      <div className="pt-8">
        <h3 className="text-lg font-medium">Register new customer!</h3>
        <Mock />
      </div>
    </div>
  );
}
