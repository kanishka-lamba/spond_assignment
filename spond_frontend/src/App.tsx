// src/App.tsx
import { useEffect, useState } from "react";
import "./App.css";
import type { FormMeta, FormData } from "./types";
import SelectMembershipInfo from "./components/SelectMembershipInfo";
import UserDetailsForm from "./components/UserDetailsForm";
import ReviewAndSubmit from "./components/ReviewAndSubmit";
import { defaultFormData } from "./constants";

function App() {
  const [step, setStep] = useState(1);
  const [formMeta, setFormMeta] = useState<FormMeta[] | null>(null);
  const [formDataMap, setFormDataMap] = useState<Record<string, FormData>>({});
  const [formData, setFormData] = useState<FormData>({ ...defaultFormData });

  useEffect(() => {
    const fetchFormMeta = async () => {
      try {
        const res = await fetch("http://localhost:8080/form");
        const data = await res.json();
        setFormMeta(data);
      } catch (err) {
        console.error("Failed to load form data", err);
      }
    };

    fetchFormMeta();
  }, []);

  const handleNextFromStep1 = (selectedData: FormData) => {
    setFormData((prev) => ({
      ...prev,
      member_type_id: selectedData.member_type_id,
      group: selectedData.group,
    }));
    setStep(2);
  };

  if (!formMeta) {
    return <p className="text-center p-4">Loading form...</p>;
  }

  return (
    <div className="py-6 bg-gray-100">
      {step === 1 && (
        <SelectMembershipInfo
          formMeta={formMeta}
          formDataMap={formDataMap}
          setFormDataMap={setFormDataMap}
          onNext={handleNextFromStep1}
        />
      )}
      {step === 2 && (
        <UserDetailsForm
          formData={formData}
          setFormData={setFormData}
          setStep={setStep}
        />
      )}
      {step === 3 && (
        <ReviewAndSubmit
          formData={formData}
          formMeta={formMeta}
          setStep={setStep}
        />
      )}
    </div>
  );
}

export default App;
