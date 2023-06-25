import { getServerSession } from "next-auth";
import Link from "next/link";
import { buttonVariants } from "./ui/Button";
import SignInButton from "./ui/SignInButton";
import SignOutButton from "./ui/SignOutButton";
import { authOptions } from "@/lib/auth";
import { ThemeToggle } from "./ThemeToggle";
import MobileMenu from "./MobileMenu";

export default async function Navbar() {
  const session = await getServerSession(authOptions);
  
  return (
    <div className="fixed backdrop-blur-sm bg-white/75 dark:bg-slate-900/75 z-50 top-0 left-0 right-0 h-20 border-b border-slate-300 dark:border-slate-700 shadow-sm flex items-center justify-between">
      <div className="container max-w-7xl mx-auto w-full flex justify-between items-center">
        <Link href="/" className="text-2xl text-white font-bold">
          Car Clinic
        </Link>

        <div className="md:hidden flex gap-4 items-center">
          <ThemeToggle />
          <MobileMenu />
        </div>

        <div className="hidden md:flex gap-4">
          <Link
            href="/tracking"
            className={buttonVariants({ variant: "ghost" })}
          >
            TRACKING
          </Link>
          <Link
            href="/contact"
            className={buttonVariants({ variant: "ghost" })}
          >
            CONTACT US
          </Link>
          <Link
            href="/booking"
            className={buttonVariants({ variant: "ghost" })}
          >
            BOOKING
          </Link>
          <Link
            href="/services"
            className={buttonVariants({ variant: "ghost" })}
          >
            SERVICES
          </Link>
          <ThemeToggle />

          {session && session?.user.role === "AUTHORIZED" ? (
            <>
              <Link
                className={buttonVariants({ variant: "ghost" })}
                href="/dashboard"
              >
                DASHBOARD
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
