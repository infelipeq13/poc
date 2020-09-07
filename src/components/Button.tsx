import clsx from "clsx";

import { Icon } from "src/components/Icon";
import { LoadingSpinner } from "src/components/LoadingSpinner";
import type { IconName } from "src/components/Icon";

interface Props extends React.ComponentProps<"button"> {
  icon?: IconName;
  isExpanded?: boolean;
  isLoading?: boolean;
  isSecondary?: boolean;
}

export const Button = ({
  children,
  className,
  icon,
  isLoading,
  isExpanded,
  isSecondary,
  ...rest
}: Props) => {
  return (
    <button
      className={clsx(
        "font-medium transition ease-in-out duration-200 rounded-lg p-4 space-x-2 text-sm leading-6 | focus:shadow-outline-blue",
        className,
        isExpanded && "w-full",
        (icon || isLoading) && "flex items-center justify-center",
        isSecondary
          ? "text-blue-600 bg-transparent | hover:bg-blue-100 | active:bg-blue-200"
          : "text-white bg-blue-600 | hover:bg-blue-500 | active:bg-blue-700"
      )}
      {...rest}
    >
      <span>{children}</span>
      {icon ? (
        <Icon className="w-6 h-6" name={icon} />
      ) : (
        isLoading && <LoadingSpinner className="w-6 h-6" />
      )}
    </button>
  );
};
