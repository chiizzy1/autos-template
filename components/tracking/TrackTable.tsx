"use client";

import { FC } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";

interface TrackTableProps {
  trackData: any;
}

const TrackTable: FC<TrackTableProps> = ({ trackData }) => {
  const {
    finishDate,
    firstName,
    lastName,
    make,
    model,
    year,
    description,
    estimatedCost,
    paid,
    fixed,
    delivered,
    startDate,
    deliveryDate,
  } = trackData;
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Customer Name</TableHead>
          <TableHead>vehicle info</TableHead>
          <TableHead>Vehicle Diagnotic</TableHead>
          <TableHead>Repair Cost($)</TableHead>
          <TableHead>Paid</TableHead>
          <TableHead>Fixed</TableHead>
          <TableHead>Delivered</TableHead>
          <TableHead>Check-In date</TableHead>
          <TableHead>Check-Out date</TableHead>
          <TableHead>Date Picked Up</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        <TableRow key={firstName}>
          <TableCell>{`${firstName} ${lastName}`}</TableCell>
          <TableCell>{`${make} ${model} ${year}`}</TableCell>
          <TableCell>{description}</TableCell>
          <TableCell>{new Intl.NumberFormat().format(estimatedCost)}</TableCell>
          <TableCell>{paid ? "Yes" : "No"}</TableCell>
          <TableCell>{fixed ? "Yes" : "No"}</TableCell>
          <TableCell>{delivered ? "Yes" : "No"}</TableCell>
          <TableCell>{new Date(startDate).toDateString()}</TableCell>
          <TableCell>
            {finishDate
              ? new Date(finishDate).toDateString()
              : "work in progress"}
          </TableCell>
          <TableCell>
            {deliveryDate
              ? new Date(deliveryDate).toDateString()
              : "not picked up"}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default TrackTable;
