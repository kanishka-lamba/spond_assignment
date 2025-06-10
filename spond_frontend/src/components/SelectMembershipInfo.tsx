import type { FormMeta, FormData } from "../types";
import { defaultFormData, groupOptions } from "../constants";

interface Props {
  formMeta: FormMeta[];
  formDataMap: Record<string, FormData>;
  setFormDataMap: React.Dispatch<
    React.SetStateAction<Record<string, FormData>>
  >;
  onNext: (data: FormData) => void;
}

const SelectMembershipInfo: React.FC<Props> = ({
  formMeta,
  formDataMap,
  setFormDataMap,
  onNext,
}) => {
  const handleChange = (
    formId: string,
    field: keyof FormData,
    value: string
  ) => {
    setFormDataMap((prev) => ({
      ...prev,
      [formId]: {
        ...(prev[formId] || defaultFormData),
        [field]: value,
      },
    }));
  };

  return (
    <>
      {formMeta.map(({ formId, title, memberTypes, registrationOpens }) => {
        const data = formDataMap[formId] || { ...defaultFormData };
        const isNextDisabled = !data.member_type_id || !data.group;
        const registrationDate = new Date(registrationOpens);
        const now = new Date();

        if (registrationDate > now) {
          return (
            <div
              key={formId}
              className="max-w-xl mx-auto bg-yellow-100 border-yellow-400 border p-6 rounded shadow mb-6 text-center"
            >
              <h2 className="text-xl font-bold mb-2">{title}</h2>
              <p>
                Registration for this membership will open on{" "}
                <strong>{registrationDate.toLocaleDateString()}</strong>. Please
                check later.
              </p>
            </div>
          );
        }

        return (
          <div
            key={formId}
            className="max-w-xl mx-auto bg-white p-6 rounded shadow mb-6"
          >
            <h1 className="text-2xl font-bold mb-2">{title}</h1>
            <p className="text-gray-600 mb-6">
              Select your membership type to continue.
            </p>

            <label className="block mb-2 font-medium">Member Type</label>
            <select
              value={data.member_type_id}
              onChange={(e) =>
                handleChange(formId, "member_type_id", e.target.value)
              }
              className="w-full border p-2 rounded mb-4"
            >
              <option value="">-- Select Member Type --</option>
              {memberTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </select>

            <label className="block mb-2 font-medium">Group</label>
            <select
              value={data.group}
              onChange={(e) => handleChange(formId, "group", e.target.value)}
              className="w-full border p-2 rounded mb-4"
            >
              <option value="">-- Select Group --</option>
              {groupOptions.map((group) => (
                <option key={group.id} value={group.id}>
                  {group.name}
                </option>
              ))}
            </select>

            <button
              className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
              disabled={isNextDisabled}
              onClick={() => onNext(data)}
            >
              Next
            </button>
          </div>
        );
      })}
    </>
  );
};

export default SelectMembershipInfo;
