"use client"

import { FC, useState } from 'react'
import BookingForm from './BookingForm'
import SelectDateTime from './SelectDateTime'

interface BookingStateProps {
  
}

interface DateType {
    justDate: Date | null;
    dateTime: Date | null;
  }

const BookingState: FC<BookingStateProps> = ({}) => {

    const [session, setSession] = useState<DateType>({
        justDate: null,
        dateTime: null,
      });


      const handleBookingSubmit = (formData: any) => {
       console.log(session ,formData)
       
       
          };
      

  return <div>
    <h4 className="font-medium text-lg">
                Select Appointment Date and Time
              </h4>
              <SelectDateTime session={session} setSession={setSession} />

              <h4 className="font-medium text-lg my-8">Booking Details</h4>
              <BookingForm onSubmit={handleBookingSubmit} />
  </div>
}

export default BookingState