import { CarDetails, Customer, Repair } from "@prisma/client";
import { ZodIssue } from "zod";

export interface GetTrackData {
  error: string | ZodIssue[] | null;
  trackData:
    | (Repair & {
        owner: Customer;
        car: CarDetails;
      })
    | null
    | any;
}