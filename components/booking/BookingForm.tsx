"use client";

import { Dispatch, FC, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from "@/style";

// interface BookingFormProps {
//   clientData: {};
//   setClientData: Dispatch<SetStateAction<{}>>
// }

interface BookingFormProps {
  onSubmit: (formData: any) => void
}

const BookingForm: FC<BookingFormProps> = ({onSubmit}) => {
  // Handle Form with Yup
  const Schema = yup.object().shape({
    firstName: yup.string().required("User Name cannot be empty!"),
    lastName: yup.string().required("User Name cannot be empty!"),
    email: yup.string().email().required("Please enter a valid email address"),
    phone: yup.number().required("Please enter a valid phone number"),
    carMake: yup.string().required("please enter car make"),
    carModel: yup.string().required("What model is your?"),
    carYear: yup.number().required("What year was your car manufactured?"),
    message: yup.string(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(Schema) });

  const handleFormSubmit = (data: {}) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
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
        <div className="w-full px-3 mb-6 sm:mb-0">
          <p className="pb-2">Reason for Appointment</p>
          <textarea
            className={`bg-zinc-100 ${styles.formInputStyles}`}
            placeholder="Share any additional information with us."
            {...register("message")}
          />
          {errors.message && (
            <p className={`${styles.formErrorStyles}`}>cannot be blank!</p>
          )}
        </div>
      </div>

      <div className="flex items-center justify-center w-full">
        <button
          type="submit"
          className={`bg-green-300 text-white px-6 py-2 rounded-sm`}
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default BookingForm;