import { Controller, useForm } from "react-hook-form";

import { Badge } from "src/components/Badge";
import { Button } from "src/components/Button";
import { Field } from "src/components/Field";

type FormData = {
  amountSpent: string;
  phoneNumber: string;
};

type Props = {
  onSubmit: (formData: FormData) => void;
};

export const CaptureDataForm = ({ onSubmit }: Props) => {
  const { control, errors, handleSubmit, register, reset } = useForm<FormData>({
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  return (
    <>
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
          defaultValue=""
          name="phoneNumber"
          render={(props) => {
            return (
              <Field
                columnSpan={5}
                errorMessage={errors.phoneNumber && "Campo obrigatório"}
                hint="Somente números"
                isMonoFont
                label="Telefone celular"
                mask="(##) # ####-####"
                {...props}
              />
            );
          }}
          rules={{ required: true }}
        />
        <Field
          ref={register({
            required: true,
          })}
          columnSpan={3}
          errorMessage={errors.amountSpent && "Campo obrigatório"}
          hint="Somente números"
          isMonoFont
          label="Valor gasto"
          name="amountSpent"
        />
        <div className="space-y-2">
          <Button isExpanded>Buscar cliente</Button>
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
        </div>
      </form>
    </>
  );
};
