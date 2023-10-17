import * as Yup from "yup";

export const newContactFormValidation = Yup.object({
  name: Yup.string().required("Name is required"),
  mobile: Yup.string().matches(
    /^[0-9]{1,16}$/,
    "Mobile number must be a number with up to 16 digits"
  ),
  landline: Yup.string().matches(
    /^[0-9]{1,16}$/,
    "Mobile number must be a number with up to 16 digits"
  ),
});
