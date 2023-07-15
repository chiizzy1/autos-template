import { useRouter } from "next/navigation";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { toast } from "../ui/toast";
import axios, { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import styles from "@/style";
import { AiOutlineClose } from "react-icons/ai";

interface NewCustomerProps {
  setNewCustomer: (toggle: boolean) => void;
}

const NewCustomer: FC<NewCustomerProps> = ({ setNewCustomer }) => {
  const { push } = useRouter();

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
    control,
    formState: { errors },
  } = useForm({ resolver: yupResolver(Schema) });

  const { mutate, error, isLoading, isError } = useMutation({
    mutationFn: async (info: any) => {
      const { data } = await axios.post("/api/customers/createNew", info);
      return data.customerData;
    },
    onSuccess: (successData) => {
      const { id } = successData;
      setNewCustomer(false);

      toast({
        title: "success creating new repair",
        message: "okay",
        type: "success",
      });
      push(`/dashboard/customers/${id}`);
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
      <div className="fixed bg-black/50 w-full h-full z-20 left-0 top-0">
        <div className="absolute bg-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-12 rounded-lg flex flex-col gap-6">
          <div className="flex">
            <div
              className="p-1 border border-sky-500 rounded-md"
              onClick={() => {
                setNewCustomer(false);
              }}
            >
              <AiOutlineClose className="text-4xl  text-sky-500 font-black cursor-pointer" />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full sm:w-1/2 px-3 mb-6 md:mb-0">
              <p className="pb-2">First Name</p>
              <Input
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
              <Input
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
              <Input
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
              <Input
                className={`${styles.formInputStyles}`}
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

          <div className="flex items-center justify-center w-full">
            <Button
              variant="purple"
              className="items-center"
              isLoading={isLoading}
              disabled={isLoading}
            >
              {isLoading ? "Loading" : "Add New Customer"}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default NewCustomer;
