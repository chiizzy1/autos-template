"use client";

import { Dispatch, FC, SetStateAction } from "react";
import axios, { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation } from "@tanstack/react-query";
import styles from "@/style";
import { toast } from "../ui/toast";
import { useRouter } from "next/navigation";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { X } from "lucide-react";

interface EditCarProps {
  carId: string;
  setEditModal: Dispatch<SetStateAction<boolean>>;
  carData: any;
}

const EditCar: FC<EditCarProps> = ({ carId, setEditModal, carData }) => {
  const { make, model, year, plateNumber } = carData;

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
    const { data } = await axios.put(`/api/cars/update/${carId}`, info);
    return data.CarData;
  };

  const { mutate, error, isLoading, isError } = useMutation(editCarDetails, {
    onSuccess: (successData) => {
      console.log(successData);
      setEditModal(false);
      toast({
        title: "success",
        message: "successfully updated car details",
        type: "success",
      });
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        setEditModal(false);
        toast({
          title: "Error editing car info",
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
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="fixed bg-black/50 w-full h-full z-20 left-0 top-0 ">
        <div className="absolute bg-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-12 rounded-lg flex flex-col gap-6">
          <div className="flex">
            <div
              className="p-1 border border-red-500 rounded-md"
              onClick={() => {
                setEditModal(false);
              }}
            >
              <X size={16} color="#f50000" strokeWidth={1.25} />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full sm:w-1/2 px-3 mb-6 md:mb-0">
              <p className="pb-2">Vehicle Make</p>
              <Input type="text" defaultValue={make} {...register("carMake")} />
              {errors.carMake && (
                <p className={`${styles.formErrorStyles}`}>
                  Please enter car manufacturer name!
                </p>
              )}
            </div>
            <div className="w-full sm:w-1/2 px-3 mb-6 sm:mb-0">
              <p className="pb-2">Car Model</p>
              <Input
                type="text"
                defaultValue={model}
                {...register("carModel")}
              />
              {errors.carModel && (
                <p className={`text-red-500 ${styles.formErrorStyles}`}>
                  Please enter car model
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full sm:w-1/2 px-3 mb-6 sm:mb-0">
              <p className="pb-2">plate Number</p>
              <Input
                type="text"
                defaultValue={plateNumber}
                {...register("plateNumber")}
              />
              {errors.plateNumber && (
                <p className={`text-red-500 ${styles.formErrorStyles}`}>
                  Please enter car plate number
                </p>
              )}
            </div>
            <div className="w-full sm:w-1/2 px-3 mb-6 sm:mb-0">
              <p className="pb-2">Year</p>
              <Input type="text" defaultValue={year} {...register("carYear")} />
              {errors.carYear && (
                <p className={`${styles.formErrorStyles}`}>
                  please enter year car was manufactured!
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
              {isLoading ? "Submitting" : "Submit"}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default EditCar;
