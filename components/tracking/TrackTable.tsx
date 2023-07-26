"use client";

import { FC } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

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
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 1200 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Customer Name</TableCell>
            <TableCell>vehicle info</TableCell>
            <TableCell>Vehicle Diagnosis</TableCell>
            <TableCell>Repair Cost($)</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell>Fixed</TableCell>
            <TableCell>Delivered</TableCell>
            <TableCell>Check-In date</TableCell>
            <TableCell>Check-Out date</TableCell>
            <TableCell>Date Picked Up</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow
            key={firstName}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {`${firstName} ${lastName}`}
            </TableCell>
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
    </TableContainer>
  );
};

export default TrackTable;
