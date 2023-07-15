import { FC } from "react";
import { Input } from "../ui/Input";
import styles from "@/style";

interface SearchBarProps {}

const SearchBar: FC<SearchBarProps> = ({}) => {
  return (
    <div className="p-4 my-4 bg-dimWhite rounded-lg">
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full sm:w-1/3 px-3 mb-6 md:mb-0">
          <p className="pb-2">search by name</p>
          <Input
            className={`${styles.formInputStyles}`}
            type="text"
            placeholder="e.g yoda..."
          />
        </div>
        <div className="w-full sm:w-1/3 px-3 mb-6 sm:mb-0">
          <p className="pb-2">search by email</p>
          <Input
            className={`${styles.formInputStyles}`}
            type="email"
            placeholder="Last name..."
          />
        </div>
        <div className="w-full sm:w-1/3 px-3 mb-6 sm:mb-0">
          <p className="pb-2">search by phone</p>
          <Input
            className={`${styles.formInputStyles}`}
            type="number"
            placeholder="Last name..."
          />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
