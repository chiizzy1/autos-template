import { toast } from "@/components/ui/toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

export const useGetCarRepairs = (carId: string) => {
  return useQuery({
    queryKey: ["carRepairs"],
    queryFn: async () => {
      const { data } = await axios.get(`/api/repairs/getCarRepairs/${carId}`);
      return data.RepairData;
    },
  });
};

export const useNewCarRepair = (
  carId: string,
  customerId: string,
  info: any
) => {
  return useMutation({
    mutationFn: async () => {
      const { data } = await axios.post(`/api/repairs/createNew`, {
        ...info,
        customerId: customerId,
        carId: carId,
      });
      return data;
    },
    onSuccess: (data) => {
      console.log(data);
      // setToggleModal(false)

      toast({
        title: "success creating new repair",
        message: "okay",
        type: "success",
      });
      // refresh();
    },
    onError: (error) => {
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

export const useGetAllRepairs = () => {
  return useQuery({
    queryKey: ["repairs"],
    queryFn: async () => {
      const { data } = await axios.get("/api/repairs/getAllRepairs");
      return data.RepairData;
    },
  });
};

export const useEditRepair = (repairId: string, info: any) => {
  return useMutation({
    mutationFn: async () => {
      const { data } = await axios.put(`/api/repairs/update/${repairId}`, info);
      return data;
    },
    onSuccess: (data) => {
      console.log(data);
      // setToggleModal(false);

      toast({
        title: "success creating new repair",
        message: "okay",
        type: "success",
      });
    },
    onError: (error) => {
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

export const useDeleteRepair = (repairId: string) => {
  return useMutation({
    mutationFn: async () => {
      const { data } = await axios.delete(`/api/repairs/delete/${repairId}`);
      return data;
    },
    onSuccess: (successData: any) => {
      console.log(successData);
      // setDeleteToggle(false);

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
