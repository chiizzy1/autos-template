import Header from "@/components/dashboard/Header";
import Customer from "@/components/dashboard/Customer";

type URL = {
  params: {
    customerId: string;
  };
  searchParams: string;
};

export default function CustomerDetail(url: URL) {
  return (
    <main className="min-h-screen">
      <Header page="" />
      <Customer customerId={url.params.customerId} />
    </main>
  );
}
