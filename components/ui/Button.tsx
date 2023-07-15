import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { BiLoader } from "react-icons/bi";
import * as React from "react";

const buttonVariants = cva(
  "active:scale-95 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default: "bg-slate-900 text-white hover:bg-slate-800 ",
        destructive: "text-white hover:bg-red-600 ",
        outline:
          "bg-slate-900 text-white hover:bg-slate-800  border border-slate-200 cursor-pointer",
        subtle: "bg-slate-100 text-slate-900 hover:bg-slate-200 ",
        ghost:
          "bg-transparent hover:bg-slate-100 data-[state=open]:bg-transparent ",
        link: "bg-transparent text-sm font-bold text-dimPurple underline-offset-4 hover:underline hover:text-purple-600 ",
        hero: "bg-transparent py-4 px-8 text-white border-2 hover:bg-white hover:text-black",
        purple: "bg-dimPurple text-white text-center border hover:bg-purple-950 cursor-pointer",
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-9 px-2 rounded-md",
        lg: "h-11 px-8 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, variant, isLoading, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={isLoading}
        {...props}
      >
        {isLoading ? <BiLoader className="mr-2 h-4 w-4 animate-spin" /> : null}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
