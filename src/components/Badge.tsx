import clsx from "clsx";

type Color = "blue" | "gray";

interface Props extends React.ComponentProps<"span"> {
  color?: Color;
}

const getColors = (color?: Color) => {
  switch (color) {
    case "blue":
      return "text-blue-600 bg-blue-100";
    case "gray":
      return "text-gray-800 bg-gray-100";
  }
};

export const Badge = ({ color = "gray", ...rest }: Props) => {
  return (
    <span
      className={clsx("px-1 font-medium rounded-lg", getColors(color))}
      {...rest}
    />
  );
};
