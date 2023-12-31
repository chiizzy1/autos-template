"use client";

import axios, { AxiosError } from "axios";
import { FC } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "../ui/toast";
import { useRouter } from "next/navigation";
import { Button } from "../ui/Button";
import { X } from "lucide-react";

interface DeleteCustomerProps {
  setCustomerDeleteModal: (toggle: boolean) => void;
  customerId: string;
  page: string;
}

const DeleteCustomer: FC<DeleteCustomerProps> = ({
  setCustomerDeleteModal,
  customerId,
  page,
}) => {
  const { push, refresh } = useRouter();
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(
    async (id: string) => {
      const { data } = await axios.delete(`/api/customers/delete/${id}`);
      return data;
    },
    {
      onSuccess: () => {
        setCustomerDeleteModal(false);

        toast({
          title: "success",
          message: "successfully deleted customer data",
          type: "success",
        });
        queryClient.invalidateQueries(["allCustomers"]);
        queryClient.invalidateQueries(["customer"]);

        page === "customer" ? push(`/dashboard/customers/`) : refresh();
      },
      onError: (error: any) => {
        if (error instanceof AxiosError) {
          toast({
            title: "Error deleting repair",
            message: `${error?.response?.data.error} ⚠️`,
            type: "error",
          });
        }
      },
    }
  );

  const deleteRepair = () => {
    mutate(customerId);
  };

  return (
    <div className="fixed bg-black/50 w-full h-full z-20 left-0 top-0">
      <div className="absolute bg-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-6 rounded-lg flex flex-col gap-6">
        <div className="flex">
          <div
            className="p-1 border border-red-500 rounded-md"
            onClick={() => {
              setCustomerDeleteModal(false);
            }}
          >
            <X size={16} color="#f50000" strokeWidth={1.25} />
          </div>
        </div>

        <h2 className="text-xl">
          Are you sure you want to delete this customer data?
        </h2>
        <h3 className="text-red-600 text-sm">
          Pressing the delete button will permenantly this customer data
        </h3>

        <Button
          onClick={deleteRepair}
          isLoading={isLoading}
          disabled={isLoading}
          variant="purple"
        >
          Delete Customer Details
        </Button>
      </div>
    </div>
  );
};

export default DeleteCustomer;
