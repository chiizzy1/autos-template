"use client";

import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";
import { SessionProvider } from "next-auth/react";
import type { FC, ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

interface ProvidersProps {
  children: ReactNode;
}

interface ContextProps {
  name: string;
  setName: Dispatch<SetStateAction<string>>;
  image: string;
  setImage: Dispatch<SetStateAction<string>>;
}

const GlobalContext = createContext<ContextProps>({
  name: "",
  setName: (): string => "",
  image: "",
  setImage: (): string => "",
});

const Providers: FC<ProvidersProps> = ({ children }) => {
  const [name, setName] = useState<string>("");
  const [image, setImage] = useState<string>("");

  return (
    <GlobalContext.Provider value={{ name, setName, image, setImage }}>
        <QueryClientProvider client={queryClient}>
          <SessionProvider>{children}</SessionProvider>
        </QueryClientProvider>
    </GlobalContext.Provider>
  );
};


export const useGlobalContext = () => useContext(GlobalContext);
export default Providers;
