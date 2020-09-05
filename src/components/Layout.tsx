import clsx from "clsx";

interface Props extends React.ComponentProps<"main"> {
  title: string;
}

export const Layout = ({ children, className, title, ...rest }: Props) => {
  return (
    <main className={clsx("p-4", className)} {...rest}>
      <h1 className="mb-4 text-2xl font-bold leading-9 text-gray-900">
        {title}
      </h1>
      {children}
    </main>
  );
};
