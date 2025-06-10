import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import type { FormData } from "../types";
import { validationSchema } from "../validationSchema";

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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: formData,
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data: FormData) => {
    setFormData(data);
    setStep(3);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-xl mx-auto bg-white p-6 rounded shadow space-y-4"
    >
      <h2 className="text-xl font-bold mb-4">Enter your details</h2>

      {["name", "email", "phone", "birth_date"].map((field) => {
        const type =
          field === "birth_date"
            ? "date"
            : field === "email"
            ? "email"
            : "text";

        return (
          <div key={field}>
            <input
              {...register(field as keyof FormData)}
              type={type}
              placeholder={field
                .replace("_", " ")
                .replace(/\b\w/g, (c) => c.toUpperCase())}
              className="w-full p-2 border rounded"
            />
            {errors[field as keyof FormData] && (
              <p className="text-red-600 text-sm mt-1">
                {errors[field as keyof FormData]?.message}
              </p>
            )}
          </div>
        );
      })}

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
