import clsx from "clsx";

interface Props extends React.ComponentProps<"div"> {}

export const Card = ({ className, ...rest }: Props) => {
  return (
    <div
      className={clsx(
        "p-4 space-y-2 border border-gray-600 rounded-lg",
        className
      )}
      {...rest}
    />
  );
};
