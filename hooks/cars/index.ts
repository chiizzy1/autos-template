import { toast } from "@/components/ui/toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

export const useNewCar = (customerId: string, info: any) => {
  return useMutation({
    mutationFn: async () => {
      const { data } = await axios.post(
        `/api/cars/createNew/${customerId}`,
        info
      );
      return data;
    },
    onSuccess: (data) => {
      console.log(data);

      toast({
        title: "success creating new car",
        message: "okay",
        type: "success",
      });
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast({
          title: "Error creating new customer",
          message: `${error?.response?.data.error} ⚠️`,
          type: "error",
        });
      }

      console.log(error);
    },
  });
};

export const useGetCars = () => {
  return useQuery({
    queryKey: ["cars"],
    queryFn: async () => {
      const { data } = await axios.get("/api/cars/getAllCars");
      return data.CarData;
    },
  });
};

export const useDeleteCar = (carId: string) => {
  return useMutation({
    mutationFn: async () => {
      const { data } = await axios.delete(`/api/cars/delete/${carId}`);
      return data;
    },
    onSuccess: (data) => {
      console.log(data);
      // setDeleteModal(false);

      toast({
        title: "success deleting repair",
        message: "okay",
        type: "success",
      });
      // refresh();
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

export const useGetCar = (carId: string) => {
  return useQuery({
    queryKey: ["car"],
    queryFn: async () => {
      const { data } = await axios.get(`/api/cars/getCar/${carId}`);
      return data.CarData;
    },
  });
};

export const useEditCar = (carId: string, info: any) => {
  return useMutation({
    mutationFn: async () => {
      const { data } = await axios.put(`/api/cars/update/${carId}`, info);
      return data.CarData;
    },
    onSuccess: (successData) => {
      console.log(successData);
      // setEditModal(false);
      toast({
        title: "success editing car info",
        message: "okay",
        type: "success",
      });
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        //   setEditModal(false);
        toast({
          title: "Error editing car info",
          message: `${error?.response?.data.error} ⚠️`,
          type: "error",
        });
      }

      console.log(error);
    },
  });
};
