"use client";

import Image from "next/image";
import { FC, useState } from "react";
import EditImageModal from "./EditImageModal";

interface EditImageCardProps {
  image: any;
}

const EditImageCard: FC<EditImageCardProps> = ({ image }) => {
  const [toggle, setToggle] = useState<boolean>(false);
  return (
    <>
      <div
        className="overflow-hidden relative rounded-lg w-full h-32 cursor-pointer"
        onClick={() => setToggle(true)}
      >
        <Image
          src={image.url}
          alt="img_thumbnail"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      {toggle && <EditImageModal image={image} setToggle={setToggle} />}
    </>
  );
};

export default EditImageCard;
