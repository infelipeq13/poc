import { DevTool } from "@hookform/devtools";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { Accordion } from "src/components/Accordion";
import { Badge } from "src/components/Badge";
import { Button } from "src/components/Button";
import { Field } from "src/components/Field";
import { Layout } from "src/components/Layout";
import { findCustomerByPhoneNumber } from "src/services/customer";
import { findErrorMessage, removeNotNumber } from "src/utils/helpers";
import { currencyMask } from "src/utils/masks";
import { validateDateFormat, validatePhoneNumber } from "src/utils/validators";
import type { Customer, ScoreData } from "src/types";

type FormData = Customer & ScoreData;

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

  useEffect(() => {
    if (customer) {
      setValue("birthday", customer.birthday);
      setValue("fullName", customer.fullName);
    }
  }, [customer]);

  useEffect(() => {
    const phoneNumber = removeNotNumber(watch("phoneNumber"));
    const isValid = validatePhoneNumber(phoneNumber);
    const shouldErase = !isValid && customer;
    const shouldFetch = isValid && !customer;

    const fetchData = async () => {
      const customer = await findCustomerByPhoneNumber(phoneNumber);

      setCustomer(customer);
    };

    if (shouldErase) {
      reset();
      setCustomer(undefined);
    } else if (shouldFetch) {
      fetchData();
    }
  });

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
            <Accordion isOpenByDefault title="Informações pessoais">
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
            Reiniciar formulário
          </Button>
        </form>
      </Layout>
    </>
  );
};

export default HomePage;
