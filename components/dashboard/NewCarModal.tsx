"use client";

import { FC } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "../ui/toast";
import { useRouter } from "next/navigation";
import { Button } from "../ui/Button";
import axios, { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from "@/style";
import { Input } from "../ui/Input";
import { X } from "lucide-react";

interface NewCarModalProps {
  setNewCarModal: (toggle: boolean) => void;
  customerId: string;
}

const NewCarModal: FC<NewCarModalProps> = ({ setNewCarModal, customerId }) => {
  const queryClient = useQueryClient();
  const { refresh } = useRouter();
  const Schema = yup.object().shape({
    carMake: yup.string().required("please enter car make"),
    carModel: yup.string().required("What model is your?"),
    carYear: yup.number().required("What year was your car manufactured?"),
    plateNumber: yup.string().required("enter plate number"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(Schema) });

  const createNewCar = async (info: any) => {
    const { data } = await axios.post(
      `/api/cars/createNew/${customerId}`,
      info
    );
    return data;
  };

  const { mutate, error, isLoading, isError } = useMutation(createNewCar, {
    onSuccess: () => {
      toast({
        title: "success",
        message: "successfully created new car",
        type: "success",
      });
      queryClient.invalidateQueries(["allCustomers"]);
      queryClient.invalidateQueries(["customer"]);
      refresh();
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast({
          title: "Error creating new customer",
          message: `${error?.response?.data.error} ⚠️`,
          type: "error",
        });
      }
    },
  });

  const handleFormSubmit = (data: any) => {
    mutate(data);
  };

  return (
    <div className="fixed bg-black/50 w-full h-full z-20 left-0 top-0">
      <div className="absolute bg-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-12 rounded-lg flex flex-col gap-6">
        <div className="flex">
          <div
            className="p-1 border border-red-500 rounded-md"
            onClick={() => {
              setNewCarModal(false);
            }}
          >
            <X size={16} color="#f50000" strokeWidth={1.25} />
          </div>
        </div>

        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full sm:w-1/2 px-3 mb-6 md:mb-0">
              <p className="pb-2">Vehicle Make</p>
              <Input
                className="bg-slate-100"
                type="text"
                placeholder="e.g Mercedes Benz..."
                {...register("carMake")}
              />
              {errors.carMake && (
                <p className={`${styles.formErrorStyles}`}>
                  Please enter your car manufacturer name!
                </p>
              )}
            </div>
            <div className="w-full sm:w-1/2 px-3 mb-6 sm:mb-0">
              <p className="pb-2">Car Model</p>
              <Input
                className="bg-slate-100"
                type="text"
                placeholder="e.g GLE 63..."
                {...register("carModel")}
              />
              {errors.carModel && (
                <p className={`text-red-500 ${styles.formErrorStyles}`}>
                  Please enter your car model
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full sm:w-1/2 px-3 mb-6 sm:mb-0">
              <p className="pb-2">plate Number</p>
              <Input
                className="bg-slate-100"
                type="text"
                placeholder="e.g GLE 63..."
                {...register("plateNumber")}
              />
              {errors.plateNumber && (
                <p className={`text-red-500 ${styles.formErrorStyles}`}>
                  Please enter your car model
                </p>
              )}
            </div>
            <div className="w-full sm:w-1/2 px-3 mb-6 sm:mb-0">
              <p className="pb-2">Year</p>
              <Input
                className="bg-slate-100"
                type="text"
                placeholder="e.g 2022..."
                {...register("carYear")}
              />
              {errors.carYear && (
                <p className={`${styles.formErrorStyles}`}>
                  please enter the year your car was manufactured!
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-center w-full">
            <Button
              variant="purple"
              className="items-center"
              isLoading={isLoading}
              disabled={isLoading}
            >
              {isLoading ? "Registering New Car" : "Register New Car"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewCarModal;
