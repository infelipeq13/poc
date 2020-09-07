import { useState } from "react";

import { Button } from "src/components/Button";
import { CaptureDataForm } from "src/components/CaptureDataForm";
import { Layout } from "src/components/Layout";
import { PersonalInfoForm } from "src/components/PersonalInfoForm";
import type { CaptureData, User } from "src/types";

enum Step {
  CAPTURE_DATA,
  PERSONAL_INFO,
}

const emptyCaptureData = {
  amountSpent: "",
  mobilePhoneNumber: "",
};

const emptyUser = {
  birthday: "",
  fullName: "",
};

const HomePage = () => {
  const [captureData, setCaptureData] = useState<CaptureData>(emptyCaptureData);
  const [step, setStep] = useState<Step>(Step.CAPTURE_DATA);
  const [user, setUser] = useState<User>(emptyUser);

  const resetAllData = () => {
    setCaptureData(emptyCaptureData);
    setStep(Step.CAPTURE_DATA);
    setUser(emptyUser);
  };

  return (
    <Layout title="Captura de cliente">
      {step === Step.CAPTURE_DATA && (
        <CaptureDataForm
          onSubmit={({ amountSpent, mobilePhoneNumber }) => {
            setCaptureData({ amountSpent, mobilePhoneNumber });

            // TODO: Attempt to fetch user by phone number.
            setTimeout(() => {
              setStep(Step.PERSONAL_INFO);
            }, 1000);
          }}
        />
      )}
      {step === Step.PERSONAL_INFO && (
        <PersonalInfoForm
          captureData={captureData}
          user={user}
          onCancelCapture={() => {
            resetAllData();
          }}
          onSubmit={({ birthday, fullName }) => {
            resetAllData();

            // TODO: Show confirmation dialog.
            alert("!");

            // TODO: Update personal information if needed.
            setUser({ birthday, fullName });
          }}
        />
      )}
    </Layout>
  );
};

export default HomePage;
