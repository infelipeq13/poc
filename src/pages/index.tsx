import { useState } from "react";

import { CaptureDataForm } from "src/components/CaptureDataForm";
import { Layout } from "src/components/Layout";
import { PersonalInfoForm } from "src/components/PersonalInfoForm";
import type { CaptureData, User } from "src/types";

enum Step {
  CAPTURE_DATA = "CAPTURE_DATA",
  PERSONAL_INFO = "PERSONAL_INFO",
}

const defaultCaptureData = {
  amountSpent: "",
  phoneNumber: "",
};

const defaultUser = {
  dateOfBirth: "",
  fullName: "",
};

const HomePage = () => {
  const [captureData, setCaptureData] = useState<CaptureData>(
    defaultCaptureData
  );
  const [currentStep, setCurrentStep] = useState<Step>(Step.CAPTURE_DATA);
  const [user, setUser] = useState<User>(defaultUser);

  const reset = () => {
    setCaptureData(defaultCaptureData);
    setUser(defaultUser);

    // Update current step.
    setCurrentStep(Step.CAPTURE_DATA);
  };

  return (
    <Layout title="Captura de cliente">
      {currentStep === Step.CAPTURE_DATA && (
        <CaptureDataForm
          onSubmit={({ amountSpent, phoneNumber }) => {
            setCaptureData({ amountSpent, phoneNumber });

            // TODO: Fetch user by phone number.
            setTimeout(() => {
              setCurrentStep(Step.PERSONAL_INFO);
            }, 1000);
          }}
        />
      )}
      {currentStep === Step.PERSONAL_INFO && (
        <PersonalInfoForm
          captureData={captureData}
          user={user}
          onCancel={() => {
            reset();
          }}
          onSubmit={({ dateOfBirth, fullName }) => {
            reset();

            // TODO: Confirmation dialog.
            alert("!");

            // TODO: Update personal information if needed.
            setUser({ dateOfBirth, fullName });
          }}
        />
      )}
    </Layout>
  );
};

export default HomePage;
