"use client";


import TrackDetails from "@/components/tracking/TrackDetails";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "@/components/ui/Button";
import styles from "@/style";
import FAQ from "@/components/tracking/FAQ";
import { toast } from "@/components/ui/toast";
import LargeHeading from "@/components/ui/LargeHeading";
import Paragraph from "@/components/ui/Paragraph";
import { Input } from "@/components/ui/Input";

export default function TrackPage() {
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

  const { data, mutate, isLoading } = useMutation(
    ["track"],
    trackData,
    {
      onSuccess: (successData) => {
        console.log(successData);
      },
      onError: (error) => {
        if (error instanceof AxiosError) {
          toast({
            title: "Error tracking your car!",
            message: `${error?.response?.data.error} ⚠️`,
            type: "error",
          });
        }
  
        console.log(error);
      },
    }
  );

  const handleFormSubmit = (data: any) => {
    mutate(data.trackId);
  };

  return (
    <main className="relative flex items-center justify-center">
      <div className="sm:py-16 py-6 w-full">
        <div className="container max-w-7xl mx-auto">

          <LargeHeading>Track Your Car Repair</LargeHeading>

          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <div className="flex flex-wrap items-center -mx-3 mb-6 transition-all ease-in-out">
              <div className="w-full sm:w-1/2 px-3 mb-6 md:mb-0">
                <Input
                  className="bg-zinc-100"
                  type="text"
                  placeholder="enter your tracking ID here..."
                  {...register("trackId")}
                />
                {errors.trackId && (
                  <p className={`${styles.formErrorStyles}`}>
                    Please enter a valid tracking ID!
                  </p>
                )}
              </div>

              <div className="w-full sm:w-1/2 px-3 mb-6 md:mb-0">
                <Button
                  variant="purple"
                  className="items-center w-full"
                  isLoading={isLoading}
                  disabled={isLoading}
                >
                  {isLoading ? "Tracking car repair..." : "Track your repair"}
                </Button>
              </div>
            </div>
          </form>
          {data && <TrackDetails data={data} />}
          <FAQ />
        </div>
      </div>
    </main>
  );
}
