import { getServerSession } from "next-auth";
import Link from "next/link";
import { buttonVariants } from "./ui/Button";
import SignInButton from "./ui/SignInButton";
import SignOutButton from "./ui/SignOutButton";
import { authOptions } from "@/lib/auth";
import MobileMenu from "./MobileMenu";
import Image from "next/image";
import { logo } from "@/assets";

export default async function Navbar() {
  const session = await getServerSession(authOptions);

  return (
    <div className="fixed backdrop-blur-sm bg-white/90 z-50 top-0 left-0 right-0 h-16 border-b border-slate-300 shadow-sm flex items-center justify-between">
      <div className="container max-w-7xl mx-auto w-full flex justify-between items-center">
        <Link href="/" className="text-2xl text-dimPurple font-extrabold">
          <Image
            src={logo}
            alt="double_quotes"
            className="w-[120px] h-[27.6px] object-contain"
          />
        </Link>

        <div className="md:hidden flex gap-4 items-center">
          <MobileMenu />
        </div>

        <div className="hidden md:flex gap-4">
          <Link
            href="/about"
            className={`${buttonVariants({
              variant: "link",
            })} `}
          >
            About Us
          </Link>
          <Link
            href="/services"
            className={`${buttonVariants({
              variant: "link",
            })} `}
          >
            Services
          </Link>
          <Link
            href="/booking"
            className={`${buttonVariants({
              variant: "link",
            })} `}
          >
            Booking
          </Link>
          <Link
            href="/tracking"
            className={`${buttonVariants({
              variant: "link",
            })} `}
          >
            Tracking
          </Link>
          <Link
            href="/towing"
            className={`${buttonVariants({
              variant: "link",
            })} `}
          >
            Towing
          </Link>

          <Link
            href="/contact"
            className={`${buttonVariants({
              variant: "link",
            })} `}
          >
            Contact Us
          </Link>

          {session && session?.user.role === "AUTHORIZED" ? (
            <>
              <Link
                className={`${buttonVariants({
                  variant: "link",
                })} `}
                href="/dashboard"
              >
                Dashboard
              </Link>
              <SignOutButton page="home" />
            </>
          ) : (
            <SignInButton />
          )}
        </div>
      </div>
    </div>
  );
}
