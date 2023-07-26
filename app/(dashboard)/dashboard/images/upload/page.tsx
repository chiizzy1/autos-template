"use client";

import Header from "@/components/dashboard/Header";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import SmallHeading from "@/components/ui/SmallHeading";
import { toast } from "@/components/ui/toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";

export default function UploadImages() {
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
    const { data } = await axios.post("/api/images/upload", {
      image: info,
    });
    return data;
  };

  const { mutate, error, isLoading, isError } = useMutation(editCustomerData, {
    onSuccess: (successData) => {
      toast({
        message: "Success",
        title: "Success",
        type: "success"
      })
      setImage('')
    },
    onError: (error) => {
      console.log(error);
      setImage("")
    },
  });

  const submitFile = () => {
    mutate(image);
  };

  return (
    <main className="min-h-screen">
      <Header page="" />
      <div className="p-4">
        <SmallHeading className="py-4">Upload Image</SmallHeading>
        <div className="flex flex-col sm:flex-row gap-6">
          <div className="pt-6 rounded-lg border p-4 overflow-hidden w-full relative h-60">
            {image ? (
              <Image src={image} alt="image_upload" fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
            ) : (
              <p>Image Preview</p>
            )}
          </div>

          <div className="flex flex-col gap-6 w-full">
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
              {isLoading ? "Uploading" : "Upload"}
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
