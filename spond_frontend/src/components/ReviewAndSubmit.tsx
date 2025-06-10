import { useState } from "react";
import type { FormData, FormMeta } from "../types";
import { groupOptions } from "../constants";

interface Props {
  formData: FormData;
  formMeta: FormMeta[];
  setStep: (step: number) => void;
}

const ReviewAndSubmit: React.FC<Props> = ({ formData, formMeta, setStep }) => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const memberTypeName =
    formMeta
      .flatMap((meta) => meta.memberTypes)
      .find((type) => type.id === formData.member_type_id)?.name ||
    formData.member_type_id;

  const groupName =
    groupOptions.find((g) => g.id === formData.group)?.name || formData.group;

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(null);
    try {
      const res = await fetch("http://localhost:8000/form/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }
      const data = await res.json();
      setSuccess(true);
      console.log(data);
    } catch (err: any) {
      console.error("Submission failed", err);
      setError("Submission failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="max-w-xl mx-auto bg-green-100 border border-green-400 p-6 rounded shadow text-green-700">
        <h2 className="text-xl font-bold mb-4">Success!</h2>
        <p>Your form has been successfully submitted.</p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Review Your Submission</h2>
      <ul className="mb-6 space-y-2 text-gray-700">
        <li>
          <strong>Member Type:</strong> {memberTypeName}
        </li>
        <li>
          <strong>Group:</strong> {groupName}
        </li>
        <li>
          <strong>Name:</strong> {formData.name}
        </li>
        <li>
          <strong>Email:</strong> {formData.email}
        </li>
        <li>
          <strong>Phone:</strong> {formData.phone}
        </li>
        <li>
          <strong>Birth Date:</strong> {formData.birth_date}
        </li>
      </ul>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <div className="flex justify-between">
        <button
          onClick={() => setStep(2)}
          className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
          disabled={isSubmitting}
        >
          Back
        </button>
        <button
          onClick={handleSubmit}
          className={`px-4 py-2 rounded text-white ${
            isSubmitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </div>
    </div>
  );
};

export default ReviewAndSubmit;
