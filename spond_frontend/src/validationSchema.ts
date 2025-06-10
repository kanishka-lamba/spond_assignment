import * as yup from "yup";
import { differenceInYears } from "date-fns";

export const validationSchema = yup.object({
  name: yup.string().required("Name is required"),

  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),

  phone: yup
    .string()
    .matches(/^[+]?[\d\s\-().]{7,20}$/, "Enter a valid phone number")
    .required("Phone is required"),

  birth_date: yup
    .string()
    .required("Birth date is required")
    .test(
      "valid-date",
      "Invalid date",
      (value) => !isNaN(Date.parse(value || ""))
    )
    .test(
      "not-in-future",
      "Birth date cannot be in the future",
      (value) => new Date(value || "") <= new Date()
    )
    .test(
      "age",
      "You must be at least 10 years old",
      (value) => differenceInYears(new Date(), new Date(value || "")) >= 10
    ),
  member_type_id: yup.string().required("Member type is required"),
  group: yup.string().required("Group is required"),
});
