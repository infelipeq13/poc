import { useForm } from "react-hook-form";

import { Accordion } from "src/components/Accordion";
import { Badge } from "src/components/Badge";
import { Button } from "src/components/Button";
import { CaptureDataCard } from "src/components/CaptureDataCard";
import { Field } from "src/components/Field";
import type { CaptureData, User } from "src/types";

type FormData = {
  dateOfBirth: string;
  fullName: string;
};

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
  const { handleSubmit, register } = useForm<FormData>({
    defaultValues: {
      dateOfBirth: user.dateOfBirth,
      fullName: user.fullName,
    },
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const hasPersonalInfoFilled = user.dateOfBirth && user.fullName;

  return (
    <>
      <CaptureDataCard
        amountSpent={captureData.amountSpent}
        className="mb-4"
        phoneNumber={captureData.phoneNumber}
      />
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <Accordion
          isInitiallyOpen={!hasPersonalInfoFilled}
          title="Informações pessoais"
        >
          <div className="p-4 space-y-4">
            <p className="mb-4 text-sm leading-6 text-gray-800">
              O <Badge>nome completo</Badge> e a{" "}
              <Badge>data de nascimento</Badge> podem ser usados para estreitar
              a relação com seu cliente. Você pode atualizar ambos sempre que
              necessário.
            </p>
            <Field
              ref={register}
              hint="Opcional"
              label="Nome completo"
              name="fullName"
            />
            <Field
              ref={register}
              columnSpan={4}
              hint="Opcional"
              isMonoFont
              label="Data de nascimento"
              name="dateOfBirth"
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
