/* eslint-disable react/prop-types */
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import Select from "react-select";


import { GetState } from "react-country-state-city";
function BuyerEditModal(props) {
 
  const data = props.data?.buyers[0];

  // Initial State
  const initialValues = {
    id: data?._id,
    branch: data?.branch,
    name: data?.name,
    gst_number: data?.gst_number,
    address: data?.address,
    state: data?.state,
    payment_mode: data?.payment_mode,
  };

  // Formick is use for handle inputs fields and validation
  const {
    values,
    setFieldValue,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useFormik({
    initialValues,
    // validationSchema:registrationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        await props.updateProduct(values);
      } catch (err) {
        // console.log(error);
      }
    },
  });

  useEffect(() => {
    if (props.isSuccess) {
      toast.success(props.updateData?.message);
      props.setEditModal(false);
    } else if (props.isError) {
      toast.error(props.error?.data.message);
    }
  }, [props.isSuccess, props.isError, props.updateData?.message]);



 

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
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.heading}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="add-product">
          <form
            onSubmit={handleSubmit}
            className="row product-fields-container my-2"
          >
            <div className="d-flex justify-content-between">
              <div className="d-flex"></div>
            </div>
            <div className="mb-3 col-4">
              <label htmlFor="name" className="form-label">
                Buyer Name
              </label>
              <input
                type="text"
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                className="form-control"
                id="name"
                placeholder="Enter product qty"
                disabled={props.disable}
              />
            </div>
            <div className="mb-3 col-4">
              <label htmlFor="name" className="form-label">
                GST Number
              </label>
              <input
                type="number"
                name="gst_number"
                value={values.gst_number}
                onChange={handleChange}
                onBlur={handleBlur}
                className="form-control"
                id="name"
                placeholder="Enter product price"
                disabled={props.disable}
              />
            </div>
            <div className="mb-3 col-4">
              <label htmlFor="name" className="form-label">
                Address
              </label>
              <input
                type="text"
                name="address"
                value={values.address}
                onChange={handleChange}
                onBlur={handleBlur}
                className="form-control"
                id="name"
                placeholder="Enter product qty"
                disabled={props.disable}
              />
            </div>
            <div className="mb-3 col-6">
              <label htmlFor="name" className="form-label">
                State
              </label>

              <Select
                styles={{
                  menuList: (styles) => ({
                    ...styles,
                    height: "130px",
                    overflowX: "auto",
                  }),
                }}
                options={satetOptions}
                value={{ value: values.state, label: values.state }}
                onChange={(option) => setFieldValue(`state`, option.value)}
                isDisabled={props.disable}
              />
            </div>
            <div className="mb-3 col-6">
              <label htmlFor="name" className="form-label">
                Payment Mode
              </label>

              <Select
                styles={{
                  menuList: (styles) => ({
                    ...styles,
                    height: "130px",
                    overflowX: "auto",
                  }),
                }}
                options={paymentOptions}
                value={{
                  value: values.payment_mode,
                  label: values.payment_mode,
                }}
                onChange={(option) =>
                  setFieldValue(`payment_mode`, option.value)
                }
                isDisabled={props.disable}
              />
            </div>
            <button className=" mt-2 btn btn-bg" disabled={props.disable}>
              Submit
            </button>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default BuyerEditModal;
