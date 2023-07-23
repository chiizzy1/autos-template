"use client";

import { FC } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from "@/style";
import { Button } from "../ui/Button";
import { AiOutlineClose } from "react-icons/ai";
import axios, { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "../ui/toast";
import Select from "react-select";
import { Textarea } from "../ui/Textarea";
import { Input } from "../ui/Input";

interface NewClientEntryProps {
  setToggle: (toggle: boolean) => void;
}

const NewClientEntry: FC<NewClientEntryProps> = ({ setToggle }) => {
  const { push } = useRouter();

  // Handle Form with Yup
  const Schema = yup.object().shape({
    firstName: yup.string().required("User Name cannot be empty!"),
    lastName: yup.string().required("User Name cannot be empty!"),
    email: yup.string().email().required("Please enter a valid email address"),
    phone: yup.number().required("Please enter a valid phone number"),
    carMake: yup.string().required("please enter car make"),
    carModel: yup.string().required("What model is your?"),
    carYear: yup.number().required("What year was your car manufactured?"),
    plateNumber: yup.string().required("enter plate number"),
    estimatedCost: yup.number().required("please enter car make"),
    description: yup.string().required("enter plate number"),
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ resolver: yupResolver(Schema) });

  const { mutate, error, isLoading, isError } = useMutation({
    mutationFn: async (info: any) => {
      const { data } = await axios.post("/api/newclient", info);
      return data.clientData;
    },
    onSuccess: (successData) => {
      const { customerId } = successData;
      setToggle(false);

      toast({
        title: "success creating new repair",
        message: "okay",
        type: "success",
      });
      push(`/dashboard/customers/${customerId}`);
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

  const selectOptions = [
    { value: true, label: "Yes" },
    { value: false, label: "No" },
  ];

  // Check-In  In-Progress  Ready-for-Pick-up
  const repairStages = [
    { value: "Check-In", label: "Check-In" },
    { value: "In-Progress", label: "In Progress" },
    { value: "Ready-for-Pick-up", label: "Ready for Pick up" },
    { value: "Delivered", label: "Delivered" },
  ];

  const handleFormSubmit = (data: any) => {
    mutate({
      ...data,
      fixed: data.fixed.value,
      paid: data.paid.value,
      repairStatus: data.repairStatus.value,
    });
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="fixed bg-black/50 w-full h-full z-20 left-0 top-0 overflow-scroll">
        <div className="absolute bg-white top-[90%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-12 rounded-lg flex flex-col gap-6">
          <div className="flex">
            <div
              className="p-1 border border-red-500 rounded-md"
              onClick={() => {
                setToggle(false);
              }}
            >
              <AiOutlineClose className="text-2xl  text-red-500 font-black cursor-pointer" />
            </div>
          </div>
          <h3 className="font-bold text-center text-xl">Create new entry</h3>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full sm:w-1/2 px-3 mb-6 md:mb-0">
              <p className="pb-2">First Name</p>
              <Input
                type="text"
                placeholder="First Name..."
                {...register("firstName")}
              />
              {errors.firstName && (
                <p className={`text-red-400 text-xs italic`}>
                  First name is required.
                </p>
              )}
            </div>
            <div className="w-full sm:w-1/2 px-3 mb-6 sm:mb-0">
              <p className="pb-2">Last Name</p>
              <Input
                type="text"
                placeholder="Last name..."
                {...register("lastName")}
              />
              {errors.lastName && (
                <p className={`${styles.formErrorStyles}`}>
                  Last name is required.
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full sm:w-1/2 px-3 mb-6 md:mb-0">
              <p className="pb-2">Phone</p>
              <Input type="tel" placeholder="Phone..." {...register("phone")} />
              {errors.phone && (
                <p className={`${styles.formErrorStyles}`}>
                  Please enter a valid phone number.
                </p>
              )}
            </div>
            <div className="w-full sm:w-1/2 px-3 mb-6 sm:mb-0">
              <p className="pb-2">Email</p>
              <Input
                type="email"
                placeholder="Email..."
                {...register("email")}
              />
              {errors.email && (
                <p className={`${styles.formErrorStyles}`}>
                  Please enter a valid email address.
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full sm:w-1/3 px-3 mb-6 md:mb-0">
              <p className="pb-2">Car Make</p>
              <Input
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
            <div className="w-full sm:w-1/3 px-3 mb-6 sm:mb-0">
              <p className="pb-2">Car Model</p>
              <Input
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
            <div className="w-full sm:w-1/3 px-3 mb-6 sm:mb-0">
              <p className="pb-2">Car Year</p>
              <Input
                type="number"
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

          <div className="flex flex-wrap -mx-3 mb-6">
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

            <div className="w-full sm:w-1/2 px-3 mb-6 sm:mb-0">
              <p className="pb-2">Plate Number</p>
              <Input
                type="text"
                placeholder="e.g GLE 63..."
                {...register("plateNumber")}
              />
              {errors.plateNumber && (
                <p className={`text-red-500 ${styles.formErrorStyles}`}>
                  Please enter your car plateNumber
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full sm:w-1/3 px-3 mb-6 md:mb-0">
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

            <div className="w-full sm:w-1/3 px-3 mb-6 sm:mb-0">
              <p className="pb-2">Payment Status</p>

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
              <p className="pb-2">Fixed</p>

              <Controller
                name="fixed"
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
              <p className="pb-2">Car Diagnosis</p>
              <Textarea
                placeholder="e.g servicing..."
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
              {isLoading ? "Submiting" : "Submit"}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default NewClientEntry;
