import { DevTool } from "@hookform/devtools";
import { Controller, useForm } from "react-hook-form";

import { Badge } from "src/components/Badge";
import { Button } from "src/components/Button";
import { Field } from "src/components/Field";
import { findErrorMessage } from "src/utils/helpers";
import { currencyMask } from "src/utils/masks";
import { validatePhoneNumber } from "src/utils/validators";
import type { ScoreData } from "src/types";

type FormData = ScoreData;
type Props = {
  onSubmit: (formData: FormData) => void;
};

export const ScoreDataForm = ({ onSubmit }: Props) => {
  const { control, errors, formState, handleSubmit, reset } = useForm<FormData>(
    {
      defaultValues: {
        amountSpent: "",
        phoneNumber: "",
      },
      mode: "onBlur",
      reValidateMode: "onChange",
    }
  );

  return (
    <>
      {process.env.NODE_ENV === "development" && <DevTool control={control} />}
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
        <Button isExpanded isLoading={formState.isSubmitting}>
          Procurar cliente
        </Button>
        <Button
          isExpanded
          isSecondary
          type="button"
          onClick={() => {
            reset();
          }}
        >
          Recomeçar captura
        </Button>
      </form>
    </>
  );
};
