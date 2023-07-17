"use client";

import { FC } from "react";
import axios, { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation } from "@tanstack/react-query";
import styles from "@/style";
import { toast } from "../ui/toast";
import { useRouter } from "next/navigation";
import { createCar } from "@/helpers/customers";
import { Button } from "../ui/Button";
import { AiOutlineClose } from "react-icons/ai";

interface CreateRepairModalProps {
  customerId: string;
  carId: string;
  setToggleModal: (toggle: boolean) => void;
}

const CreateRepairModal: FC<CreateRepairModalProps> = ({
  customerId,
  carId,
  setToggleModal,
}) => {
  // console.log(customerId);
  const { refresh } = useRouter();

  // Handle Form with Yup
  const Schema = yup.object().shape({
    estimatedCost: yup.number().required("please enter car make"),
    paid: yup.boolean(),
    fixed: yup.boolean(),
    delivered: yup.boolean(),
    description: yup.string().required("enter plate number"),
    repairStatus: yup.string().required("enter repair status"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({ resolver: yupResolver(Schema) });

  const createNewCar: any = async (info: any) => {
    console.log(info);
    const { data } = await axios.post(`/api/repairs/createNew`, {
      ...info,
      customerId: customerId,
      carId: carId,
    });
    return data;
  };

  const { mutate, error, isLoading, isError } = useMutation(createNewCar, {
    onSuccess: (successData) => {
      console.log(successData);
      setToggleModal(false)

      toast({
        title: "success creating new repair",
        message: "okay",
        type: "success",
      });
      refresh();
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast({
          title: "Error creating new repair",
          message: `${error?.response?.data.error} ⚠️`,
          type: "error",
        });
      }

      console.log(error);
    },
  });

  const handleFormSubmit = (data: any) => {
    mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="fixed bg-black/50 w-full h-full z-20 left-0 top-0 ">
        <div className="absolute bg-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-12 rounded-lg flex flex-col gap-6">
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full sm:w-1/4 px-3 mb-6 md:mb-0">
              <p className="pb-2">Estimated Cost</p>
              <input
                className={`${styles.formInputStyles}`}
                type="text"
                placeholder="e.g $50.23..."
                {...register("estimatedCost")}
              />
              {errors.estimatedCost && (
                <p className={`${styles.formErrorStyles}`}>
                  Please enter estimated cost!
                </p>
              )}
            </div>
            <div className="w-full sm:w-1/4 px-3 mb-6 md:mb-0">
              <p className="pb-2">Repair status</p>
              <input
                className={`${styles.formInputStyles}`}
                type="text"
                placeholder="repair..."
                {...register("repairStatus")}
              />
              {errors.repairStatus && (
                <p className={`${styles.formErrorStyles}`}>
                  Please enter estimated cost!
                </p>
              )}
            </div>
            <div className="w-full sm:w-1/4 px-3 mb-6 sm:mb-0">
              <p className="pb-2">Payment status (boolean)</p>
              <input
                className={`${styles.formInputStyles}`}
                type="text"
                placeholder="e.g true..."
                {...register("paid")}
              />
              {errors.paid && (
                <p className={`text-red-500 ${styles.formErrorStyles}`}>
                  Please enter car payment status
                </p>
              )}
            </div>
            <div className="w-full sm:w-1/4 px-3 mb-6 sm:mb-0">
              <p className="pb-2">Picked up (boolean)</p>
              <input
                className={`${styles.formInputStyles}`}
                type="text"
                placeholder="e.g true..."
                {...register("delivered")}
              />
              {errors.delivered && (
                <p className={`text-red-500 ${styles.formErrorStyles}`}>
                  Please enter car delivered status
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full sm:w-1/2 px-3 mb-6 sm:mb-0">
              <p className="pb-2">Repair description</p>
              <input
                className={`${styles.formInputStyles}`}
                type="text"
                placeholder="e.g servicing..."
                {...register("description")}
              />
              {errors.description && (
                <p className={`text-red-500 ${styles.formErrorStyles}`}>
                  Please enter repair description
                </p>
              )}
            </div>
            <div className="w-full sm:w-1/2 px-3 mb-6 sm:mb-0">
              <p className="pb-2">Fixed status (boolean) </p>
              <input
                className={`${styles.formInputStyles}`}
                type="text"
                placeholder="e.g true..."
                {...register("fixed")}
              />
              {errors.fixed && (
                <p className={`${styles.formErrorStyles}`}>
                  please enter car fixed status!
                </p>
              )}
            </div>
          </div>

          <div
            onClick={() => {
              setToggleModal(false);
            }}
          > <AiOutlineClose /></div>
          <div className="flex items-center justify-center w-full">
            <Button
              variant="default"
              className="items-center"
              isLoading={isLoading}
              disabled={isLoading}
            >
              {isLoading ? "Registering New Car" : "Register New Car"}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CreateRepairModal;