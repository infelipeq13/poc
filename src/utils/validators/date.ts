import { removeNotNumbers } from "src/utils/helpers/removeNotNumbers";

const DATE_LENGTH = 10;

export const validateDateFormat = (date: string) => {
  const onlyNumbers = removeNotNumbers(date);
  const isValidLength = onlyNumbers.length === DATE_LENGTH;

  return isValidLength;
};
