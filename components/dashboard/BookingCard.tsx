"use client"


import { FC } from 'react'

interface BookingCardProps {
  info: any
}

const BookingCard: FC<BookingCardProps> = ({info}) => {
    console.log(info)
  return <div>BookingCard</div>
}

export default BookingCard