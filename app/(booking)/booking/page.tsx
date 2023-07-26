import BookingSideBar from '@/components/booking/BookingSideBar';
import BookingState from '@/components/booking/BookingState';
import LargeHeading from '@/components/ui/LargeHeading';
import { FC } from 'react'

interface pageProps {
  
}


const page: FC<pageProps> = ({}) => {
  return (
    <main className="relative flex items-center justify-center">
      <div className="sm:py-16 py-6 w-full">
        <div className="container max-w-7xl mx-auto">
          <LargeHeading>Book an Appointment</LargeHeading>

          <div className="flex gap-6 flex-col md:flex-row transition-all ease-in-out">
            <div className="basis-2/3 w-full rounded-lg p-6 bg-white relative">
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