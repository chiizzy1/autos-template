"use client";

import CarCards from "@/components/dashboard/CarCards";
import CreateRepairModal from "@/components/dashboard/CreateRepairModal";
import DeleteCar from "@/components/dashboard/DeleteCar";
import EditCar from "@/components/dashboard/EditCar";
import Header from "@/components/dashboard/Header";
import SingleRepairTable from "@/components/dashboard/SingleRepairTable";
import Loading from "@/components/ui/Loading";
import SmallHeading from "@/components/ui/SmallHeading";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useState } from "react";

type URL = {
  params: {
    carId: string;
  };
  searchParams: string;
};

export default function CarDetail(url: URL) {
  const { carId } = url.params;

  const [toggleModal, setToggleModal] = useState<boolean>(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  let customerId: string = "";
  async function fetchCarData() {
    const { data } = await axios.get(`/api/cars/getCar/${carId}`);
    return data.CarData;
  }

  const { data, error, isError, isLoading } = useQuery(
    ["carInfo"],
    fetchCarData,
    {
      onSuccess: (successData) => {
        console.log(successData);
      },
    }
  );

  if (isError) {
    return <div>Error!</div>;
  }

  if (data) {
    customerId = data.ownerId;
  }

  return (
    <main className="min-h-screen">
      {data && (
        <>
          <Header page="" />

          <CarCards
            setToggleModal={setToggleModal}
            data={data}
            setEditModal={setEditModal}
            setDeleteModal={setDeleteModal}
          />

          {carId && (
            <div className="p-4">
              <SmallHeading className="py-4">Car Repair History</SmallHeading>
              <SingleRepairTable carId={carId} />
            </div>
          )}
          {toggleModal && (
            <CreateRepairModal
              customerId={customerId}
              carId={carId}
              setToggleModal={setToggleModal}
            />
          )}
          {editModal && <EditCar carId={carId} setEditModal={setEditModal} />}
          {deleteModal && (
            <DeleteCar carId={carId} setDeleteModal={setDeleteModal} />
          )}
        </>
      )}
      {isLoading && <Loading text="Loading Car Info" />}
    </main>
  );
}
