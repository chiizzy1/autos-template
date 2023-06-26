"use client";

// You need to import our styles for the button to look right. Best to import in the root /layout.tsx but this is fine
import "@uploadthing/react/styles.css";

import { UploadButton } from "@uploadthing/react";

import { useState } from "react";
import Link from "next/link";
import { uploadFiles } from "@/lib/uploadthing";
import { GiTireIronCross } from "react-icons/gi";
import Image from "next/image";
import { OurFileRouter } from "@/app/api/uploadthing/core";
import axios, { AxiosError } from "axios";
import { toast } from "@/components/ui/toast";
import { useMutation } from "@tanstack/react-query";

export default function UploadButtonPage() {
  const [images, setImages] = useState<
    {
      fileUrl: string;
      fileKey: string;
    }[]
  >();

  const title = images ? (
    <>
      <p>Upload Complete!</p>
      <p className="mt-2"> files available</p>
    </>
  ) : null;

  const imgList = (
    <>
      {title}
     {images && <ul>
          <li key={images[0].fileUrl} className="mt-2">
            <Link href={images[0].fileUrl} target="_blank">
              {images[0].fileUrl}
            </Link>
          </li>
      </ul>}
    </>
  );

  const { mutate, error, isLoading, isError } = useMutation({
    mutationFn: async (info: any) => {
      console.log('data:',info[0]);
      const { data } = await axios.post(`/api/upload`, info[0]);
      return data;
    },
    onSuccess: (successData) => {
      console.log(successData);

      toast({
        title: "success uploading image",
        message: "okay",
        type: "success",
      });
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast({
          title: "Error uploading image",
          message: `${error?.response?.data.error} ⚠️`,
          type: "error",
        });
      }
    },
  });

  const handleSubmit = () => {
    mutate(images);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24">
      <UploadButton<OurFileRouter>
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          if (res) {
            setImages(res);
          }
          //alert("Upload Completed");
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
      {imgList}

      {images && (
        <button className="bg-red-500 rounded-lg p-4 " onClick={handleSubmit}>
          {" "}
          upload to db
        </button>
      )}
    </main>
  );
}

// const UploadSomeFilesPage = () => {
//   const [image, setImage] = useState<null | any | File>();
//   // const files = [
//   //   new File(["foo"], "foo.txt", {
//   //     type: "text/plain",
//   //   }),
//   // ];

//   const onImageChange = (e: any) => {
//     const file = e.target.files[0];

//     console.log(file);
//     TransformFileData(file);
//   };

//   const TransformFileData = (file: File) => {
//     const reader = new FileReader();

//     if (file) {
//       reader.readAsDataURL(file);
//       reader.onloadend = () => {
//         setImage(reader.result);
//       };
//     } else {
//       setImage(null);
//     }
//   };

//   const uploadSomeFiles = async () => {
//     const [res] = await uploadFiles([image], "imageUploader");
//     return {
//       file: {
//         url: res.fileUrl,
//       },
//     };
//   };

//   const handleSubmit = async () => {
//     if (!image) {
//       alert("Please upload an Image");
//     } else {
//       console.log("image dey");
//       uploadSomeFiles();
//     }
//   };

//   return (
//     <div>
//       <input type="file" name="postImage" onChange={onImageChange} />

//       <button className={`p-5 bg-orange-400 mt-0`} onClick={handleSubmit}>
//         share
//       </button>
//       {image && (
//         <div className="flex  gap-4 w-24 h-24 overflow-hidden rounded-lg relative">
//           <GiTireIronCross
//             className="text-red-600 absolute right-4 top-2 cursor-pointer"
//             onClick={() => setImage(null)}
//           />
//           <Image
//             src={image}
//             alt="img-preview"
//             className="w-full max-h-72 object-cover rounded-lg"
//             width={400}
//             height={400}
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default UploadSomeFilesPage;
