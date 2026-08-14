import * as Yup from "yup";

const registrationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Name must be 3 characters at minimum")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email address format")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be 8 characters at minimum")
    .required("Password is required"),
  password_confirmation: Yup.string()
    .oneOf(
      [Yup.ref("password"), null],
      "confirm passwords must match with password"
    )
    .required("Confrim password is required"),
});

const verifyEmailSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address format")
    .required("Email is required"),
  otp: Yup.string().min(4, "OTP must be 4 digit").required("OTP is required"),
});

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address format")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be 8 characters at minimum")
    .required("Password is required"),
    otp: Yup.string()
    .min(6, "OTP must be 6 characters")
    .required("OTP is required"),
});

const buildProductSchema = Yup.object().shape({
  products: Yup.array().of(
    Yup.object().shape({
      product_name: Yup.string()
        .min(3, "Name must be 3 characters at minimum")
        .required("Name is required"),
      price: Yup.string().required("Price is required"),
      qty: Yup.string().required("Qty is required"),
    })
  ),

  used_materials: Yup.array().of(
    Yup.object().shape({
      material_name: Yup.string()
        .min(3, "Name must be 3 characters at minimum")
        .required("Name is required"),
      qty: Yup.string().required("Qty is required"),
    })
  ),
});
const productSchema = Yup.object().shape({
  products: Yup.array().of(
    Yup.object().shape({
      product_name: Yup.string()
        .min(3, "Name must be 3 characters at minimum")
        .required("Name is required"),
      price: Yup.string().required("Price is required"),
      qty: Yup.string().required("Qty is required"),
    })
  ),
});

var addBuyersHistorySchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Name must be 3 characters at minimum")
    .required("Name is required"),

  state: Yup.string().required("State  is required"),
  payment_mode: Yup.string().required("Payment mode is required"),
  paid_amount: Yup.string().required("Paid amount is required"),
});

const purchaseSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Name must be 3 characters at minimum")
    .required("Name is required"),

  address: Yup.string().required("State  is required"),
  state: Yup.string().required("State  is required"),
  payment_mode: Yup.string().required("Payment mode is required"),
  products: Yup.array().of(
    Yup.object().shape({
      product_name: Yup.string()
        .min(3, "Name must be 3 characters at minimum")
        .required("Name is required"),
      price: Yup.string().required("Price is required"),
      qty: Yup.string().required("Qty is required"),
    })
  ),
});
const buyerSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Name must be 3 characters at minimum")
    .required("Name is required"),

  address: Yup.string().required("State  is required"),
  state: Yup.string().required("State  is required"),
  payment_mode: Yup.string().required("Payment mode is required"),
});
const billingSchema = Yup.object().shape({
  isGstRegistered: Yup.boolean(),
  name: Yup.string()
    .min(3, "Name must be 3 characters at minimum")
    .required("Name is required"),
  gst_number: Yup.string().when("isGstRegistered", {
    is: false,
    then: (schema) => schema.required("GST number is required"),
  }),
  ure_number: Yup.string().when("isGstRegistered", {
    is: true,
    then: (schema) => schema.required("URE number is required"),
  }),
  state: Yup.string().required("State  is required"),
  payment_mode: Yup.string().required("Payment mode is required"),
  products: Yup.array().of(
    Yup.object().shape({
      product_name: Yup.string()
        .min(3, "Name must be 3 characters at minimum")
        .required("Name is required"),
      price: Yup.string().required("Price is required"),
      qty: Yup.string().required("Qty is required"),
    })
  ),
  transporter_name: Yup.string(),
  vehicle_number: Yup.string(),
});
const withoutGstBillingSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Name must be 3 characters at minimum")
    .required("Name is required"),
  state: Yup.string().required("State  is required"),
  payment_mode: Yup.string().required("Payment mode is required"),
  products: Yup.array().of(
    Yup.object().shape({
      product_name: Yup.string()
        .min(3, "Name must be 3 characters at minimum")
        .required("Name is required"),
      price: Yup.string().required("Price is required"),
      qty: Yup.string().required("Qty is required"),
    })
  ),
  transporter_name: Yup.string(),
  vehicle_number: Yup.string(),
});

const changePasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, "Password must be 8 characters at minimum")
    .required("Password is required"),
  password_confirmation: Yup.string()
    .oneOf(
      [Yup.ref("password"), null],
      "confirm passwords must match with password"
    )
    .required("Confrim password is required"),
});

const resetPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address format")
    .required("Email is required"),
});

export {
  loginSchema,
  registrationSchema,
  verifyEmailSchema,
  buildProductSchema,
  productSchema,
  billingSchema,
  changePasswordSchema,
  resetPasswordSchema,
  withoutGstBillingSchema,
  buyerSchema,
  purchaseSchema,
  addBuyersHistorySchema,
};
