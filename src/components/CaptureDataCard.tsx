import { Card } from "src/components/Card";

interface Props extends React.ComponentProps<"div"> {
  amountSpent: string;
  mobilePhoneNumber: string;
}

export const CaptureDataCard = ({
  amountSpent,
  mobilePhoneNumber,
  ...rest
}: Props) => {
  return (
    <Card {...rest}>
      <h2 className="text-lg font-medium leading-7 text-gray-900">
        Dados de captura
      </h2>
      <dl>
        <div className="flex space-x-2 text-sm leading-6">
          <dt className="font-medium text-gray-900">Telefone celular:</dt>
          <dd className="font-mono text-gray-800">{mobilePhoneNumber}</dd>
        </div>
        <div className="flex space-x-2 text-sm leading-6">
          <dt className="font-medium text-gray-900">Valor gasto:</dt>
          <dd className="font-mono text-gray-800">{amountSpent}</dd>
        </div>
      </dl>
    </Card>
  );
};
