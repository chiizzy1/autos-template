"use client";

import CreateRepairModal from "@/components/dashboard/CreateRepairModal";
import DeleteCar from "@/components/dashboard/DeleteCar";
import EditCar from "@/components/dashboard/EditCar";
import Header from "@/components/dashboard/Header";
import SingleRepairTable from "@/components/dashboard/SingleRepairTable";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";

type URL = {
  params: {
    customerId: string;
    carId: string;
  };
  searchParams: string;
};

export default function CarDetail(url: URL) {
  const { customerId, carId } = url.params;

  const [toggleModal, setToggleModal] = useState<boolean>(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  async function fetchCarData() {
    let { data } = await axios.get(`/api/cars/getCar/${carId}`);
    // console.log(data);
    return data;
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

  if (isLoading) {
    return <h1> Loading...</h1>;
  }

  if (data) {
    // console.log(data);
  }

  return (
    <div>
      <Header page="" />
      dynamic car details fetch customer ID:{" "}
      <p className="font-bold text-2xl text-black">{customerId}</p> , car ID :{" "}
      <p className="font-bold text-2xl text-black">{carId}</p>{" "}
      <div className="flex gap-6">
        <div
          onClick={() => setToggleModal(true)}
          className="rounded-lg bg-sky-300 text-black h-10 p-6 flex items-center justify-center"
        >
          Add new repair details
        </div>
        <div
          onClick={() => setEditModal(true)}
          className="rounded-lg bg-sky-300 text-black h-10 p-6 flex items-center justify-center"
        >
          Edit Car details
        </div>
        <div
          onClick={() => setDeleteModal(true)}
          className="rounded-lg bg-sky-300 text-black h-10 p-6 flex items-center justify-center"
        >
          Delete Car details
        </div>
      </div>
      <h3 className="font-bold text-xl text-black py-6 text-center">
        Car Repair History
      </h3>
      {carId && <SingleRepairTable
        carId={carId}
        customerId={customerId}
      />}
      {toggleModal && (
        <CreateRepairModal
          customerId={customerId}
          carId={carId}
          setToggleModal={setToggleModal}
        />
      )}
      {editModal && (
        <EditCar
          customerId={customerId}
          carId={carId}
          setEditModal={setEditModal}
        />
      )}
      {deleteModal && (
        <DeleteCar
          carId={carId}
          setDeleteModal={setDeleteModal}
          customerId={customerId}
        />
      )}
    </div>
  );
}
