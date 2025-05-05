/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { useFormik, FieldArray, FormikProvider, ErrorMessage } from "formik";
import { useParams, useLocation } from "react-router-dom";
import Spinner from "react-bootstrap/esm/Spinner";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import {
  useGetBuyerDetailsQuery,
  useLazyGetBuildProductsQuery,
  useLazyGetSoldProductsQuery,
} from "../../api/productApi";
import { GetState } from "react-country-state-city";
import { addBuyersHistorySchema } from "../../utils/validationSchema";

function AddPlainPaymentHistory({
  heading,
  addBilling,
  data,
  error,
  isError,
  isSuccess,
  isLoading,
  billData,
  editBilling,
  billingSchema,
  path,
}) {
  const navigate = useNavigate();
  const { branch } = useParams();
  const { state } = useLocation();
  const billDetails = billData?.bill[0];
  const { data: buyerData } = useGetBuyerDetailsQuery(branch);
  const [selectedName, setSelectedName] = useState("");
  const buyerDetails = buyerData?.buyers?.filter(
    (item) => item.name == selectedName
  )[0];

  // Initial State
  const editInitialValue = {
    branch,
    name: billDetails?.name,
    gst_number: billDetails?.gst_number,
    ure_number: billDetails?.ure_number,
    address: billDetails?.address,
    state: billDetails?.state,
    payment_mode: billDetails?.payment_mode,
    paid_amount: billDetails?.paid_amount,
    isGstRegistered: billDetails?.isGstRegistered,
    products: billDetails?.products,
  };
  const initialValues = {
    branch,
    name: selectedName ? buyerDetails.name : "",
    gst_number: heading.includes("GST")
      ? selectedName
        ? buyerDetails.gst_number
        : ""
      : "",
    ure_number: "",
    address: selectedName ? buyerDetails.address : "",
    state: selectedName ? buyerDetails.state : "",
    payment_mode: selectedName ? buyerDetails.payment_mode : "",
    paid_amount: 0,
    isGstRegistered: false,
    show_invoice: false,
    products: [
      {
        branch: branch,
        product_name: "no_product",
        price: "00001",
        qty: "00001",
        hsn_code: "9403",
      },
    ],
  };

  // Formick is use for handle inputs fields and validation
  const formik = useFormik({
    initialValues: heading?.includes("Edit") ? editInitialValue : initialValues,
    validationSchema: addBuyersHistorySchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        if (heading.includes("Edit")) {
          await editBilling({ id: state.id, body: formik.values });
        } else {
          await addBilling(values);
        }
      } catch (err) {
        // console.log(error);
      }
    },
  });

  console.log(formik.errors);

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message);
      navigate(path, { state: { id: data.id } });
    } else if (isError) {
      toast.error(error?.data?.message);
    }
  }, [isSuccess, isError, data?.message, error?.data?.message]);

  const [getSoldProduct, { data: soldData }] = useLazyGetSoldProductsQuery();
  const [getBuildProduct, { data: buildData }] = useLazyGetBuildProductsQuery();

  useEffect(() => {
    getSoldProduct(branch);
    getBuildProduct(branch);
  }, []);

  const getSoldData = heading?.includes("Invoice")
    ? soldData?.products?.reduce((acc, current) => {
        const existingItem = acc.find(
          (item) => item.product_name === current.product_name
        );
        if (existingItem) {
          existingItem.qty += current.qty;
        } else {
          acc.push({ ...current });
        }
        return acc;
      }, [])
    : buildData?.products?.reduce((acc, current) => {
        const existingItem = acc.find(
          (item) => item.product_name === current.product_name
        );
        if (existingItem) {
          existingItem.qty += current.qty;
        } else {
          acc.push({ ...current });
        }
        return acc;
      }, []);

  const options = getSoldData?.reduce((acc, curr) => {
    acc.push({ value: curr.product_name, label: curr.product_name });
    return acc;
  }, []);

  // Get State selector options
  const [states, setStates] = useState([]);
  useEffect(() => {
    GetState(101).then((res) => {
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

  // State handle for unregistered gst
  const handleUnrgisteredGst = () => {
    formik.setFieldValue("isGstRegistered", !formik.values.isGstRegistered);
  };

  const nameOptions = buyerData?.buyers?.reduce((acc, curr) => {
    acc.push({ value: curr.name, label: curr.name });
    return acc;
  }, []);

  const handleName = (option) => {
    formik.setFieldValue("name", option);
    setSelectedName(option);
  };

  // const stockProductArr = getSoldData?.filter((item) =>
  //   formik.values.products?.map((item) => item.product_name).includes(item.product_name)
  // );

  // const userValue = formik.values.products?.reduce((acc, current) => {
  //   const existingItem = acc.find(
  //     (item) => item.product_name === current.product_name
  //   );
  //   if (existingItem) {
  //     existingItem.qty += current.qty == "" ? 0 : current.qty;
  //   } else {
  //     acc.push({ ...current });
  //   }
  //   return acc;
  // }, []);

  // function sortFunc(a, b) {
  //   var sortingArr = userValue?.map((item) => item.product_name);
  //   return (
  //     sortingArr.indexOf(a.product_name) - sortingArr.indexOf(b.product_name)
  //   );
  // }
  // stockProductArr?.sort(sortFunc);

  // const productQuantityAlert = stockProductArr?.reduce((acc, curr, index) => {
  //   if (curr?.qty < userValue[index]?.qty) {
  //     acc.push(
  //       `Availabel ${curr.product_name} stock is ${curr.qty}. Enter ${userValue[index]?.product_name} quantity ${userValue[index]?.qty} exceed the limit. `
  //     );
  //   }
  //   return acc;
  // }, []);

  return (
    <FormikProvider value={formik}>
      <form onSubmit={formik.handleSubmit}>
        <div className="main-content-container">
          <div className="main-content">
            <div className="product-heading d-flex justify-content-between">
              <h1 className="fs-4">{heading}</h1>
            </div>
            <div className=" row ">
              <h2 className="fs-5">Buyer Info</h2>
              {heading.includes("GST") && (
                <div className=" col-12">
                  <input
                    className="form-check-input me-1"
                    type="checkbox"
                    value=""
                    checked={formik.values.isGstRegistered}
                    onChange={handleUnrgisteredGst}
                    id="firstCheckbox"
                  />
                  <label className="form-check-label" htmlFor="firstCheckbox">
                    Unregistered GST
                  </label>
                </div>
              )}
              <div className=" col-4">
                <label htmlFor="name" className="form-label">
                  Buyer Name
                </label>
                <Select
                  styles={{
                    menuList: (styles) => ({
                      ...styles,
                      height: "130px",
                      overflowX: "auto",
                    }),
                  }}
                  options={nameOptions}
                  value={{
                    value: formik.values.name,
                    label: formik.values.name,
                  }}
                  onChange={(option) => handleName(option.value)}
                />
                <ErrorMessage
                  name={`name`}
                  component="div"
                  className="field-error"
                />
              </div>
              {heading.includes("GST") && !formik.values.isGstRegistered && (
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
              )}
              {heading.includes("GST") && formik.values.isGstRegistered && (
                <div className=" col-4">
                  <label htmlFor="name" className="form-label">
                    URP/PAN No.
                  </label>
                  <input
                    type="text"
                    name="ure_number"
                    value={formik.values.ure_number}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="form-control"
                    id="name"
                    placeholder="Enter URP Number"
                  />
                  <ErrorMessage
                    name={`ure_number`}
                    component="div"
                    className="field-error"
                  />
                </div>
              )}

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
              <div className=" col-4">
                <label htmlFor="name" className="form-label">
                  Paid Amount
                </label>
                <input
                  type="number"
                  name="paid_amount"
                  value={formik.values.paid_amount}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="form-control"
                  id="name"
                  placeholder="Enter address"
                />
              </div>
            </div>
            <div>
              <FieldArray
                name="products"
                render={(arrayHelpers) => (
                  <div>
                    {formik.values.products?.map((product, index) => (
                      <div
                        style={{ display: "none" }}
                        key={index}
                        className="row product-fields-container my-2 "
                      >
                        <div className="d-flex justify-content-between">
                          <h2 className="fs-5">Product - {index + 1}</h2>
                          <div className="d-flex">
                            {index >= 1 && (
                              <div onClick={() => arrayHelpers.remove(index)}>
                                <DeleteForeverOutlinedIcon />
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="mb-3 col-4">
                          <label htmlFor="name" className="form-label">
                            Product Name
                          </label>

                          <Select
                            styles={{
                              menuList: (styles) => ({
                                ...styles,
                                maxHeight: "120px",
                                overflowX: "auto",
                              }),
                            }}
                            options={options}
                            value={{
                              value:
                                formik.values.products[index]?.product_name,
                              label:
                                formik.values.products[index]?.product_name,
                            }}
                            onChange={(option) =>
                              formik.setFieldValue(
                                `products[${index}].product_name`,
                                option.value
                              )
                            }
                          />

                          <ErrorMessage
                            name={`products.${index}.product_name`}
                            component="div"
                            className="field-error"
                          />
                        </div>
                        <div className="mb-3 col-4">
                          <label htmlFor="name" className="form-label">
                            Product Price
                          </label>
                          <input
                            type="number"
                            name={`products[${index}].price`}
                            value={formik.values.products[index].price}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="form-control"
                            id="name"
                            placeholder="Enter product price"
                          />
                          <ErrorMessage
                            name={`products.${index}.price`}
                            component="div"
                            className="field-error"
                          />
                        </div>
                        <div className="mb-3 col-4">
                          <label htmlFor="name" className="form-label">
                            Product Qty
                          </label>
                          <input
                            type="number"
                            name={`products[${index}].qty`}
                            value={formik.values.products[index].qty}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="form-control"
                            id="name"
                            placeholder="Enter product qty"
                          />
                          <ErrorMessage
                            name={`products.${index}.qty`}
                            component="div"
                            className="field-error"
                          />
                        </div>
                        <div className="mb-3 col-4">
                          <label htmlFor="name" className="form-label">
                            HSN Code
                          </label>
                          <input
                            type="text"
                            name={`products[${index}].hsn_code`}
                            value={formik.values.products[index].hsn_code}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="form-control"
                            id="name"
                            placeholder="Enter product qty"
                          />
                        </div>
                      </div>
                    ))}

                    <div className="add-product-btn-container">
                      <button type="submit" className="btn btn-bg  ">
                        {isLoading ? <Spinner size="sm" /> : "Submit"}
                      </button>
                      {/* <button
                        type="button"
                        className="btn btn-bg mx-2 "
                        onClick={() =>
                          arrayHelpers.push({
                            branch: branch,
                            product_name: "",
                            price: "",
                            qty: "",
                            description: "",
                          })
                        }
                      >
                        Add More
                      </button> */}

                      {/* <button
                        type="button"
                        className="btn bg-success text-light  "
                      >
                        Total Amount:
                        {formik?.values?.products?.reduce(
                          (acc, curr) => (acc += curr.price * curr.qty),
                          0
                        )}{" "}
                        Rs
                      </button> */}
                    </div>
                  </div>
                )}
              />
            </div>
          </div>
        </div>
      </form>
    </FormikProvider>
  );
}

export default AddPlainPaymentHistory;
