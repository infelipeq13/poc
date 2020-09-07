import { removeNotNumbers } from "src/utils/helpers/removeNotNumbers";

const MOBILE_PHONE_NUMBER_LENGTH = 11;
const NINTH_DIGIT_POSITION = 2;

export const validateMobilePhoneNumberFormat = (mobilePhoneNumber: string) => {
  const onlyNumbers = removeNotNumbers(mobilePhoneNumber);
  const hasNinthDigit = onlyNumbers[NINTH_DIGIT_POSITION];
  const isValidLength = onlyNumbers.length === MOBILE_PHONE_NUMBER_LENGTH;

  return hasNinthDigit && isValidLength;
};
