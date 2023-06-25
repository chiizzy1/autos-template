"use client";

import { FC } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

interface TransactionsTableProps {
  trackData: any;
}

const TransactionsTable: FC<TransactionsTableProps> = ({ trackData }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 1200 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Customer Name</TableCell>
            <TableCell>vehicle info</TableCell>
            <TableCell>Vehicle Diagnosis</TableCell>
            <TableCell>Repair Cost</TableCell>
            <TableCell>Check-In date</TableCell>
            <TableCell>Check-Out date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow
            key={trackData.firstName}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {`${trackData.firstName} ${trackData.lastName}`}
            </TableCell>
            <TableCell>{`${trackData.make} ${trackData.model} ${trackData.year}`}</TableCell>
            <TableCell>{trackData.description}</TableCell>
            <TableCell>{trackData.estimatedCost}</TableCell>
            <TableCell>{trackData.startDate}</TableCell>
            <TableCell>{trackData.finishDate}</TableCell>
            {/* <TableCell > <p className={`p-[px] rounded-[5px]  ${row.protein > 4 ? 'bg-red-500' : 'bg-green-400'}`}>{row.protein}</p></TableCell> */}
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TransactionsTable;
