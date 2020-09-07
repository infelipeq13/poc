import clsx from "clsx";

type Props = React.ComponentProps<"main">;

export const Container = ({ className, ...rest }: Props) => {
  return <main className={clsx("max-w-md p-4 mx-auto", className)} {...rest} />;
};
