"use client";

import { FC } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from "@/style";
import { Textarea } from "../ui/Textarea";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";

interface BookingFormProps {
  onSubmit: (formData: any) => void;
  isLoading: boolean;
}

const BookingForm: FC<BookingFormProps> = ({ onSubmit, isLoading }) => {
  
  const Schema = yup.object().shape({
    firstName: yup.string().required("User Name cannot be empty!"),
    lastName: yup.string().required("User Name cannot be empty!"),
    email: yup.string().email().required("Please enter a valid email address"),
    phone: yup.number().required("Please enter a valid phone number"),
    carMake: yup.string().required("please enter car make"),
    carModel: yup.string().required("What model is your?"),
    carYear: yup.number().required("What year was your car manufactured?"),
    message: yup.string().required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(Schema) });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full sm:w-1/2 px-3 mb-6 md:mb-0">
          <p className="pb-2">First Name</p>
          <Input
            type="text"
            placeholder="e.g John.."
            {...register("firstName")}
          />
          {errors.firstName && (
            <p className={`${styles.formErrorStyles}`}>
              First name is required.
            </p>
          )}
        </div>
        <div className="w-full sm:w-1/2 px-3 mb-6 sm:mb-0">
          <p className="pb-2">Last Name</p>
          <Input
            type="text"
            placeholder="e.g Doe..."
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
            placeholder="e.g 081200000..."
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
            placeholder="e.g john@doe@gmail.com..."
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
          <p className="pb-2">Year</p>
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
        <div className="w-full px-3 mb-6 sm:mb-0">
          <p className="pb-2">Reason for Appointment</p>
          <Textarea
            placeholder="Share any additional information with us."
            {...register("message")}
          />
          {errors.message && (
            <p className={`${styles.formErrorStyles}`}>cannot be blank!</p>
          )}
        </div>
      </div>

      <div className="flex items-center justify-center w-full">
        <Button
          variant="purple"
          className="items-center w-1/2"
          isLoading={isLoading}
          disabled={isLoading}
        >
          {isLoading ? "Booking Appointment" : "Submit"}
        </Button>
      </div>
    </form>
  );
};

export default BookingForm;
