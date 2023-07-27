"use client";

import { FC, useState } from "react";
import NewClientEntry from "./NewClientEntry";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { adminIcon } from "@/assets";
import { Loader2 } from "lucide-react";
import { Button } from "../ui/Button";
import NewCustomer from "./NewCustomer";

interface HeaderProps {
  page: string;
}

const Header: FC<HeaderProps> = ({ page }) => {
  const { data: session, status } = useSession();
  const [toggle, setToggle] = useState<boolean>(false);
  const [newCustomer, setNewCustomer] = useState<boolean>(false);

  const loading = status === "loading";

  return (
    <>
      {loading && <Loader2 className="animate-spin h-4 w-4" />}
      {session && (
        <div className=" pt-4 px-4">
          <div className="bg-white flex justify-between p-4 rounded-lg items-center">
            <div className="flex items-center">
              <div className="avatar">
                <div className="h-10  rounded-full">
                  <Image
                    src={session.user.image ? session.user.image : adminIcon}
                    alt="user"
                    width={30}
                    height={30}
                  />
                </div>
              </div>
              <p
                className={`font-bold text-base text-dimPurple ml-4 ${
                  page === "dashboard" || page === "allCustomer"
                    ? "hidden sm:flex"
                    : ""
                }`}
              >
                Hello, {session.user.name}
              </p>
            </div>

            {page === "dashboard" ? (
              <>
                <Button onClick={() => setToggle(true)} variant="purple">
                  + New Entry
                </Button>
              </>
            ) : page === "allCustomer" ? (
              <Button onClick={() => setNewCustomer(true)} variant="purple">
                + New Customer
              </Button>
            ) : (
              ""
            )}

            {toggle && <NewClientEntry setToggle={setToggle} />}
            {newCustomer && <NewCustomer setNewCustomer={setNewCustomer} />}
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
