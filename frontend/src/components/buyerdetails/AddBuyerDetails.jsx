/* eslint-disable react/prop-types */

import { useFormik, ErrorMessage, FormikProvider } from "formik";
import { useParams } from "react-router-dom";
import Spinner from "react-bootstrap/esm/Spinner";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { GetState } from "react-country-state-city";
import { buyerSchema } from "../../utils/validationSchema";

function AddBuyerDetails({
  heading,
  addBuyer,
  data,
  error,
  isError,
  isSuccess,
  isLoading,
  path,
}) {
  const navigate = useNavigate();
  const { branch } = useParams();
  const initialValues = {
    branch,
    name: "",
    gst_number: "",
    address: "",
    state: "",
    payment_mode: "",
  };

  // Formick is use for handle inputs fields and validation
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: buyerSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
        try {
            await addBuyer(values);
          
        } catch (err) {
          // console.log(error);
        }
    },
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message);
      navigate(path);
    } else if (isError) {
      toast.error(error?.data?.message);
    }
  }, [isSuccess, isError, data?.message, error?.data?.message]);

  // Get State selector options
  const [states, setStates] = useState([]);
  useEffect(() => {
    GetState(101).then((res) => {
      console.log(res);
      setStates(res);
    });
  }, []);

  const satetOptions = states?.reduce((acc, curr) => {
    acc.push({ value: curr.name, label: curr.name });
    return acc;
  }, []);

  // Payment mode options

  const paymentOptions = [
    {
      value: "Cash",
      label: "Cash",
    },
    {
      value: "Cheque",
      label: "Cheque",
    },
    {
      value: "Online",
      label: "Online",
    },
  ];

  return (
    <div className="main-content-container">
      <div className="main-content">
        <div className="product-heading">
          <h1 className="fs-4">{heading}</h1>
        </div>
        <FormikProvider value={formik}>
          <form onSubmit={formik.handleSubmit}>
            <div className=" row ">
              <h2 className="fs-5">Buyer Info</h2>

              <div className=" col-4">
                <label htmlFor="name" className="form-label">
                  Buyer Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="form-control"
                  id="name"
                  placeholder="Enter product name"
                />
                <ErrorMessage
                  name={`name`}
                  component="div"
                  className="field-error"
                />
              </div>

              <div className=" col-4">
                <label htmlFor="name" className="form-label">
                  GST No.
                </label>
                <input
                  type="text"
                  name="gst_number"
                  value={formik.values.gst_number}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="form-control"
                  id="name"
                  placeholder="Enter GST Number"
                />
                <ErrorMessage
                  name={`gst_number`}
                  component="div"
                  className="field-error"
                />
              </div>

              <div className=" col-4">
                <label htmlFor="name" className="form-label">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="form-control"
                  id="name"
                  placeholder="Enter address"
                />
                <ErrorMessage
                  name={`address`}
                  component="div"
                  className="field-error"
                />
              </div>
              <div className=" col-4">
                <label htmlFor="name" className="form-label">
                  State
                </label>
                <Select
                  styles={{
                    menuList: (styles) => ({
                      ...styles,
                      maxHeight: "120px",
                      overflowX: "auto",
                    }),
                  }}
                  options={satetOptions}
                  value={{
                    value: formik.values?.state,
                    label: formik.values?.state,
                  }}
                  onChange={(option) =>
                    formik.setFieldValue(`state`, option.value)
                  }
                />
                <ErrorMessage
                  name={`state`}
                  component="div"
                  className="field-error"
                />
              </div>
              <div className=" col-4">
                <label htmlFor="name" className="form-label">
                  Payment Mode
                </label>
                <Select
                  styles={{
                    menuList: (styles) => ({
                      ...styles,
                      maxHeight: "120px",
                      overflowX: "auto",
                    }),
                  }}
                  options={paymentOptions}
                  value={{
                    value: formik.values?.payment_mode,
                    label: formik.values?.payment_mode,
                  }}
                  onChange={(option) =>
                    formik.setFieldValue(`payment_mode`, option.value)
                  }
                />
                <ErrorMessage
                  name={`payment_mode`}
                  component="div"
                  className="field-error"
                />
              </div>
            </div>
            <button type="submit" className="btn btn-bg my-4 ">
              {isLoading ? <Spinner size="sm" /> : "Submit"}
            </button>
          </form>
        </FormikProvider>
      </div>
    </div>
  );
}

export default AddBuyerDetails;
