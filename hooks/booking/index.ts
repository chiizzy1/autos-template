import { toast } from "@/components/ui/toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

export const useGetAllAppointments = () => {
  return useQuery({
    queryKey: ["appointments"],
    queryFn: async () => {
      const { data } = await axios.get("/api/booking/getAllBookings");
      return data.bookingsData;
    },
  });
};

export const useUpdateAppointmentViewed = (id: string) => {
  return useMutation({
    mutationFn: async () => {
      const { data } = await axios.put(`/api/booking/viewed/${id}`);
      return data.updated;
    },
    onSuccess: (successData) => {
      console.log(successData);
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

export const useDeleteAppointment = (id: string) => {
  return useMutation({
    mutationFn: async () => {
      const { data } = await axios.delete(`/api/booking/delete/${id}`);
      return data;
    },
    onSuccess: (successData: any) => {
      console.log(successData);
      // setDeleteModal(false);

      toast({
        title: "success deleting booking",
        message: "okay",
        type: "success",
      });

      // refresh();
    },
    onError: (error: any) => {
      if (error instanceof AxiosError) {
        toast({
          title: "Error deleting booking",
          message: `${error?.response?.data.error} ⚠️`,
          type: "error",
        });
      }
      console.log(error);
    },
  });
};

export const useGetDayStaus = (info: any) => {
  return useQuery({
    queryKey: ["dayStaus"],
    queryFn: async () => {
      const { data } = await axios.post(`/api/booking/${info}`);
      return data?.selected;
    },
  });
};

export const useEditDayStatus = (id: string, day: any) => {
  return useMutation({
    mutationFn: async () => {
      const { data } = await axios.post(`/api/booking/open/${id}`, {
        currentStatus: day.open,
      });
      return data?.openStatus;
    },
    onSuccess: (successData) => {
      console.log("weed:", successData);
      // setDay((prev: any) => ({ ...prev, open: !prev.open }));
      toast({
        title: "successfully edited day!!",
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
    },
  });
};
