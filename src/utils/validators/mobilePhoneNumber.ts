import { removeNotNumbers } from "src/utils/helpers/removeNotNumbers";

const MOBILE_PHONE_NUMBER_LENGTH = 11;
const NINTH_DIGIT_POSITION = 2;

export const validateMobilePhoneNumberFormat = (
  mobilePhoneNumber: string,
  isOptional?: boolean
) => {
  const onlyNumbers = removeNotNumbers(mobilePhoneNumber);
  const isEmpty = onlyNumbers.length === 0;

  if (isEmpty && !isOptional) {
    return true;
  }

  const hasNinthDigit = onlyNumbers[NINTH_DIGIT_POSITION] === "9";
  const isValidLength = onlyNumbers.length === MOBILE_PHONE_NUMBER_LENGTH;

  return hasNinthDigit && isValidLength;
};
