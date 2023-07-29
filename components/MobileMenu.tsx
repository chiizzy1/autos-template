"use client";

import { Info, LayoutDashboard, Loader2, Menu, User } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/DropdownMenu";
import { toast } from "./ui/toast";
import { X } from "lucide-react";
import { Button } from "./ui/Button";

const MobileMenu = () => {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const signUserOut = async () => {
    try {
      setIsLoading(true);
      await signOut();
    } catch (error) {
      toast({
        title: "Error signing out",
        message: "Please try again later.",
        type: "error",
      });
    }
  };

  return (
    <nav className="z-[999] md:hidden">
      <div className="shadow-2xl rounded-md">
        <DropdownMenu open={open} onOpenChange={setOpen}>
          <DropdownMenuTrigger
            className="cursor-pointer"
            onClick={() => setOpen((prev) => !prev)}
          >
            {open ? (
              <X size={40} className="text-dimPurple" />
            ) : (
              <Menu size={40} className="text-dimPurple" />
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuGroup onClick={() => setOpen(false)}>
              <DropdownMenuItem asChild>
                {session && session?.user.role === "AUTHORIZED" ? (
                  <>
                    <Link
                      href="/dashboard"
                      className="w-full flex items-center gap-1.5"
                    >
                      <LayoutDashboard className="mr-2 h-5 w-5" />
                      <span>Dashboard</span>
                    </Link>

                    <Button
                      onClick={signUserOut}
                      variant="purple"
                      isLoading={isLoading}
                      disabled={isLoading}
                    >
                      <User className="mr-2 h-5 w-5" />
                      {isLoading ? "Signing out" : "Sign out"}
                    </Button>
                  </>
                ) : (
                  <Link
                    href="/login"
                    className="flex w-full items-center gap-1.5"
                  >
                    <LayoutDashboard className="mr-2 h-5 w-5" />
                    <span>Sign In</span>
                  </Link>
                )}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link
                  href="/about"
                  className="w-full flex items-center gap-1.5"
                >
                  <Info className="mr-2 h-5 w-5" />
                  <span>About Us</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href="/services"
                  className="w-full flex items-center gap-1.5"
                >
                  <Info className="mr-2 h-5 w-5" />
                  <span>Services</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href="/booking"
                  className="w-full flex items-center gap-1.5"
                >
                  <Info className="mr-2 h-5 w-5" />
                  <span>Booking</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href="/tracking"
                  className="w-full flex items-center gap-1.5"
                >
                  <Info className="mr-2 h-5 w-5" />
                  <span>Tracking</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href="/towing"
                  className="w-full flex items-center gap-1.5"
                >
                  <Info className="mr-2 h-5 w-5" />
                  <span>Towing</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href="/contact"
                  className="w-full flex items-center gap-1.5"
                >
                  <Info className="mr-2 h-5 w-5" />
                  <span>Contact Us</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default MobileMenu;
