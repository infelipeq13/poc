import { DevTool } from "@hookform/devtools";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { Accordion } from "src/components/Accordion";
import { Badge } from "src/components/Badge";
import { Button } from "src/components/Button";
import { Field } from "src/components/Field";
import { Layout } from "src/components/Layout";
import { PHONE_NUMBER_LENGTH } from "src/utils/constants";
import { findErrorMessage, removeNotNumber } from "src/utils/helpers";
import { currencyMask } from "src/utils/masks";
import { validateDateFormat, validatePhoneNumber } from "src/utils/validators";
import type { CaptureData, Customer } from "src/types";

type FormData = CaptureData & Customer;

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

const HomePage = () => {
  const {
    control,
    errors,
    handleSubmit,
    register,
    reset,
    setValue,
    watch,
  } = useForm<FormData>({
    defaultValues: {
      amountSpent: "",
      birthday: "",
      fullName: "",
      phoneNumber: "",
    },
    mode: "onBlur",
    reValidateMode: "onChange",
  });
  const [customer, setCustomer] = useState<Customer>();

  // Needed in order to populate (or erase) fields after fetching (or removing) the customer.
  useEffect(() => {
    if (customer) {
      if (numbers === "11911111111") {
        setValue("birthday", customer1.birthday);
        setValue("fullName", customer1.fullName);
      }

      if (numbers === "22922222222") {
        setValue("birthday", customer2.birthday);
        setValue("fullName", customer2.fullName);
      }

      if (numbers === "33933333333") {
        setValue("birthday", customer3.birthday);
        setValue("fullName", customer3.fullName);
      }

      if (numbers === "44944444444") {
        setValue("birthday", customer4.birthday);
        setValue("fullName", customer4.fullName);
      }
    }
  }, [customer]);

  const hasPersonalInfo = !!(customer?.birthday && customer.fullName);
  const numbers = removeNotNumber(watch("phoneNumber"));
  const shouldEraseCustomer =
    numbers.length !== PHONE_NUMBER_LENGTH && customer;
  const shouldFetchCustomer =
    numbers.length === PHONE_NUMBER_LENGTH && !customer;

  if (shouldFetchCustomer) {
    // TODO: Placeholder code. Should fetch customer by phone number.
    if (numbers === "11911111111") {
      setCustomer(customer1);
    }

    if (numbers === "22922222222") {
      setCustomer(customer2);
    }

    if (numbers === "33933333333") {
      setCustomer(customer3);
    }

    if (numbers === "44944444444") {
      setCustomer(customer4);
    }
  } else if (shouldEraseCustomer) {
    setCustomer(undefined);
  }

  return (
    <>
      {process.env.NODE_ENV === "development" && <DevTool control={control} />}
      <Layout title="Captura de cliente">
        <h2 className="mb-2 text-lg font-medium leading-7 text-gray-900">
          Dados de captura
        </h2>
        <p className="mb-4 text-sm font-normal leading-6 text-gray-800">
          Comece informando o <Badge>telefone celular</Badge> e o{" "}
          <Badge>valor gasto</Badge>. Depois, selecione{" "}
          <Badge color="blue">Buscar cliente</Badge>. Após confirmar ou inserir
          os dados, selecione <Badge color="blue">Capturar cliente</Badge>.
        </p>
        <form
          className="space-y-4"
          onSubmit={handleSubmit((formData) => {
            console.log(formData);
          })}
        >
          <Controller
            control={control}
            name="phoneNumber"
            render={(props) => {
              return (
                <Field
                  columnSpan={5}
                  errorMessage={findErrorMessage(errors.phoneNumber?.type)}
                  hint="Somente números"
                  isMonoFont
                  label="Telefone celular"
                  mask="(##) # ####-####"
                  {...props}
                />
              );
            }}
            rules={{
              required: true,
              validate: {
                format: (phoneNumber) => {
                  return validatePhoneNumber(phoneNumber);
                },
              },
            }}
          />
          <Controller
            control={control}
            name="amountSpent"
            render={(props) => {
              return (
                <Field
                  columnSpan={3}
                  errorMessage={findErrorMessage(errors.amountSpent?.type)}
                  hint="Sem centavos"
                  isMonoFont
                  label="Valor gasto"
                  mask={currencyMask}
                  {...props}
                />
              );
            }}
            rules={{
              required: true,
            }}
          />
          {customer && (
            <Accordion
              isOpenByDefault={!hasPersonalInfo}
              title="Informações pessoais"
            >
              <div className="p-4 space-y-4">
                <p className="mb-4 text-sm leading-6 text-gray-800">
                  O <Badge>nome completo</Badge> e a{" "}
                  <Badge>data de aniversário</Badge> podem ser usados para
                  estreitar a relação com seu cliente. Você pode atualizar ambos
                  sempre que necessário.
                </p>
                <Field
                  ref={register}
                  hint="Opcional"
                  label="Nome completo"
                  name="fullName"
                />
                <Controller
                  control={control}
                  name="birthday"
                  render={(props) => {
                    return (
                      <Field
                        columnSpan={4}
                        errorMessage={findErrorMessage(errors.birthday?.type)}
                        hint="Opcional"
                        isMonoFont
                        label="Data de aniversário"
                        mask="##/##/####"
                        {...props}
                      />
                    );
                  }}
                  rules={{
                    validate: {
                      format: (date) => {
                        return validateDateFormat(date, true);
                      },
                    },
                  }}
                />
              </div>
            </Accordion>
          )}
          <Button isExpanded>Capturar cliente</Button>
          <Button
            isExpanded
            isSecondary
            type="button"
            onClick={() => {
              reset();
              setCustomer(undefined);
            }}
          >
            Limpar formulário
          </Button>
        </form>
      </Layout>
    </>
  );
};

export default HomePage;
