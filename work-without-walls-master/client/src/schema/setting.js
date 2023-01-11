import * as Yup from "yup";

const cnic = "^[0-9]{5}-[0-9]{7}-[0-9]$";

const SettingSchema = Yup.object({
  CNIC: Yup.string()
    .required("CNIC is required !!")
    .matches(cnic, "CNIC format is not valid !!"),
  oldpassword: Yup.string()
    .required("Password is required !!")
    .min(8, "Password length should be minimum of 8 !!"),
    password: Yup.string()
    .required("Password is required !!")
    .min(8, "Password length should be minimum of 8 !!"),
 
});

export { SettingSchema};