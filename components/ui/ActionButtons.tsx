import { Mail, PhoneForwarded } from "lucide-react";
import { FC } from "react";
import { buttonVariants } from "./Button";

interface ActionButtonsProps {
  phone: number;
  email: string;
}

const ActionButtons: FC<ActionButtonsProps> = ({ phone, email }) => {
  return (
    <div className="flex gap-4 items-center text-white">
      <a href={`tel:${phone}`} target="_blank">
        <div className={buttonVariants({ variant: "purple" })}>
          <PhoneForwarded size={16} strokeWidth={1} />
          <p className="pl-2 text-xs">Call Customer </p>
        </div>
      </a>

      <a href={`mailto:${email}`} target="_blank">
        <div className={buttonVariants({ variant: "purple" })}>
          <Mail size={16} strokeWidth={1} />
          <p className="pl-2 text-xs">Send Customer Email</p>
        </div>{" "}
      </a>
    </div>
  );
};

export default ActionButtons;