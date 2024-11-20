

/* eslint-disable react/prop-types */

import { useEffect} from "react";
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import { changePasswordSchema} from "../../utils/validationSchema";
import { useResetPasswordMutation } from "../../api/authApi";
import Spinner from 'react-bootstrap/Spinner'
import { useParams, useNavigate } from "react-router-dom";


function ResetPassword() {

    const navigate = useNavigate()
    const {id,token} = useParams()

  // Initial State 
  const initialValues = {
    id,
    token,
    password:'',
    password_confirmation:''
  }

  // Formick is use for handle inputs fields and validation 
  const {values,errors,touched,handleChange,handleBlur,handleSubmit} = useFormik({
    initialValues,
    validationSchema:changePasswordSchema,
    onSubmit:async (values) => {
      try{
        await resetPassword(values)
        
       }catch(err){
         // console.log(error);
       }
    },
  });

  
  const [resetPassword,{data,error,isError,isSuccess,isLoading}] = useResetPasswordMutation()

  useEffect(()=>{
    if(isSuccess){
      toast.success(data?.message)
      navigate('/')
     }else if(isError){
      toast.error(error?.data.message)
      }
  },[isSuccess, isError, data?.message, error?.data.message])

  


  return (
    <div className="main-content-container d-flex justify-content-center my-5">
    <div className="main-content">
      <div className="product-heading">
        <h1 className="fs-4">Reset Password</h1>
      </div>
    <div className="  ">
      <div className=" my-4 ">
        <form onSubmit={handleSubmit} className="row">
          <div className="mb-3 col-12">
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
                <div className="field-error">{errors.password && touched.password? errors.password :null}</div>
          </div>
          <div className="mb-3 col-12">
            <label htmlFor="password" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              name="password_confirmation"
              value={values.password_confirmation}
              onChange={handleChange}
              onBlur={handleBlur}
              className="form-control"
              id="password"
              placeholder="Enter password"
            />
                <div className="field-error">{errors.password_confirmation && touched.password_confirmation? errors.password_confirmation :null}</div>
          </div>
          <button type="submit" className="btn btn-bg ">
          {isLoading? <Spinner size="sm" />: 'Submit'}
        </button>
        </form>
      </div>
     
    </div>
    </div>
    </div>
  );
}

export default ResetPassword;

