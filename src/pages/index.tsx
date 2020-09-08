import { useState } from "react";

import { Layout } from "src/components/Layout";
import { PersonalDataForm } from "src/components/PersonalDataForm";
import { ScoreDataForm } from "src/components/ScoreDataForm";
import { findCustomerByPhoneNumber } from "src/services/customer";
import type { Customer, ScoreData } from "src/types";

enum Step {
  PERSONAL_DATA,
  SCORE_DATA,
}

const emptyCustomer = {
  birthday: "",
  fullName: "",
};

const emptyScoreData = {
  amountSpent: "",
  phoneNumber: "",
};

const HomePage = () => {
  const [customer, setCustomer] = useState<Customer>(emptyCustomer);
  const [scoreData, setScoreData] = useState<ScoreData>(emptyScoreData);
  const [step, setStep] = useState<Step>(Step.SCORE_DATA);

  const resetAllData = () => {
    setCustomer(emptyCustomer);
    setScoreData(emptyScoreData);
    setStep(Step.SCORE_DATA);
  };

  return (
    <Layout title="Capturar cliente">
      {step === Step.PERSONAL_DATA && (
        <PersonalDataForm
          customer={customer}
          scoreData={scoreData}
          onCancelScore={() => {
            resetAllData();
          }}
          onSubmit={({ birthday, fullName }) => {
            resetAllData();

            // TODO: Update personal data if needed.
            console.log({ birthday, fullName });
          }}
        />
      )}
      {step === Step.SCORE_DATA && (
        <ScoreDataForm
          onSubmit={async ({ amountSpent, phoneNumber }) => {
            setScoreData({ amountSpent, phoneNumber });

            try {
              const customer = await findCustomerByPhoneNumber(phoneNumber);

              setCustomer(customer);
              setStep(Step.PERSONAL_DATA);
            } catch (e) {
              console.error(e);
            }
          }}
        />
      )}
    </Layout>
  );
};

export default HomePage;
