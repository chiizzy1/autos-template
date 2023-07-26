"use client";

import { FC } from "react";
import axios, { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation } from "@tanstack/react-query";
import styles from "@/style";
import { toast } from "../ui/toast";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";

interface EditCustomerInfoProps {
  customerId: string;
  setCustomerEditModal: (toggle: boolean) => void;
  customerData: any;
}

const EditCustomerInfo: FC<EditCustomerInfoProps> = ({
  customerId,
  setCustomerEditModal,
  customerData,
}) => {
  const { firstName, lastName, email, phone } = customerData;

  const { refresh } = useRouter();
  const Schema = yup.object().shape({
    firstName: yup.string().required("User Name cannot be empty!"),
    lastName: yup.string().required("User Name cannot be empty!"),
    email: yup.string().email().required("Please enter a valid email address"),
    phone: yup.number().required("Please enter a valid phone number"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(Schema) });

  const editCustomerData: any = async (info: any) => {
    const { data } = await axios.put(`/api/customers/update/${customerId}`, {
      ...info,
    });
    return data;
  };

  const { mutate, error, isLoading, isError } = useMutation(editCustomerData, {
    onSuccess: (successData) => {
      console.log(successData);
      setCustomerEditModal(false);
      toast({
        title: "success",
        message: "succcessfully updated customer data",
        type: "success",
      });
      refresh();
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        setCustomerEditModal(false);
        toast({
          title: "Error editing customer info",
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
      <div className="fixed bg-black/50 w-full h-full z-20 left-0 top-0">
        <div className="absolute bg-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-12 rounded-lg flex flex-col gap-6">
          <div className="flex">
            <div
              className="p-1 border border-red-500 rounded-md"
              onClick={() => {
                setCustomerEditModal(false);
              }}
            >
              <X size={16} color="#f50000" strokeWidth={1.25} />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full sm:w-1/2 px-3 mb-6 md:mb-0">
              <p className="pb-2">First Name</p>
              <Input
                type="text"
                defaultValue={`${firstName}`}
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
                defaultValue={`${lastName}`}
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
              <Input
                type="tel"
                defaultValue={`${phone}`}
                {...register("phone")}
              />
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
                defaultValue={`${email}`}
                {...register("email")}
              />
              {errors.email && (
                <p className={`${styles.formErrorStyles}`}>
                  Please enter a valid email address.
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
              {isLoading ? "Editing... " : "Edit Customer details"}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default EditCustomerInfo;
