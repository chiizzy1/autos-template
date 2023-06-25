"use client";

import { FC } from "react";
import axios, { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation } from "@tanstack/react-query";
import styles from "@/style";
import { toast } from "../ui/toast";
import { createNewCustomer } from "@/helpers/customers";
import { Button } from "../ui/Button";



interface EditCustomerInfoProps {
  customerId: string
  setCustomerEditModal: (toggle: boolean) => void
}

const EditCustomerInfo: FC<EditCustomerInfoProps> = ({customerId, setCustomerEditModal }) => {


   

  // Handle Form with Yup
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
    control,
  } = useForm({ resolver: yupResolver(Schema) });
    
      const editCustomerData: any = async (info: any) => {
        console.log(info);
        const { data } = await axios.put(`/api/customers/update/${customerId}`, {
          ...info,
        });
        return data;
      };
    
      const { mutate, error, isLoading, isError } = useMutation(editCustomerData, {
        onSuccess: (successData) => {
          console.log(successData);
            setCustomerEditModal(false)
          toast({
            title: "success editing car info",
            message: "okay",
            type: "success",
          });
        },
        onError: (error) => {
          if (error instanceof AxiosError) {
            // setCustomerEditModal(false)
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
          <p className="pb-2">First Name</p>
          <input
            className={`${styles.formInputStyles}`}
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
          <input
            className={`${styles.formInputStyles}`}
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
          <input
            className={`${styles.formInputStyles}`}
            type="tel"
            placeholder="Phone..."
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
          <input
            className={`${styles.formInputStyles}`}
            type="text"
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

      <div className="flex items-center justify-center w-full">
        <Button
          variant="default"
          className="items-center"
          isLoading={isLoading}
          disabled={isLoading}
        >{ isLoading ? "Editing... " :"Edit Customer details"}</Button>
      </div>
        </div></div></form>
  )
}

export default EditCustomerInfo