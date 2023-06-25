import BookingSideBar from '@/components/booking/BookingSideBar';
import BookingState from '@/components/booking/BookingState';
import { FC } from 'react'

interface pageProps {
  
}


const page: FC<pageProps> = ({}) => {
  return (
    <main className="relative flex items-center justify-center">
      <div className="sm:py-16 py-6 w-full">
        <div className="container max-w-7xl mx-auto">
          <h3 className="text-2xl text-dimPurple font-bold sm:pb-9 pb-6 w-full text-center">
            Book an Appointment
          </h3>

          <div className="flex gap-6">
            <div className="basis-2/3 w-full rounded-lg p-6 bg-white">
              <BookingState />
            </div>

            <div className="basis-1/3 w-full ">
              <BookingSideBar />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default page;