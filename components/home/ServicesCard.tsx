import Image, { StaticImageData } from 'next/image';
import { FC } from 'react'



interface ServicesCardProps {
    content: string,
     title: string,
     icon: string | StaticImageData
}

const ServicesCard: FC<ServicesCardProps> = ({content, title, icon}) => {
    return (
            <div className="flex flex-col justify-center items-center gap-2 shadow-md hover:shadow-xl rounded-md p-5 bg-white min-h-[12em]">
              <h4 className="text-black text-lg font-semibold">{title}</h4>
        
              <p className="max-w-[17em] text-center font-normal text-sm text-black">
                {content}
              </p> 
              <div className='hover:-rotate-[300deg]'>
                <Image src={icon} alt="icon" width={40} height={40} />
              </div>
            </div>
          );
}

export default ServicesCard