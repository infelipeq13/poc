import { DevTool } from "@hookform/devtools";
import { Controller, useForm } from "react-hook-form";

import { Accordion } from "src/components/Accordion";
import { Badge } from "src/components/Badge";
import { Button } from "src/components/Button";
import { ScoreDataCard } from "src/components/ScoreDataCard";
import { Field } from "src/components/Field";
import { findErrorMessage } from "src/utils/helpers";
import { validateDateFormat } from "src/utils/validators";
import type { Customer, ScoreData } from "src/types";

type FormData = Customer;
type Props = {
  scoreData: ScoreData;
  customer: FormData;
  onCancelScore: () => void;
  onSubmit: (formData: FormData) => void;
};

export const PersonalDataForm = ({
  scoreData,
  customer,
  onCancelScore: handleCancelScore,
  onSubmit,
}: Props) => {
  const { control, errors, handleSubmit, register } = useForm<FormData>({
    defaultValues: customer,
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  return (
    <>
      {process.env.NODE_ENV === "development" && <DevTool control={control} />}
      <ScoreDataCard
        amountSpent={scoreData.amountSpent}
        className="mb-4"
        phoneNumber={scoreData.phoneNumber}
      />
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <Accordion isOpenByDefault title="Informações pessoais">
          <div className="p-4 space-y-4">
            <p className="mb-4 text-sm leading-6 text-gray-800">
              O <Badge>nome completo</Badge> e a{" "}
              <Badge>data de aniversário</Badge> podem ser usados para estreitar
              a relação com seu cliente. Você pode atualizar ambos sempre que
              necessário.
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
        <Button isExpanded>Capturar cliente</Button>
        <Button
          isExpanded
          isSecondary
          type="button"
          onClick={() => {
            handleCancelScore();
          }}
        >
          Recomeçar captura
        </Button>
      </form>
    </>
  );
};
