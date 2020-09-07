import {
  DATE_LENGTH,
  NINTH_DIGIT_POSITION,
  PHONE_NUMBER_LENGTH,
} from "src/utils/constants";
import { removeNotNumber } from "src/utils/helpers";

export const validateDateFormat = (date: string, isOptional?: boolean) => {
  const numbers = removeNotNumber(date);
  const isEmpty = numbers.length === 0;

  if (isEmpty && isOptional) {
    return true;
  }

  const isValidLength = numbers.length === DATE_LENGTH;

  return isValidLength;
};

export const validatePhoneNumber = (
  phoneNumber: string,
  isOptional?: boolean
) => {
  const numbers = removeNotNumber(phoneNumber);
  const isEmpty = numbers.length === 0;

  if (isEmpty && isOptional) {
    return true;
  }

  const hasNinthDigit = numbers[NINTH_DIGIT_POSITION] === "9";
  const isValidLength = numbers.length === PHONE_NUMBER_LENGTH;

  return hasNinthDigit && isValidLength;
};
