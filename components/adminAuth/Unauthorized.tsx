import { FC } from "react";
import Link from "next/link";
import { buttonVariants } from "../ui/Button";
import { Home } from "lucide-react";

interface UnauthorizedProps {}

const Unauthorized: FC<UnauthorizedProps> = ({}) => {
  return (
    <section className="container pt-32 max-w-7xl mx-auto text-center flex flex-col gap-6 items-center">
      <h1>Admin Details not found.</h1>
      <p>You&apos;re Not Authorized.</p>
      <Link
        className={buttonVariants({
          variant: "ghost",
          className: "w-fit",
        })}
        href="/"
      >
        <Home />
        Back to home
      </Link>
    </section>
  );
};

export default Unauthorized;
