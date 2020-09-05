import clsx from "clsx";
import { useRef } from "react";
import uid from "uid";

type ColumnSpan = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

interface Props extends React.ComponentProps<"input"> {
  columnSpan?: ColumnSpan;
  hint?: string;
  isMonoFont?: boolean;
  label: string;
}

const getColumnSpan = (columnSpan: ColumnSpan) => {
  switch (columnSpan) {
    case 1:
      return "col-span-1";
    case 2:
      return "col-span-2";
    case 3:
      return "col-span-3";
    case 4:
      return "col-span-4";
    case 5:
      return "col-span-5";
    case 6:
      return "col-span-6";
    case 7:
      return "col-span-7";
    case 8:
      return "col-span-8";
  }
};

export const Field = ({
  className,
  columnSpan = 8,
  hint,
  id = uid(),
  isMonoFont,
  label,
  ...rest
}: Props) => {
  const inputId = useRef(id);

  return (
    <div className="grid grid-cols-8 space-y-1">
      <label
        className="col-span-8 text-sm font-medium leading-6 text-gray-900"
        htmlFor={inputId.current}
      >
        {label}
        {hint && (
          <span className="text-sm font-normal leading-6 text-gray-600">
            {` ${hint}`}
          </span>
        )}
      </label>
      <input
        id={inputId.current}
        className={clsx(
          "p-4 border rounded-lg text-gray-900 border-gray-600 | focus:border-blue-600 focus:shadow-outline-blue",
          className,
          isMonoFont && "font-mono",
          getColumnSpan(columnSpan)
        )}
        {...rest}
      />
    </div>
  );
};
