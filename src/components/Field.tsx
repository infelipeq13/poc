import clsx from "clsx";
import { forwardRef, useRef } from "react";
import MaskedInput from "react-text-mask";
import uid from "uid";

type ColumnSpan = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

interface Props extends React.ComponentPropsWithoutRef<"input"> {
  columnSpan?: ColumnSpan;
  errorMessage?: string;
  hint?: string;
  isMonoFont?: boolean;
  mask?: string | (RegExp | string)[];
  label: string;
}

type Ref = HTMLInputElement;

const convertMaskToArray = (mask: string) => {
  return mask.split("").map((char) => {
    switch (char) {
      case "#":
        return /\d/;
      default:
        return char;
    }
  });
};

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

export const Field = forwardRef<Ref, Props>(
  (
    {
      className,
      columnSpan = 8,
      errorMessage,
      hint,
      id = uid(),
      isMonoFont,
      label,
      mask,
      ...rest
    },
    ref
  ) => {
    const inputId = useRef(id);
    const commonProps = {
      className: clsx(
        "transition duration-200 ease-in-out p-4 border rounded-lg",
        className,
        isMonoFont && "font-mono",
        errorMessage
          ? "border-dashed text-red-900 bg-red-100 border-red-600 | focus:shadow-outline-red"
          : "text-gray-900 border-gray-600 | focus:border-blue-600 focus:shadow-outline-blue",
        getColumnSpan(columnSpan)
      ),
      id: inputId.current,
    };

    return (
      <div className="grid grid-cols-8 space-y-1">
        <label
          className="col-span-8 text-sm font-medium leading-6 text-gray-900"
          htmlFor={inputId.current}
        >
          {label}
          {hint && (
            <span className="text-sm font-normal leading-6 text-gray-600">
              {` (${hint})`}
            </span>
          )}
        </label>
        {mask ? (
          <MaskedInput
            mask={
              Array.isArray(mask) || typeof mask === "function"
                ? mask
                : convertMaskToArray(mask)
            }
            {...commonProps}
            {...rest}
          />
        ) : (
          <input ref={ref} {...commonProps} {...rest} />
        )}
        {errorMessage && (
          <span className="col-span-8 text-sm leading-6 text-red-800">
            {errorMessage}
          </span>
        )}
      </div>
    );
  }
);
