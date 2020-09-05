import clsx from "clsx";

interface Props extends React.ComponentProps<"button"> {
  isExpanded?: boolean;
  isSecondary?: boolean;
}

export const Button = ({
  className,
  isExpanded,
  isSecondary,
  ...rest
}: Props) => {
  return (
    <button
      className={clsx(
        "font-medium transition ease-in-out duration-200 rounded-lg p-4 text-sm leading-6 | focus:shadow-outline-blue",
        className,
        isExpanded && "w-full",
        isSecondary
          ? "text-blue-600 bg-transparent | hover:bg-blue-100 | active:bg-blue-200"
          : "text-white bg-blue-600 | hover:bg-blue-500 | active:bg-blue-700"
      )}
      {...rest}
    />
  );
};
