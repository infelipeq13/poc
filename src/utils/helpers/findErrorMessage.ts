export const findErrorMessage = (type?: string) => {
  switch (type) {
    case "format":
      return "Formato inválido.";
    case "required":
      return "Campo obrigatório.";
    default:
      return "";
  }
};
