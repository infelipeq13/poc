export const removeNotNumbers = (value: string) => {
  return value.replace(/[^0-9]+/g, "");
};
