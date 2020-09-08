import clsx from "clsx";

type Props = {
  children?: React.ReactNode;
  className?: string;
};

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
