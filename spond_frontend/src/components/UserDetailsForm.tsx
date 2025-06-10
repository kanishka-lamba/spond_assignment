import type { FormData } from "../types";

interface Props {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  setStep: (step: number) => void;
}

const UserDetailsForm: React.FC<Props> = ({
  formData,
  setFormData,
  setStep,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto bg-white p-6 rounded shadow space-y-4"
    >
      <h2 className="text-xl font-bold mb-4">Enter your details</h2>

      {["name", "email", "phone", "birth_date"].map((field) => (
        <input
          key={field}
          name={field}
          type={
            field === "birth_date"
              ? "date"
              : field === "email"
              ? "email"
              : "text"
          }
          placeholder={field
            .replace("_", " ")
            .replace(/\b\w/g, (c) => c.toUpperCase())}
          value={formData[field as keyof FormData]}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      ))}

      <div className="flex justify-between pt-4">
        <button
          type="button"
          onClick={() => setStep(1)}
          className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
        >
          Back
        </button>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Next
        </button>
      </div>
    </form>
  );
};

export default UserDetailsForm;
