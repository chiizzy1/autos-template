import { getServerSession } from "next-auth";
import Link from "next/link";
import { buttonVariants } from "./ui/Button";
import SignInButton from "./ui/SignInButton";
import SignOutButton from "./ui/SignOutButton";
import { authOptions } from "@/lib/auth";
import MobileMenu from "./MobileMenu";

export default async function Navbar() {
  const session = await getServerSession(authOptions);

  return (
    <div className="fixed backdrop-blur-sm bg-white/90 z-50 top-0 left-0 right-0 h-16 border-b border-slate-300 shadow-sm flex items-center justify-between">
      <div className="container max-w-7xl mx-auto w-full flex justify-between items-center">
        <Link href="/" className="text-2xl italic text-dimPurple font-bold">
          CarClinic
        </Link>

        <div className="md:hidden flex gap-4 items-center">
          <MobileMenu />
        </div>

        <div className="hidden md:flex gap-4">
          <Link
            href="/tracking"
            className={`${buttonVariants({
              variant: "ghost",
            })} text-sm font-bold`}
          >
            Tracking
          </Link>
          <Link
            href="/towing"
            className={`${buttonVariants({
              variant: "ghost",
            })} text-sm font-bold`}
          >
            Towing
          </Link>
          <Link
            href="/booking"
            className={`${buttonVariants({
              variant: "ghost",
            })} text-sm font-bold`}
          >
            Booking
          </Link>
          <Link
            href="/services"
            className={`${buttonVariants({
              variant: "ghost",
            })} text-sm font-bold`}
          >
            Services
          </Link>
          <Link
            href="/contact"
            className={`${buttonVariants({
              variant: "ghost",
            })} text-sm font-bold`}
          >
            Contact Us
          </Link>

          {session && session?.user.role === "AUTHORIZED" ? (
            <>
              <Link
                className={`${buttonVariants({
                  variant: "ghost",
                })} text-sm font-bold`}
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
