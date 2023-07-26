"use client";

import axios, { AxiosError } from "axios";
import { FC } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "../ui/toast";
import { useRouter } from "next/navigation";
import { Button } from "../ui/Button";
import { X } from "lucide-react";

interface DeleteModalProps {
  repairId: string;
  setDeleteToggle: (toggle: boolean) => void;
}

const DeleteModal: FC<DeleteModalProps> = ({ setDeleteToggle, repairId }) => {
  const { refresh } = useRouter();

  const { mutate, isLoading } = useMutation(
    async (id: string) => {
      const { data } = await axios.delete(`/api/repairs/delete/${id}`);
      return data;
    },
    {
      onSuccess: () => {
        setDeleteToggle(false);

        toast({
          title: "success",
          message: "successfully deleted repair",
          type: "success",
        });
        refresh();
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
    mutate(repairId);
  };

  return (
    <div className="fixed bg-black/50 w-full h-full z-20 left-0 top-0 ">
      <div className="absolute bg-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-12 rounded-lg flex flex-col gap-6">
        <div className="flex">
          <div
            className="p-1 border border-red-500 rounded-md"
            onClick={() => {
              setDeleteToggle(false);
            }}
          >
            <X size={16} color="#f50000" strokeWidth={1.25} />{" "}
          </div>
        </div>
        <h2 className="text-xl">
          Are you sure you want to delete this repair details?
        </h2>
        <h3 className="text-red-600 text-sm">
          Pressing the delete button will permenantly delete this repair details
        </h3>

        <Button
          onClick={deleteRepair}
          variant="purple"
          className="items-center"
          isLoading={isLoading}
          disabled={isLoading}
        >
          Delete Repair
        </Button>
      </div>
    </div>
  );
};

export default DeleteModal;
