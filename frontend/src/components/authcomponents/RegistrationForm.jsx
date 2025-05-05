import { Link } from "react-router-dom";
import { useFormik } from 'formik';
import { registrationSchema } from "../../utils/validationSchema";
import { useRegistrationMutation } from "../../api/authApi";
import { useEffect } from "react";
import { toast } from 'react-toastify';
import Spinner from 'react-bootstrap/Spinner'
 
function RegistrationForm() {

  // Initial State 
  const initialValues = {
    name:'',
    email:'',
    password:'',
    password_confirmation:''

  }

  // Formick is use for handle inputs fields and validation 
  const {values,errors,touched,handleChange,handleBlur,handleSubmit} = useFormik({
    initialValues,
    validationSchema:registrationSchema,
    onSubmit:async (values,action) => {
      try{
        await registration(values)
        action.resetForm()
       }catch(err){
         // console.log(error);
       }
    },
  });

  // Calling Registration api
  const [registration,{data,error,isError,isSuccess,isLoading}] = useRegistrationMutation()

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
          <h2 className="text-center">Sign Up</h2>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              name='name'
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              className="form-control"
              id="name"
              placeholder="Enter name"
            />
            <div className="field-error">{errors.name && touched.name? errors.name:null}</div>
          </div>
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
          <div className="mb-3">
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
              placeholder="Enter confirm password"
            />
            <div className="field-error">{errors.password_confirmation && touched.password_confirmation? errors.password_confirmation :null}</div>
          </div>
          <div className="mb-4">
            Have an account? <Link to="/"> Log in</Link>
          </div>
          <button type="submit" className="btn btn-bg  w-100">
          {isLoading? <Spinner size="sm" />: 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegistrationForm;
