import Header from "@/components/dashboard/Header";

export default function NewRepair() {
  return (
    <div>
      <Header page="" />
      <p>Fetch customer (car owner) info and search for the car</p>
      <p>
        If the car details already exists in our db, fetch it and make a new
        repair data and push to Repair[]
      </p>
      <p>
        If car details doesn&apos;t exist in db yet, create new carDetails db
        and link it to the owner Customer{}, then create a new repair data and
        push to Repair[]
      </p>

      <p>Form to handle inputs and api call to fetch and save data to/fro db</p>

      <p>Wanted fields</p>
      <ul>
        <li>Description (diagnosis)</li>
        <li>Repair cost</li>
        <li>Tracking Id</li>
        <li>Payment (yes/no)</li>
        <li>Tracking status</li>
      </ul>
    </div>
  );
}
