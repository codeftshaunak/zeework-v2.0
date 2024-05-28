import * as yup from "yup";
export const billingSchema = yup.object().shape({
  firstName: yup
    .string()
    .required("First name is required")
    .matches(/^[A-Z]/, "First character must be uppercase")
    .matches(/^\S*$/, "White spaces are not allowed")
    .matches(/^[a-zA-Z\s]*$/, "Only letters are allowed"),
  lastName: yup
    .string()
    .required("Last name is required")
    .matches(/^[A-Z]/, "First character must be uppercase")
    .matches(/^\S*$/, "White spaces are not allowed")
    .matches(/^[a-zA-Z\s]*$/, "Only letters are allowed"),
  address_country: yup.string().required("Country is required"),
  address_city: yup.string().required("City is required"),
  address_zip: yup.string().required("Postal code is required"),
  address_line1: yup.string().required("Address line 1 is required"),
});

export const addBankSchema = yup.object().shape({
  bank_name: yup.string().required("Bank name is required"),
  account_number: yup.string().required("Account number is required"),
  iban: yup.string().required("IBAN is required"),
  sort_code: yup.string().required("Sort code is required"),
  routing_number: yup.string().required("Routing number is required"),
  bic_swift_code: yup.string().required("BIC/SWIFT code is required"),
  first_name: yup.string().required("First name is required"),
  last_name: yup.string().required("Last name is required"),
  address: yup.string().required("Address is required"),
  // personal_details: yup.string().required("Personal details is required"),
});
