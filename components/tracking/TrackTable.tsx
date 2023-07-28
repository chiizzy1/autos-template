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
          <TableHead className="text-sm font-semibold">Customer Name</TableHead>
          <TableHead className="text-sm font-semibold">vehicle info</TableHead>
          <TableHead className="text-sm font-semibold">
            Vehicle Diagnotic
          </TableHead>
          <TableHead className="text-sm font-semibold">
            Repair Cost($)
          </TableHead>
          <TableHead className="text-sm font-semibold">Paid</TableHead>
          <TableHead className="text-sm font-semibold">Fixed</TableHead>
          <TableHead className="text-sm font-semibold">Delivered</TableHead>
          <TableHead className="text-sm font-semibold">Check-In date</TableHead>
          <TableHead className="text-sm font-semibold">
            Check-Out date
          </TableHead>
          <TableHead className="text-sm font-semibold">
            Date Picked Up
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        <TableRow key={firstName}>
          <TableCell className="text-xs">{`${firstName} ${lastName}`}</TableCell>
          <TableCell className="text-xs">{`${make} ${model} ${year}`}</TableCell>
          <TableCell className="text-xs">{description}</TableCell>
          <TableCell className="text-xs">
            {new Intl.NumberFormat().format(estimatedCost)}
          </TableCell>
          <TableCell className="text-xs">{paid ? "Yes" : "No"}</TableCell>
          <TableCell className="text-xs">{fixed ? "Yes" : "No"}</TableCell>
          <TableCell className="text-xs">{delivered ? "Yes" : "No"}</TableCell>
          <TableCell className="text-xs">
            {new Date(startDate).toDateString()}
          </TableCell>
          <TableCell className="text-xs">
            {finishDate
              ? new Date(finishDate).toDateString()
              : "work in progress"}
          </TableCell>
          <TableCell className="text-xs">
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
