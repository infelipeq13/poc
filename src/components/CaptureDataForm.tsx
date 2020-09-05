import { useState } from "react";

import { Button } from "src/components/Button";
import { Field } from "src/components/Field";

type FormData = {
  amountSpent: string;
  phoneNumber: string;
};

type Props = {
  onSubmit: (formData: FormData) => void;
};

export const CaptureDataForm = ({ onSubmit: handleSubmit }: Props) => {
  const [amountSpent, setAmountSpent] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  return (
    <>
      <h2 className="mb-2 text-lg font-medium leading-7 text-gray-900">
        Dados de captura
      </h2>
      <p className="mb-4 text-sm font-normal leading-6 text-gray-800">
        Comece informando o{" "}
        <span className="font-medium">telefone celular</span> e o{" "}
        <span className="font-medium">valor gasto</span>. Depois, selecione{" "}
        <span className="font-medium text-blue-600">Buscar cliente</span>. Após
        confirmar ou inserir os dados, selecione{" "}
        <span className="font-medium text-blue-600">Capturar cliente</span>.
      </p>
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();

          handleSubmit({ amountSpent, phoneNumber });
        }}
      >
        <Field
          columnSpan={5}
          isMonoFont
          label="Telefone celular"
          value={phoneNumber}
          onChange={(e) => {
            setPhoneNumber(e.currentTarget.value);
          }}
        />
        <Field
          columnSpan={3}
          isMonoFont
          label="Valor gasto"
          value={amountSpent}
          onChange={(e) => {
            setAmountSpent(e.currentTarget.value);
          }}
        />
        <div className="space-y-2">
          <Button isExpanded>Buscar cliente</Button>
          <Button
            isExpanded
            isSecondary
            type="button"
            onClick={() => {
              setAmountSpent("");
              setPhoneNumber("");
            }}
          >
            Limpar formulário
          </Button>
        </div>
      </form>
    </>
  );
};
