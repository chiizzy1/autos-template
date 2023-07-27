import { Mail, PhoneForwarded } from "lucide-react";
import { FC } from "react";
import { buttonVariants } from "./Button";

interface AdminButtonsProps {}

const AdminButtons: FC<AdminButtonsProps> = ({}) => {
  return (
    <div className="mt-4 flex gap-2">
      <a href={`tel:128803000`} target="_blank">
        <div className={buttonVariants({ variant: "purple" })}>
          <PhoneForwarded size={20} strokeWidth={1.75} />
          <p className="pl-2 text-sm">Call Us</p>
        </div>
      </a>
      <a href={`mailto:support@carclinic.com`} target="_blank">
        <div className={buttonVariants({ variant: "purple" })}>
          <Mail size={20} strokeWidth={1.75} />
          <p className="pl-2 text-sm">Send Us an Email</p>
        </div>{" "}
      </a>
    </div>
  );
};

export default AdminButtons;
