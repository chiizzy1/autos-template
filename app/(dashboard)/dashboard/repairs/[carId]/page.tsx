import Header from "@/components/dashboard/Header";

const Repair = async ({ params }: any) => {
  const { carId } = params;

  return (
    <div>
      <Header page="" />
      <h3>Edit {carId}</h3>

<ul>
  <li><p>Payment Status</p></li>
  <li><p>Fixed status</p></li>
  <li><p>Repair Cost</p></li>
  <li><p>Diagnosis</p></li>
  <li><p>Tracking status</p></li>
</ul>






    </div>
  );
};

export default Repair;
