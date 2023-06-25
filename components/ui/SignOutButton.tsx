"use client";

import { signOut } from "next-auth/react";
import { FC, useState } from "react";
import { Button } from "./Button";
import { toast } from "./toast";
import { FiLogOut } from "react-icons/fi";
import { redirect } from "next/navigation";

interface SignOutButtonProps {
  page: string;
}

const SignOutButton: FC<SignOutButtonProps> = ({ page }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const signUserOut = async () => {
    try {
      setIsLoading(true);
      await signOut();
      // redirect("/");
    } catch (error) {
      toast({
        title: "Error signing out",
        message: "Please try again later.",
        type: "error",
      });
    }
  };

  return (
    <Button onClick={signUserOut} isLoading={isLoading}>
      {page === "dashboard" ? <FiLogOut /> : "Sign Out"}
    </Button>
  );
};

export default SignOutButton;