/* eslint-disable react/prop-types */
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useResetPasswordLinkMutation } from '../../api/authApi';
import Spinner from 'react-bootstrap/esm/Spinner';
import { resetPasswordSchema } from '../../utils/validationSchema';

function ForgotPassword() {

     // Initial State 
  const initialValues = {
    email:'',
  }


// Formick is use for handle inputs fields and validation 
const {values,errors,touched,handleChange,handleBlur,handleSubmit} = useFormik({
    initialValues,
    validationSchema:resetPasswordSchema,
    onSubmit:async (values,action) => {
      try{
        await resetPasswordLink(values)
        action.resetForm()
       }catch(err){
         // console.log(error);
       }
    },
  });


  const [resetPasswordLink,{data,error,isError,isSuccess,isLoading}] = useResetPasswordLinkMutation()

  useEffect(()=>{
    if(isSuccess){
      toast.success(data?.message)
     }else if(isError){
      toast.error(error?.data.message)
      }
  },[isSuccess, isError, data?.message, error?.data.message])

  return (
    
      <div>
  <form onSubmit={handleSubmit} className="w-100">
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
          <button type="submit" className="btn btn-bg ">
          {isLoading? <Spinner size="sm" />: 'Submit'}
        </button>
        </form>
      </div>
  )
}

export default ForgotPassword
