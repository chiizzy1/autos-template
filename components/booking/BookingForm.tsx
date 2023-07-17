"use client";

import { FC } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from "@/style";
import { Textarea } from "../ui/Textarea";
import { Input } from "../ui/Input";
import { appointmentForm } from "@/constants";
import { Button } from "../ui/Button";

interface BookingFormProps {
  onSubmit: (formData: any) => void;
  isLoading: boolean;
}

const BookingForm: FC<BookingFormProps> = ({ onSubmit, isLoading }) => {
  // Handle Form with Yup
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

  // const form = appointmentForm.map((info, index) => (
  //   <div key={info.register}>
  //     {info.element === "input" ? (
  //       <div className={`w-full ${info.width} px-3 mb-6 md:mb-0`}>
  //         <p className="pb-2">{info.label}</p>
  //         <Input
  //           type={info.type}
  //           placeholder={info.placeholder}
  //           className="bg-slate-100"
  //           {...register(`${info.register}`)}
  //         />
  //         {errors.firstName && (
  //           <p className={`text-red-400 text-xs italic`}>{info.errorMessage}</p>
  //         )}
  //       </div>
  //     ) : (
  //       <div className="w-full px-3 mb-6 sm:mb-0">
  //         <p className="pb-2">{info.label}</p>
  //         <Textarea
  //           placeholder={info.placeholder}
  //           {...register(`${info.register}`)}
  //           className="bg-slate-100"
  //         />
  //         {errors.message && (
  //           <p className={`${styles.formErrorStyles}`}>{info.errorMessage}</p>
  //         )}
  //       </div>
  //     )}
  //   </div>
  // ));

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full sm:w-1/2 px-3 mb-6 md:mb-0">
          <p className="pb-2">First Name</p>
          <Input
            type="text"
            placeholder="e.g John.."
            className="bg-slate-100"
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
            className="bg-slate-100"
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
            className="bg-slate-100"
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
            className="bg-slate-100"
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
            className="bg-slate-100"
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
            className="bg-slate-100"
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
            className="bg-slate-100"
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
            className="bg-slate-100"
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
