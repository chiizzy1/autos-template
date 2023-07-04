"use client";

import { useCallback, useState } from "react";
// Note: `useUploadThing` is IMPORTED FROM YOUR CODEBASE using the `generateReactHelpers` function
import { useDropzone } from "react-dropzone";
import type { FileWithPath } from "react-dropzone";
import {
  generateClientDropzoneAccept,
  generateMimeTypes,
} from "uploadthing/client";

import { useUploadThing } from "@/lib/uploadthing";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

export default function MultiUploader() {
  const [files, setFiles] = useState<File[]>([]);
  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    setFiles(acceptedFiles);
  }, []);

  const { startUpload, permittedFileInfo, isUploading } = useUploadThing(
    "imageUploader",
    {
      onClientUploadComplete: (data) => {
        alert("uploaded successfully!");
        console.log(data);
      },
      onUploadError: () => {
        alert("error occurred while uploading");
      },
    }
  );

  const generatePermittedFileTypes = (config?: any) => {
    const fileTypes = config ? Object.keys(config) : [];

    const maxFileCount = config
      ? Object.values(config).map((v: any) => v.maxFileCount)
      : [];

    return { fileTypes, multiple: maxFileCount.some((v) => v && v > 1) };
  };

  const { fileTypes, multiple } = generatePermittedFileTypes(
    permittedFileInfo?.config
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: fileTypes ? generateClientDropzoneAccept(fileTypes) : undefined,
  });

  return (
    <div className="pt-8">
      <input
        className="py-8"
        type="file"
        onChange={(e: any) => {
          setFiles(e.target.files);
          console.log(e.target.files[0]);
        }}
      />
      <Button
        isLoading={isUploading}
        type="button"
        className="max-w-sm w-full bg-slate-200"
        onClick={() => {
          if (!files) return;
          void startUpload(Array.from(files));
        }}
        disabled={isUploading}
      >
        Upload
      </Button>
    </div>
  );
}
