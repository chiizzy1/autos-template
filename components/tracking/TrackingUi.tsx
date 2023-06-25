"use client";

import { FC } from "react";
import { Button } from "../ui/Button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from "@/style";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import TransactionsTable from "./TransactionsTable";
import TrackUi from "./TrackUi";
import FAQ from "./FAQ";

interface TrackingUiProps {}

const TrackingUi: FC<TrackingUiProps> = ({}) => {
  const Schema = yup.object().shape({
    trackId: yup.string().required("please enter track id!!"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(Schema) });

  const trackData = async (id: any) => {
    const { data } = await axios.post(`/api/track/${id}`);
    return data.trackData;
  };

  const { data, mutate, error, isLoading, isError } = useMutation(
    ["track"],
    trackData,
    {
      onSuccess: (successData) => {
        console.log(successData);
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  const handleFormSubmit = (data: any) => {
    console.log(data);
    mutate(data.trackId);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full sm:w-full px-3 mb-6 md:mb-0">
            <p className="pb-2">trackId</p>
            <input
              className={`${styles.formInputStyles}`}
              type="text"
              placeholder="trackId..."
              {...register("trackId")}
            />
            {errors.trackId && (
              <p className={`${styles.formErrorStyles}`}>
                Please enter a valid phone number.
              </p>
            )}
          </div>
        </div>
        <Button
          variant="default"
          className="items-center"
          isLoading={isLoading}
          disabled={isLoading}
        >
          {isLoading ? "Fetching car repair data" : "Track your repair"}
        </Button>
      </form>
      {data ? (
        <div>
          <TrackUi status="Ready-for-Pick-up" />
          <TransactionsTable trackData={data} />
        </div>
      ) : (
        <FAQ />
      )}
    </div>
  );
};

export default TrackingUi;
