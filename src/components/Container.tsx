import clsx from "clsx";

interface Props extends React.ComponentProps<"main"> {}

export const Container = ({ className, ...rest }: Props) => {
  return <main className={clsx("max-w-md p-4 mx-auto", className)} {...rest} />;
};
