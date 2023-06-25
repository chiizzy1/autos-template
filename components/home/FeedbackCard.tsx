import { quotes } from "@/assets";
import Image, { StaticImageData } from "next/image";


import { FC } from 'react'

interface FeedbackCardProps {
    content: string,
     name: string,
     title: string,
     img: StaticImageData | string
}

const FeedbackCard: FC<FeedbackCardProps> = ({ content, name, title, img }) => {
  return (
    <div className="flex flex-col text-black rounded-lg shadow-md hover:shadow-xl p-5 bg-white ">
      <Image src={quotes} alt="double_quotes" className="w-[42.6px] h-[27.6px] object-contain sm:mb-4 mb-2" />
      <p className="sm:mb-4 mb-2 text-sm max-w-[370px]">
        {content}
      </p>
  
      <div className="flex flex-row">
        <Image src={img} alt={name} className="w-[48px] h-[48px] rounded-full" />
        <div className="flex flex-col ml-4">
          <h4 className="text-sm font-medium leading-[32px]">
            {name}
          </h4>
          <p className="text-xs">
            {title}
          </p>
        </div>
      </div>
    </div>

//     <div className="w-full md:w-1/2 lg:w-1/3">
//         <div className="p-6 h-full bg-white border rounded-2xl">
//           <div className="flex flex-col justify-between h-full">
//             <div className="mb-5 block">
//               <div className="flex flex-wrap mb-4 -m-2">
//                 <div className="w-auto p-2">
//                   <Image src={img} alt={name} width={100} height={1000} />
//                 </div>
//                 <div className="w-auto p-2">
//                   <h4 className="font-semibold leading-normal">{name}</h4>
//                   <p className="text-gray-500 uppercase">{title}</p>
//                 </div>
//               </div>
//               <p className="text-lg font-medium">{content}</p>
//             </div>
//           </div>
//         </div>
// </div>
  );
}

export default FeedbackCard

