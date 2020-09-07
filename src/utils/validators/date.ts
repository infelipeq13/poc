import { removeNotNumbers } from "src/utils/helpers/removeNotNumbers";

const DATE_LENGTH = 8;

export const validateDateFormat = (date: string, isOptional?: boolean) => {
  const onlyNumbers = removeNotNumbers(date);
  const isEmpty = onlyNumbers.length === 0;

  if (isEmpty && isOptional) {
    return true;
  }

  const isValidLength = onlyNumbers.length === DATE_LENGTH;

  return isValidLength;
};
