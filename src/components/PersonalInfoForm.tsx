import { useState } from "react";

import { Accordion } from "src/components/Accordion";
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
  user: User;
  onCancel: () => void;
  onSubmit: (formData: FormData) => void;
};

type FieldsProps = FormData & {
  onChangeDateOfBirth: React.FormEventHandler<HTMLInputElement>;
  onChangeFullName: React.FormEventHandler<HTMLInputElement>;
};

const Fields = ({
  dateOfBirth,
  fullName,
  onChangeDateOfBirth: handleChangeDateOfBirth,
  onChangeFullName: handleChangeFullName,
}: FieldsProps) => {
  return (
    <>
      <Field
        hint="(Opcional)"
        label="Nome completo"
        value={fullName}
        onChange={handleChangeFullName}
      />
      <Field
        columnSpan={4}
        hint="(Opcional)"
        isMonoFont
        label="Data de nascimento"
        value={dateOfBirth}
        onChange={handleChangeDateOfBirth}
      />
    </>
  );
};

export const PersonalInfoForm = ({
  captureData,
  user,
  onCancel: handleCancel,
  onSubmit: handleSubmit,
}: Props) => {
  const [fullName, setFullName] = useState(user.fullName);
  const [dateOfBirth, setDateOfBirth] = useState(user.dateOfBirth);

  const isReturningUser = user.dateOfBirth && user.fullName;

  return (
    <>
      <CaptureDataCard
        amountSpent={captureData.amountSpent}
        className="mb-4"
        phoneNumber={captureData.phoneNumber}
      />
      {!isReturningUser && (
        <>
          <h2 className="mb-2 text-lg font-medium leading-7 text-gray-900">
            Informações pessoais
          </h2>
          <p className="mb-4 text-sm leading-6 text-gray-800">
            O <span className="font-medium">nome completo</span> e a{" "}
            <span className="font-medium">data de nascimento</span> podem ser
            usados para estreitar a relação com seu cliente.
          </p>
        </>
      )}
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();

          handleSubmit({ dateOfBirth, fullName });
        }}
      >
        {isReturningUser ? (
          <Accordion title="Informações pessoais">
            <div className="p-4 space-y-4">
              <p className="mb-4 text-sm leading-6 text-gray-800">
                O <span className="font-medium">nome completo</span> e a{" "}
                <span className="font-medium">data de nascimento</span>, se
                necessário, podem ser atualizados.
              </p>
              <Fields
                dateOfBirth={dateOfBirth}
                fullName={fullName}
                onChangeDateOfBirth={(e) => {
                  setDateOfBirth(e.currentTarget.value);
                }}
                onChangeFullName={(e) => {
                  setFullName(e.currentTarget.value);
                }}
              />
            </div>
          </Accordion>
        ) : (
          <Fields
            dateOfBirth={dateOfBirth}
            fullName={fullName}
            onChangeDateOfBirth={(e) => {
              setDateOfBirth(e.currentTarget.value);
            }}
            onChangeFullName={(e) => {
              setFullName(e.currentTarget.value);
            }}
          />
        )}
        <div className="space-y-2">
          <Button isExpanded>Capturar cliente</Button>
          <Button isExpanded isSecondary type="button" onClick={handleCancel}>
            Cancelar captura
          </Button>
        </div>
      </form>
    </>
  );
};
