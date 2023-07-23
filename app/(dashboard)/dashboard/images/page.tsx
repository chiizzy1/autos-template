"use client";

import Header from "@/components/dashboard/Header";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import Loading from "@/components/ui/Loading";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";

//Fetch All posts
// const fetchDetails = async (customerId: string) => {
//   const { data } = await axios.get(`/api/customers/${customerId}`);
//   return data.customerData;
// };

export default function UploadImages() {
  // const { data, isError, isLoading } = useQuery({
  //   queryKey: ["customer"],
  //   queryFn: () => fetchDetails(url.params.customerId),
  // });

  // if (isError) {
  //   return <h4 className="text-red-500 font-bold text-2xl">Error Loading page!</h4>
  // }

  const [image, setImage] = useState<any>();
  const handleImageUpload = (e: any) => {
    const file = e.target.files[0];

    TransformFileData(file);
  };

  const TransformFileData = (file: File) => {
    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImage(reader.result);
      };
    }
  };

  const editCustomerData: any = async (info: any) => {
    console.log("info:", info);
    const { data } = await axios.post("/api/images/upload", {
      image: info,
    });
    return data;
  };

  const { mutate, error, isLoading, isError } = useMutation(editCustomerData, {
    onSuccess: (successData) => {
      console.log(successData);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const submitFile = () => {
    // console.log("submitted:", image);
    mutate(image);
  };

  return (
    <main className="min-h-screen">
      <Header page="" />
      {/* {isLoading && <Loading text="loading customer data" />} */}
      <Input
        type="file"
        accept="image/png, image/jpeg"
        onChange={handleImageUpload}
      />

      <Button
        variant="purple"
        isLoading={isLoading}
        disabled={isLoading}
        onClick={submitFile}
      >
        Submit
      </Button>

      <div className="pt-6 rounded-lg bg-white p-4 overflow-hidden w-32 h-32">
        {image ? (
          <Image src={image} alt="image" width={500} height={500} />
        ) : (
          <p>Product image upload preview will appear here!</p>
        )}
      </div>
    </main>
  );
}
