"use client";

import axios, { AxiosError } from "axios";
import { FC } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useMutation } from "@tanstack/react-query";
import { toast } from "../ui/toast";
import { useRouter } from "next/navigation";

interface DeleteCustomerProps {
    setCustomerDeleteModal: (toggle: boolean) => void;
    customerId: string
}

const DeleteCustomer: FC<DeleteCustomerProps> = ({setCustomerDeleteModal, customerId}) => {
const {push} = useRouter();

    const { mutate } = useMutation(
        async (id: any) => {
            console.log(id)
          const { data } = await axios.delete(`/api/customers/delete/${customerId}`);
          return data;
        },
        {
          onSuccess: (successData: any) => {
            console.log(successData);
            setCustomerDeleteModal(false);
    
            toast({
              title: "success deleting repair",
              message: "okay",
              type: "success",
            });
    
            push(`/dashboard/customers/`)
          },
          onError: (error: any) => {
            if (error instanceof AxiosError) {
              toast({
                title: "Error deleting repair",
                message: `${error?.response?.data.error} ⚠️`,
                type: "error",
              });
            }
            console.log(error);
          },
        }
      );
    
      const deleteRepair = () => {
        console.log(customerId)
        mutate({ customerId });
      };


  return (
    <div className="fixed bg-black/50 w-full h-full z-20 left-0 top-0 ">
      <div className="absolute bg-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-12 rounded-lg flex flex-col gap-6">
        <h2 className="text-xl">
          Are you sure you want to delete this customer data? 😥
        </h2>
        <h3 className="text-red-600 text-sm">
          Pressing the delete button will permenantly delete your post
        </h3>
        <div
          onClick={() => {
            setCustomerDeleteModal(false);
          }}
        >
          <AiOutlineClose />
        </div>
        <button
          onClick={deleteRepair}
          className="bg-red-600 text-sm text-white py-2 px-4 rounded-md"
        >
          Delete Post
        </button>
      </div>
    </div>
  );
}

export default DeleteCustomer