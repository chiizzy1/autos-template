import { CarDetails, Customer, Repair } from "@prisma/client";
import { ZodIssue } from "zod";

export interface CreateNewCarData {
  error: string | ZodIssue[] | null;
  CarData: CarDetails | null;
}


export interface GetCarData {
  error: string | ZodIssue[] | null;
  CarData:  (CarDetails & { owner: Customer; repair: Repair[] }) | null;
}

export interface GetAllCarsData {
  error: string | ZodIssue[] | null;
  CarData: (CarDetails & { owner: Customer; repair: Repair[]; })[] | null;
}

export interface DeleteCarData {
  error: string | ZodIssue[] | null;
  success: boolean;
}

export interface UpdateCarData {
  error: string | ZodIssue[] | null;
  UpdatedCarData: CarDetails | boolean;
}
