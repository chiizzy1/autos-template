"use client";

import { Dispatch, FC, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from "@/style";
import { Button } from "../ui/Button";
import { AiOutlineClose } from "react-icons/ai";
import axios, { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "../ui/toast";

interface NewClientEntryProps {
  setToggle: (toggle: boolean) => void;
  adminId: string;
}

const NewClientEntry: FC<NewClientEntryProps> = ({ setToggle, adminId }) => {
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
    paid: yup.boolean(),
    fixed: yup.boolean(),
    description: yup.string().required("enter plate number"),
    repairStatus: yup.string().required("enter repair status"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(Schema) });

  const createNewCar: any = async (info: any) => {
    const {
      firstName,
      lastName,
      email,
      phone,
      carMake,
      carModel,
      carYear,
      plateNumber,
      estimatedCost,
      paid,
      fixed,
      description,
      repairStatus,
    } = info;

    // console.log({firstName, lastName, email, phone, carMake, carModel, carYear, plateNumber, estimatedCost, paid, fixed, description})

    try {
      const customerdata = await axios.post(`/api/customers/createNew`, {
        email,
        firstName,
        lastName,
        phone,
      });
      const customerId = customerdata.data.customerData.id;
      console.log("Customer Id:", customerId);
      let carId: string | null = null;
      let repairId: string | null = null;

      if (customerId) {
        const carData = await axios.post(`/api/cars/createNew`, {
          plateNumber,
          carMake,
          carModel,
          carYear,
          ownerId: customerId,
        });
        carId = carData.data.CarData.id;
        console.log("Car id:", carId);
      }
      if (carId && customerId) {
        const repairData = await axios.post(`/api/repairs/createNew`, {
          description,
          estimatedCost,
          paid,
          fixed,
          carId,
          customerId,
          repairStatus,
        });
        repairId = repairData.data.RepairData.id;
        console.log("Repair Id:", repairId);
      }

      return { carId, customerId, repairId };
    } catch (error) {
      console.error(error);
    }
  };

  const { mutate, error, isLoading, isError } = useMutation(createNewCar, {
    onSuccess: (successData) => {
      console.log(successData);
      setToggle(false);

      toast({
        title: "success creating new repair",
        message: "okay",
        type: "success",
      });
      push(`/dashboard/customers/`);
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
    console.log(data);
    mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="fixed bg-black/50 w-full h-full z-20 left-0 top-0 overflow-scroll">
        <div className="absolute bg-white top-[90%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-12 rounded-lg flex flex-col gap-6">
          <h3 className="font-bold text-center text-xl">Create new entry</h3>
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

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full sm:w-1/3 px-3 mb-6 md:mb-0">
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
            <div className="w-full sm:w-1/3 px-3 mb-6 sm:mb-0">
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
            <div className="w-full sm:w-1/3 px-3 mb-6 sm:mb-0">
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

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full sm:w-1/2 px-3 mb-6 sm:mb-0">
              <p className="pb-2">repair staus</p>
              <input
                className={`${styles.formInputStyles}`}
                type="text"
                placeholder="e.g in progress..."
                {...register("repairStatus")}
              />
              {errors.repairStatus && (
                <p className={`${styles.formErrorStyles}`}>
                  please enter the repair status!
                </p>
              )}
            </div>
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
                  Please enter your car plateNumber
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full sm:w-1/2 px-3 mb-6 md:mb-0">
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
            <div className="w-full sm:w-1/2 px-3 mb-6 sm:mb-0">
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
              setToggle(false);
            }}
          >
            {" "}
            <AiOutlineClose />
          </div>

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

export default NewClientEntry;