import { CarDetails, Customer, Repair } from "@prisma/client";
import { ZodIssue } from "zod";

export interface CreateNewCustomerData {
  error: string | ZodIssue[] | null;
  customerData: Customer | null;
}

export type allCustomerData = (Customer & { cars: CarDetails[]; repairs: Repair[]; })[]

export interface GetCustomerData {
  error: string | ZodIssue[] | null;
  customerData: allCustomerData | null;
}

export interface DeleteCustomerData {
  error: string | ZodIssue[] | null;
  success: string | boolean;
}

export interface UpdateCustomerData {
  error: string | ZodIssue[] | null;
  UpdatedCustomerData: Customer | null;
}
