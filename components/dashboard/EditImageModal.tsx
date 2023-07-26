import { Dispatch, FC, SetStateAction, useState } from "react";
import { X } from "lucide-react";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import axios from "axios";
import { toast } from "../ui/toast";

interface EditImageModalProps {
  setToggle: Dispatch<SetStateAction<boolean>>;
  image: any;
}

const EditImageModal: FC<EditImageModalProps> = ({ setToggle, image }) => {
  const [newImage, setNewImage] = useState<any>();
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

  const editImage = async (info: any) => {
    const { data } = await axios.post(`/api/images/update/${id}`, {
      newImage: info,
    });
    return data.updateSuccess;
  };

  const { mutate, error, isLoading, isError } = useMutation(editImage, {
    onSuccess: () => {
      setToggle(false);
      toast({
        message: "succcess",
        title: "successfully updated image",
        type: "success",
      });
    },
    onError: (error) => {
      setToggle(false);
    },
  });

  const submitFile = () => {
    mutate(newImage);
  };

  return (
    <div className="fixed bg-black/50 w-full h-full z-20 left-0 top-0">
      <div className="absolute bg-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-6 rounded-lg flex flex-col gap-6">
        <div className="flex">
          <div
            className="p-1 border border-red-500 rounded-md cursor-pointer"
            onClick={() => {
              setToggle(false);
            }}
          >
            <X size={16} color="#f50000" strokeWidth={1.25} />
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="overflow-hidden relative rounded-lg w-full h-56 cursor-pointer">
            <Image
              src={newImage ? newImage : url}
              alt="preview_thumbnail"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <div className="flex items-center gap-6 w-full">
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
                {isLoading ? "Uploading..." : "Upload"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditImageModal;
