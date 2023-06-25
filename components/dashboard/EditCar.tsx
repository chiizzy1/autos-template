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

interface EditCarProps {
  customerId: string;
  carId: string;
  setEditModal: (toggle: boolean) => void;
}

const EditCar: FC<EditCarProps> = ({ customerId, carId, setEditModal }) => {
  // Handle Form with Yup
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
    control,
  } = useForm({ resolver: yupResolver(Schema) });

  const editCarDetails: any = async (info: any) => {
    console.log(info);
    const { data } = await axios.put(`/api/cars/update`, {
      ...info,
      id: carId,
    });
    return data.CarData;
  };

  const { mutate, error, isLoading, isError } = useMutation(editCarDetails, {
    onSuccess: (successData) => {
      console.log(successData);
        setEditModal(false)
      toast({
        title: "success editing car info",
        message: "okay",
        type: "success",
      });
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        setEditModal(false)
        toast({
          title: "Error editing car info",
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
            <div className="w-full sm:w-1/2 px-3 mb-6 md:mb-0">
              <p className="pb-2">Vehicle Make</p>
              <input
                className={`${styles.formInputStyles}`}
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
              <input
                className={`${styles.formInputStyles}`}
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
              <input
                className={`${styles.formInputStyles}`}
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
              <input
                className={`${styles.formInputStyles}`}
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

          <div
            onClick={() => {
              setEditModal(false);
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

export default EditCar;
