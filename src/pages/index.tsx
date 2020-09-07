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
import type { CaptureData, User } from "src/types";

type FormData = CaptureData & User;

// Mocked data.
const user1: User = {
  birthday: "13/09/1994",
  fullName: "Felipe Gomes de Oliveira",
};

const user2: User = {
  birthday: "13/09/1994",
  fullName: "",
};

const user3: User = {
  birthday: "",
  fullName: "Felipe Gomes de Oliveira",
};

const user4: User = {
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
  const [user, setUser] = useState<User>();

  // Needed in order to populate (or erase) fields after fetching (or removing) the user.
  useEffect(() => {
    if (user) {
      if (numbers === "11911111111") {
        setValue("birthday", user1.birthday);
        setValue("fullName", user1.fullName);
      }

      if (numbers === "22922222222") {
        setValue("birthday", user2.birthday);
        setValue("fullName", user2.fullName);
      }

      if (numbers === "33933333333") {
        setValue("birthday", user3.birthday);
        setValue("fullName", user3.fullName);
      }

      if (numbers === "44944444444") {
        setValue("birthday", user4.birthday);
        setValue("fullName", user4.fullName);
      }
    }
  }, [user]);

  const hasPersonalInfo = !!(user?.birthday && user.fullName);
  const numbers = removeNotNumber(watch("phoneNumber"));
  const shouldEraseUser = numbers.length !== PHONE_NUMBER_LENGTH && user;
  const shouldFetchUser = numbers.length === PHONE_NUMBER_LENGTH && !user;

  if (shouldFetchUser) {
    // TODO: Placeholder code. Should fetch user by phone number.
    if (numbers === "11911111111") {
      setUser(user1);
    }

    if (numbers === "22922222222") {
      setUser(user2);
    }

    if (numbers === "33933333333") {
      setUser(user3);
    }

    if (numbers === "44944444444") {
      setUser(user4);
    }
  } else if (shouldEraseUser) {
    setUser(undefined);
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
          {user && (
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
              setUser(undefined);
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
