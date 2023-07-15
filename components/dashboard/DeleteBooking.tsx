"use client";

import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { Dispatch, FC, SetStateAction } from "react";
import { toast } from "../ui/toast";
import { AiOutlineClose } from "react-icons/ai";
import { Button } from "../ui/Button";

interface DeleteBookingProps {
  setDeleteModal: Dispatch<SetStateAction<boolean>>;
  bookingId: string;
}

const DeleteBooking: FC<DeleteBookingProps> = ({
  setDeleteModal,
  bookingId,
}) => {
  const { refresh } = useRouter();

  const { mutate, isLoading } = useMutation(
    async (id: string) => {
      const { data } = await axios.delete(`/api/booking/delete/${id}`);
      return data;
    },
    {
      onSuccess: (successData: any) => {
        console.log(successData);
        setDeleteModal(false);

        toast({
          title: "success deleting booking",
          message: "okay",
          type: "success",
        });

        refresh();
      },
      onError: (error: any) => {
        if (error instanceof AxiosError) {
          toast({
            title: "Error deleting booking",
            message: `${error?.response?.data.error} ⚠️`,
            type: "error",
          });
        }
        console.log(error);
      },
    }
  );

  const deleteBooking = () => {
    mutate(bookingId);
  };

  return (
    <div className="fixed bg-black/50 w-full h-full z-20 left-0 top-0">
      <div className="absolute bg-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-12 rounded-lg flex flex-col gap-6">
        <div className="flex">
          <div
            className="p-1 border border-sky-500 rounded-md"
            onClick={() => {
              setDeleteModal(false);
            }}
          >
            <AiOutlineClose className="text-4xl  text-sky-500 font-black cursor-pointer" />
          </div>
        </div>

        <h2 className="text-xl">
          Are you sure you want to delete this appointment data?
        </h2>
        <h3 className="text-red-600 text-sm">
          Pressing the delete button will permenantly this appointment data
        </h3>

        <Button
          onClick={deleteBooking}
          isLoading={isLoading}
          disabled={isLoading}
          variant="purple"
        >
          Delete Appointment
        </Button>
      </div>
    </div>
  );
};

export default DeleteBooking;
