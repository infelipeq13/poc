import clsx from "clsx";
import { useState } from "react";

import { Icon } from "src/components/Icon";

type Props = {
  children?: React.ReactNode;
  isOpenByDefault?: boolean;
  title: string;
};

export const Accordion = ({ children, isOpenByDefault, title }: Props) => {
  const [isOpen, setIsOpen] = useState(isOpenByDefault);

  const toggleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-gray-100 rounded-lg">
      <button
        className={clsx(
          "flex items-center justify-between w-full p-4 transition duration-200 ease-in-out",
          isOpen ? "bg-gray-200 rounded-t-lg" : "bg-gray-100 rounded-lg"
        )}
        type="button"
        onClick={toggleIsOpen}
      >
        <span className="text-lg font-medium leading-7 text-gray-900">
          {title}
        </span>
        <Icon
          className="w-6 h-6 text-gray-600"
          name={isOpen ? "minusCircle" : "plusCircle"}
        />
      </button>
      <div className={isOpen ? "block" : "hidden"}>{children}</div>
    </div>
  );
};
