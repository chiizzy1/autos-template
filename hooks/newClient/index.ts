import { toast } from "@/components/ui/toast";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";


export const useNewClient = () => {
    return useMutation({
        mutationFn: async (info: any) => {
            const { data } = await axios.post("/api/newclient", info);
            return data.clientData;
          },
          onSuccess: (data) => {
            // const { customerId } = data;
            // setToggle(false);
      
            toast({
              title: "success creating new repair",
              message: "okay",
              type: "success",
            });
            // push(`/dashboard/customers/${customerId}`);
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
    })
}