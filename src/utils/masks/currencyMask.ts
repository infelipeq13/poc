import createNumberMask from "text-mask-addons/dist/createNumberMask";

export const currencyMask = createNumberMask({
  allowDecimal: true,
  decimalSymbol: ",",
  prefix: "R$",
  thousandsSeparatorSymbol: ".",
});
