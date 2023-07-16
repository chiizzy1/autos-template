"use client";

import { FC } from "react";
import axios, { AxiosError } from "axios";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation } from "@tanstack/react-query";
import styles from "@/style";
import { toast } from "../ui/toast";
import Select from "react-select";
import { useRouter } from "next/navigation";
import { createCar } from "@/helpers/customers";
import { Button } from "../ui/Button";
import { AiOutlineClose } from "react-icons/ai";
import { Input } from "../ui/Input";
import { Textarea } from "../ui/Textarea";

interface EditRepairProps {
  repairDetails: any;
  setToggleModal: (toggle: boolean) => void;
}

const EditRepair: FC<EditRepairProps> = ({ repairDetails, setToggleModal }) => {
  const {
    id,
    description,
    fixed,
    paid,
    estimatedCost,
    delivered,
    repairStatus,
  } = repairDetails;

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

  // determine the correct repair stage label to display to our user from data gotten from our database
  const getRepairStatusLabel = repairStages.find(
    ({ value }) => value === repairStatus
  )?.label;

  const getPaidLabel = selectOptions.find(({ value }) => value === paid)?.label;
  const getFixedLabel = selectOptions.find(
    ({ value }) => value === fixed
  )?.label;
  const getDeliveredLabel = selectOptions.find(
    ({ value }) => value === delivered
  )?.label;

  // const getRepairStatusLabel: {
  //   value: string;
  //   label: string;
  // }[] = repairStages.filter((obj) => obj.value === repairStatus);

  // const getPaidLabel: {
  //   value: boolean;
  //   label: string;
  // }[] = selectOptions.filter((obj) => obj.value === paid);

  // const getFixedLabel: {
  //   value: boolean;
  //   label: string;
  // }[] = selectOptions.filter((obj) => obj.value === fixed);

  // const getDeliveredLabel: {
  //   value: boolean;
  //   label: string;
  // }[] = selectOptions.filter((obj) => obj.value === delivered);

  // Handle Form with Yup
  const Schema = yup.object().shape({
    estimatedCost: yup.number(),
    paid: yup.boolean(),
    fixed: yup.boolean(),
    delivered: yup.boolean(),
    description: yup.string(),
    repairStatus: yup.string(),
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(Schema) });

  const handleFormSubmit = (data: any) => {
    console.log(data);
    mutate(data);
  };

  // const editRepair: any = async (info: any) => {
  //   console.log("Info:", info);
  //   const { data } = await axios.put(`/api/repairs/update/${repairId}`, {
  //     info,
  //   });
  //   return data;
  // };

  const { mutate, error, isLoading, isError } = useMutation(
    async (info: any) => {
      console.log("Info:", info);
      const { data } = await axios.put(`/api/repairs/update/${id}`, {
        ...info,
      });
      return data;
    },
    {
      onSuccess: (successData) => {
        console.log(successData);
        setToggleModal(false);

        toast({
          title: "success creating new repair",
          message: "okay",
          type: "success",
        });
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
    }
  );

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="fixed bg-black/50 w-full h-full z-20 left-0 top-0 ">
        <div className="absolute bg-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-12 rounded-lg flex flex-col gap-6">
          <div className="flex">
            <div
              className="p-1 border border-red-500 rounded-md"
              onClick={() => {
                setToggleModal(false);
              }}
            >
              <AiOutlineClose className="text-2xl  text-red-500 font-black cursor-pointer" />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full sm:w-1/2 px-3 mb-6 md:mb-0">
              <p className="pb-2">Estimated Cost</p>
              <Input
                className={`${styles.formInputStyles}`}
                type="text"
                defaultValue={`${estimatedCost}`}
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
                defaultValue={{
                  value: repairStatus,
                  label: getRepairStatusLabel,
                }}
                render={({ field }) => (
                  <Select
                    options={repairStages}
                    {...field}
                    className="bg-slate-100 text-black"
                  />
                )}
              />
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full sm:w-1/3 px-3 mb-6 sm:mb-0">
              <p className="pb-2">Paid</p>

              <Controller
                name="repairStatus"
                control={control}
                defaultValue={{ value: paid, label: getPaidLabel }}
                render={({ field }) => (
                  <Select
                    options={selectOptions}
                    {...field}
                    className="bg-slate-100 text-black"
                  />
                )}
              />
            </div>

            <div className="w-full sm:w-1/3 px-3 mb-6 sm:mb-0">
              <p className="pb-2">Fixed</p>

              <Controller
                name="repairStatus"
                control={control}
                defaultValue={{ value: fixed, label: getFixedLabel }}
                render={({ field }) => (
                  <Select
                    options={selectOptions}
                    {...field}
                    className="bg-slate-100 text-black"
                  />
                )}
              />
            </div>

            <div className="w-full sm:w-1/3 px-3 mb-6 sm:mb-0">
              <p className="pb-2">Delivered</p>

              <Controller
                name="repairStatus"
                control={control}
                defaultValue={{
                  value: delivered,
                  label: getDeliveredLabel,
                }}
                render={({ field }) => (
                  <Select
                    options={selectOptions}
                    {...field}
                    className="bg-slate-100 text-black"
                  />
                )}
              />
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3 mb-6 sm:mb-0">
              <p className="pb-2">Repair description</p>
              <Textarea
                defaultValue={`${description}`}
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
              variant="default"
              className="items-center"
              isLoading={isLoading}
              disabled={isLoading}
            >
              {isLoading ? "Editing ..." : "Edit repair"}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default EditRepair;
