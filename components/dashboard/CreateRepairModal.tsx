"use client";

import { Dispatch, FC, SetStateAction } from "react";
import axios, { AxiosError } from "axios";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation } from "@tanstack/react-query";
import styles from "@/style";
import { toast } from "../ui/toast";
import { useRouter } from "next/navigation";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Textarea } from "../ui/Textarea";
import Select from "react-select";
import { X } from "lucide-react";

interface CreateRepairModalProps {
  carId: string;
  setToggleModal: Dispatch<SetStateAction<boolean>>;
}

const CreateRepairModal: FC<CreateRepairModalProps> = ({
  carId,
  setToggleModal,
}) => {
  // console.log(customerId);
  const { refresh } = useRouter();

  const selectOptions = [
    { value: true, label: "Yes" },
    { value: false, label: "No" },
  ];

  // Repair Stages Options
  const repairStages = [
    { value: "Check-In", label: "Check-In" },
    { value: "In-Progress", label: "In Progress" },
    { value: "Ready-for-Pick-up", label: "Ready for Pick up" },
    { value: "Delivered", label: "Delivered" },
  ];

  const Schema = yup.object().shape({
    estimatedCost: yup.number().required(),
    description: yup.string().required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({ resolver: yupResolver(Schema) });

  const createNewCar: any = async (info: any) => {
    console.log(info);
    const { data } = await axios.post(`/api/repairs/createNew/${carId}`, info);
    return data;
  };

  const { mutate, error, isLoading, isError } = useMutation(createNewCar, {
    onSuccess: (successData) => {
      console.log(successData);
      setToggleModal(false);

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

  const onSubmit = (data: any) => {
    mutate({
      ...data,
      fixed: data.fixed.value,
      paid: data.paid.value,
      delivered: data.delivered.value,
      repairStatus: data.repairStatus.value,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="fixed bg-black/50 w-full h-full z-20 left-0 top-0 ">
        <div className="absolute bg-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-12 rounded-lg flex flex-col gap-6">
          <div className="flex">
            <div
              className="p-1 border border-red-500 rounded-md"
              onClick={() => {
                setToggleModal(false);
              }}
            >
              <X size={16} color="#f50000" strokeWidth={1.25} />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full sm:w-1/2 px-3 mb-6 md:mb-0">
              <p className="pb-2">Estimated Cost</p>
              <Input
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

            <div className="w-full sm:w-1/2 px-3 mb-6 sm:mb-0">
              <p className="pb-2">Repair Status</p>

              <Controller
                name="repairStatus"
                control={control}
                defaultValue={{ value: "Check-In", label: "Check-In" }}
                render={({ field }) => (
                  <Select options={repairStages} {...field} />
                )}
              />
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full sm:w-1/3 px-3 mb-6 sm:mb-0">
              <p className="pb-2">Fixed</p>

              <Controller
                name="paid"
                control={control}
                defaultValue={{ value: false, label: "No" }}
                render={({ field }) => (
                  <Select options={selectOptions} {...field} />
                )}
              />
            </div>

            <div className="w-full sm:w-1/3 px-3 mb-6 sm:mb-0">
              <p className="pb-2">Paid</p>

              <Controller
                name="fixed"
                control={control}
                defaultValue={{ value: false, label: "No" }}
                render={({ field }) => (
                  <Select options={selectOptions} {...field} />
                )}
              />
            </div>

            <div className="w-full sm:w-1/3 px-3 mb-6 sm:mb-0">
              <p className="pb-2">Delivered</p>

              <Controller
                name="delivered"
                control={control}
                defaultValue={{ value: false, label: "No" }}
                render={({ field }) => (
                  <Select options={selectOptions} {...field} />
                )}
              />
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3 mb-6 sm:mb-0">
              <p className="pb-2">Repair description</p>
              <Textarea
                placeholder="e.g Gearbox repair"
                {...register("description")}
              />
              {errors.description && (
                <p className={`text-red-500 ${styles.formErrorStyles}`}>
                  Please enter repair description
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
              {isLoading ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CreateRepairModal;
