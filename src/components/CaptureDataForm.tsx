import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { Accordion } from "src/components/Accordion";
import { Badge } from "src/components/Badge";
import { Button } from "src/components/Button";
import { Field } from "src/components/Field";
import { Layout } from "src/components/Layout";
import { findErrorMessage } from "src/utils/helpers";
import { currencyMask } from "src/utils/masks";
import { validateDateFormat, validatePhoneNumber } from "src/utils/validators";
import type { CaptureData, User } from "src/types";

type FormData = CaptureData & User;

type Props = {
  onSubmit: (formData: FormData) => void;
};

export const CaptureDataForm = ({ onSubmit }: Props) => {
  const { control, errors, handleSubmit, register, reset } = useForm<FormData>({
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

  const hasPersonalInfo = user?.birthday && user.fullName;

  return (
    <Layout title="Captura de cliente">
      <h2 className="mb-2 text-lg font-medium leading-7 text-gray-900">
        Dados de captura
      </h2>
      <p className="mb-4 text-sm font-normal leading-6 text-gray-800">
        Comece informando o <Badge>telefone celular</Badge> e o{" "}
        <Badge>valor gasto</Badge>. Depois, selecione{" "}
        <Badge color="blue">Buscar cliente</Badge>. Após confirmar ou inserir os
        dados, selecione <Badge color="blue">Capturar cliente</Badge>.
      </p>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
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
          }}
        >
          Limpar formulário
        </Button>
      </form>
    </Layout>
  );
};
