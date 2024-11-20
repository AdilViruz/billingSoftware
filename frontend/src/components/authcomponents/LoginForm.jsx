/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { loginSchema } from "../../utils/validationSchema";
import { useLoginMutation } from "../../api/authApi";
import Spinner from "react-bootstrap/Spinner";
import { useNavigate } from "react-router-dom";
import loginBanner from "/images/login_banner_4.jpg";
import { getTooltipUtilityClass } from "@mui/material";
import { getDatabase, ref, set } from "firebase/database";
import app from "../firebaseConfig";
import { setToken } from "../../utils/localStorage";
import { setTokenRedux } from "../../features/auth/authSlice";
import { useDispatch } from "react-redux";

function LoginForm({ setModalShow }) {
  const navigate = useNavigate();

  // Initial State
  const initialValues = {
    email: "",
    password: "",
  };
  const [otpCheck ,setOtpCheck] = useState(0);
  const [otpGenerated, setOtpGenerated] = useState(false);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch()



  // Formik is use for handle inputs fields and validation
  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: loginSchema,
      onSubmit: async (values) => {
        try {
          // console.log(JSON.stringify(otpCheck) + "==" + values.otp);
        if (JSON.stringify(otpCheck) === values.otp){
          await login(values);
        } else{
          setOtpGenerated(false);
           toast.error("Invalid OTP");
        }
          
        } catch (err) {
          // console.log(error);
        }
      },
    });

  // Calling Registration api
  const [login, { data, error, isError, isSuccess, isLoading }] =
    useLoginMutation();

  useEffect(() => {

    if (isSuccess) {
      toast.success(data?.message);
      setToken(data?.token);
       dispatch(setTokenRedux(data?.token));
      setLoading(false);
      navigate("branch-nav", { replace: true });
    } else if (isError) {
       setOtpGenerated(false);
      toast.error(error?.data?.message);
    }
  }, [isSuccess, isError, data?.message, error?.data?.message]);

  const getOTP = async (e) => {
    console.log("OTP Sent");
    e.preventDefault();
  setOtpGenerated(true);
    const otp_number = Math.floor(100000 + Math.random() * 900000);
    setOtpCheck(otp_number);

    const db = getDatabase();
    set(ref(db, "otp"), JSON.stringify(otp_number));
  };

  return (
    <div className=" d-flex justify-content-between align-items-center vh-100 ">
      <div className="w-50">
        <img className="img-fluid " src={loginBanner} alt="Login Image" />
      </div>

      <div className="form-container d-flex justify-content-center align-items-center w-50 vh-100">
        <div className="w-75">
          <h1>Welcome,</h1>
          <p>Please login to continue</p>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className="form-control"
                id="email"
                placeholder="Enter email"
              />
              <div className="field-error">
                {errors.email && touched.email ? errors.email : null}
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                className="form-control"
                id="password"
                placeholder="Enter password"
              />
              <div className="field-error">
                {errors.password && touched.password ? errors.password : null}
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="otp" className="form-label">
                OTP
              </label>
              <input
                type="text"
                name="otp"
                value={values.otp}
                onChange={handleChange}
                onBlur={handleBlur}
                className="form-control"
                id="otp"
                placeholder="Enter OTP"
              />
              <div className="field-error">
                {errors.otp && touched.otp ? errors.otp : null}
              </div>
            </div>

            {otpGenerated?
              <button type="submit" className="btn btn-bg w-100 mt-4">
              {isLoading ? <Spinner size="sm" /> : "Login"}
            </button>
          :
          
          
            <button onClick={(e) => getOTP(e)} className="btn btn-dark w-100">
              Get OTP
            </button>
          }

          
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
