import { toast } from "@/components/ui/toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

export const useGetCustomers = () => {
  const customersData = useQuery({
    queryKey: ["customers"],
    queryFn: async () => {
      const { data } = await axios.get("/api/customers/getAllCustomers");
      return data.customerData;
    },
  });
  const carsData = useQuery({
    queryKey: ["cars"],
    queryFn: async () => {
      const { data } = await axios.get("/api/cars/getAllCars");
      return data.CarData;
    },
  });
  const repairsData = useQuery({
    queryKey: ["reairs"],
    queryFn: async () => {
      const { data } = await axios.get("/api/repairs/getAllRepairs");
      return data.RepairData;
    },
  });
  const appointmentsData = useQuery({
    queryKey: ["appointments"],
    queryFn: async () => {
      const { data } = await axios.get("/api/booking/getAllBookings");
      return data.bookingsData;
    },
  });

  return { appointmentsData, carsData, customersData, repairsData };
};

export const useNewCustomer = (info: any) => {
  return useMutation({
    mutationFn: async () => {
      const { data } = await axios.post("/api/customers/createNew", info);
      return data.custom;
    },
    onSuccess(data) {
      toast({
        title: "success",
        message: "success creating new customer",
        type: "success",
      });
    },
    onError(error) {
      if (error instanceof AxiosError) {
        toast({
          title: "Error creating new repair",
          message: `${error?.response?.data.error} ⚠️`,
          type: "error",
        });
      }

      console.log(error);
    },
  });
};

export const useGetCustomer = (customerId: string) => {
  return useQuery({
    queryKey: ["customer"],
    queryFn: async () => {
      const { data } = await axios.get(`/api/customers/${customerId}`);
      return data.customerData;
    },
  });
};

export const useEditCustomer = (customerId: string, info: any) => {
  return useMutation({
    mutationFn: async () => {
      const { data } = await axios.put(`/api/customers/update/${customerId}`, {
        ...info,
      });
      return data;
    },
    onSuccess: (data) => {
      console.log(data);
      // setCustomerEditModal(false);
      toast({
        title: "success editing customer info",
        message: "okay",
        type: "success",
      });
      // refresh();
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        // setCustomerEditModal(false);
        toast({
          title: "Error editing customer info",
          message: `${error?.response?.data.error} ⚠️`,
          type: "error",
        });
      }

      console.log(error);
    },
  });
};

export const useDeleteCustomer = (customerId: string) => {
  return useMutation({
    mutationFn: async () => {
      const { data } = await axios.delete(
        `/api/customers/delete/${customerId}`
      );
      return data;
    },
    onSuccess: (successData: any) => {
      console.log(successData);
      // setCustomerDeleteModal(false);

      toast({
        title: "success deleting repair",
        message: "okay",
        type: "success",
      });

      // page === "customer" ? push(`/dashboard/customers/`) : refresh();
    },
    onError: (error: any) => {
      if (error instanceof AxiosError) {
        toast({
          title: "Error deleting repair",
          message: `${error?.response?.data.error} ⚠️`,
          type: "error",
        });
      }
      console.log(error);
    },
  });
};
