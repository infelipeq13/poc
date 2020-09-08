import type { Customer } from "src/types";

// Mocked data.
const customer1: Customer = {
  birthday: "13/09/1994",
  fullName: "Felipe Gomes de Oliveira",
};

const customer2: Customer = {
  birthday: "13/09/1994",
  fullName: "",
};

const customer3: Customer = {
  birthday: "",
  fullName: "Felipe Gomes de Oliveira",
};

const customer4: Customer = {
  birthday: "",
  fullName: "",
};

export const findCustomerByPhoneNumber = (phoneNumber: string) => {
  return new Promise<Customer>((resolve) => {
    setTimeout(() => {
      switch (phoneNumber) {
        case "11911111111":
          resolve(customer1);
          break;
        case "22922222222":
          resolve(customer2);
          break;
        case "33933333333":
          resolve(customer3);
          break;
        case "44944444444":
          resolve(customer4);
          break;
      }
    }, 2000);
  });
};
