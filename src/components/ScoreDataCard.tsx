import { Card } from "src/components/Card";
import type { ScoreData } from "src/types";

type Props = ScoreData & {
  className?: string;
};

export const ScoreDataCard = ({ amountSpent, phoneNumber, ...rest }: Props) => {
  return (
    <Card {...rest}>
      <h2 className="text-lg font-medium leading-7 text-gray-900">
        Informações capturadas
      </h2>
      <dl>
        <div className="flex space-x-2 text-sm leading-6">
          <dt className="font-medium text-gray-900">Telefone celular:</dt>
          <dd className="font-mono text-gray-800">{phoneNumber}</dd>
        </div>
        <div className="flex space-x-2 text-sm leading-6">
          <dt className="font-medium text-gray-900">Valor gasto:</dt>
          <dd className="font-mono text-gray-800">{amountSpent}</dd>
        </div>
      </dl>
    </Card>
  );
};
