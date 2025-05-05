import { useFormik } from 'formik';
import { useEffect } from "react";
import {toast } from 'react-toastify';
import { verifyEmailSchema } from '../../utils/validationSchema';
import { useVerifyEmailMutation } from '../../api/authApi';
import Spinner from 'react-bootstrap/Spinner'
function VerifyEmail() {

    // Initial State 
  const initialValues = {
    email:'',
    otp:'',
  }

  // Formick is use for handle inputs fields and validation 
  const {values,errors,touched,handleChange,handleBlur,handleSubmit} = useFormik({
    initialValues,
    validationSchema:verifyEmailSchema,
    onSubmit:async (values) => {
      try{
        await verifyEmail(values)
       }catch(err){
         // console.log(error);
       }
    },
  });

  // Calling Registration api
  const [verifyEmail,{data,error,isError,isSuccess,isLoading}] = useVerifyEmailMutation()

  useEffect(()=>{
    if(isSuccess){
      toast.success(data?.message)
     }else if(isError){
      toast.error(error?.data.message)
      }
  },[isSuccess, isError, data?.message, error?.data.message])

  return (
    <div className=" d-flex justify-content-center align-items-center vh-100 ">
      <div className="form-container ">
        <form onSubmit={handleSubmit} className="w-100">
          <h2 className="text-center">Verify Email</h2>
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
             <div className="field-error">{errors.email && touched.email? errors.email :null}</div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              OTP
            </label>
            <input
              type="password"
              name="otp"
              value={values.otp}
              onChange={handleChange}
              onBlur={handleBlur}
              className="form-control"
              id="password"
              placeholder="Enter OTP"
            />
             <div className="field-error">{errors.otp && touched.otp? errors.otp :null}</div>
          </div>
         
          <button type="submit" className="btn btn-primary w-100">
           {isLoading? <Spinner size="sm" />: 'Submit'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default VerifyEmail
