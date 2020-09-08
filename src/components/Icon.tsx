const paths = {
  minusCircle:
    "M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z",
  plusCircle:
    "M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z",
};

export type IconName = keyof typeof paths;
type Props = {
  className?: string;
  name: IconName;
};

export const Icon = ({ className = "", name }: Props) => {
  const path = paths[name];

  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path clipRule="evenodd" d={path} fillRule="evenodd" />
    </svg>
  );
};
