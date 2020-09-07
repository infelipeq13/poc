import createNumberMask from "text-mask-addons/dist/createNumberMask";

export const currencyMask = createNumberMask({
  prefix: "R$",
  suffix: ",00",
  thousandsSeparatorSymbol: ".",
});
