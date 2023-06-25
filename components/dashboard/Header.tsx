"use client";

import { FC, useState } from "react";
import NewClientEntry from "./NewClientEntry";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { adminIcon } from "@/assets";
import { Loader2 } from "lucide-react";
import { Button } from "../ui/Button";

interface HeaderProps {
  page: string;
}

const Header: FC<HeaderProps> = ({ page }) => {
  const { data: session, status } = useSession();
  const [toggle, setToggle] = useState(false);

  const loading = status === "loading";

  return (
    <div className="bg-white rounded-lg p-4">
      {loading && (
        <Loader2 className="animate-spin h-2 w-2 dark:text-slate-200" />
      )}
      {session && (
        <div className="flex justify-between pt-4">
          <div className="p-4">
            <h2 className="font-medium">Welcome Back, {session.user.name}</h2>
          </div>

          {page === "dashboard" ? (
            <Button
              onClick={() => setToggle(true)}
              variant="outline"
              className="items-center"
            >New Entry</Button>
          ) : (
            ""
          )}
          <div className="avatar online">
            <div className="h-10  rounded-full">
              <Image
                src={session.user.image ? session.user.image : adminIcon}
                alt="user"
                width={30}
                height={30}
              />
            </div>
          </div>

          {toggle && (
            <NewClientEntry adminId={session.user.id} setToggle={setToggle} />
          )}
        </div>
      )}
    </div>
  );
};

export default Header;
