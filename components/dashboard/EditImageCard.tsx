"use client";

import Image from "next/image";
import { FC, useState } from "react";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

interface EditImageCardProps {
  image: any;
}

const EditImageCard: FC<EditImageCardProps> = ({ image }) => {
  const [newImage, setNewImage] = useState<any>();
  console.log(image);
  const { key, url, id } = image;

  const handleImageUpload = (e: any) => {
    const file = e.target.files[0];

    TransformFileData(file);
  };

  const TransformFileData = (file: File) => {
    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setNewImage(reader.result);
      };
    }
  };

  const editImage: any = async (info: any) => {
    console.log("info:", info);
    const { data } = await axios.post(`/api/images/update/${id}`, info);
    return data.updateSuccess;
  };

  const { mutate, error, isLoading, isError } = useMutation(editImage, {
    onSuccess: (successData) => {
      console.log(successData);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const submitFile = () => {
    // console.log("submitted:", image);
    mutate({
      newImage,
      oldImageUrl: key,
    });
  };

  return (
    <div className="flex gap-4 p-4 h-64 w-full bg-white rounded-lg">
      <div className="overflow-hidden rounded-lg w-full h-full">
        <Image src={url} width={400} height={500} alt="image" />
      </div>

      <div className="overflow-hidden  border-2 rounded-lg w-full h-full">
        {newImage ? (
          <Image src={newImage} alt="newImage" width={500} height={500} />
        ) : (
          <p>image upload preview will appear here!</p>
        )}
      </div>

      <div className="flex items-center border-2 w-full">
        <Input
          type="file"
          accept="image/png, image/jpeg"
          onChange={handleImageUpload}
        />
        {newImage && (
          <Button
            variant="purple"
            isLoading={isLoading}
            disabled={isLoading}
            onClick={submitFile}
          >
            Upload Image
          </Button>
        )}
      </div>
    </div>
  );
};

export default EditImageCard;
