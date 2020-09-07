import { Controller, useForm } from "react-hook-form";

import { Accordion } from "src/components/Accordion";
import { Badge } from "src/components/Badge";
import { Button } from "src/components/Button";
import { CaptureDataCard } from "src/components/CaptureDataCard";
import { Field } from "src/components/Field";
import type { CaptureData, User } from "src/types";

type FormData = User;

type Props = {
  captureData: CaptureData;
  user: FormData;
  onCancelCapture: () => void;
  onSubmit: (formData: FormData) => void;
};

export const PersonalInfoForm = ({
  captureData,
  user,
  onCancelCapture: handleCancelCapture,
  onSubmit,
}: Props) => {
  const { control, errors, handleSubmit, register } = useForm<FormData>({
    defaultValues: user,
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const hasPersonalInfoFilled = user.birthday && user.fullName;

  return (
    <>
      <CaptureDataCard
        amountSpent={captureData.amountSpent}
        className="mb-4"
        mobilePhoneNumber={captureData.mobilePhoneNumber}
      />
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <Accordion
          isInitiallyOpen={!hasPersonalInfoFilled}
          title="Informações pessoais"
        >
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
                    errorMessage={errors.birthday && "Campo obrigatório"}
                    hint="Opcional"
                    isMonoFont
                    label="Data de aniversário"
                    mask="##/##/####"
                    {...props}
                  />
                );
              }}
            />
          </div>
        </Accordion>
        <div className="space-y-2">
          <Button isExpanded>Capturar cliente</Button>
          <Button
            isExpanded
            isSecondary
            type="button"
            onClick={() => {
              handleCancelCapture();
            }}
          >
            Cancelar captura
          </Button>
        </div>
      </form>
    </>
  );
};
