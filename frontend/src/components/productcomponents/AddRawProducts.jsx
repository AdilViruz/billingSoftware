/* eslint-disable react/prop-types */
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { useFormik, FieldArray, FormikProvider, ErrorMessage } from "formik";
import { useLocation, useParams } from "react-router-dom";
import {
  buildProductSchema,
  productSchema,
  purchaseSchema,
} from "../../utils/validationSchema";
import Spinner from "react-bootstrap/esm/Spinner";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import {
  useGetPurchaseDetailsQuery,
  useLazyGetBuildProductsQuery,
  useLazyGetRawMaterialsQuery,
} from "../../api/productApi";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { GetState } from "react-country-state-city";

function AddRawProducts({
  heading,
  addProduct,
  data,
  error,
  isError,
  isSuccess,
  isLoading,
  path,
  rawData
}) {
 
  
  const billDetails = rawData?.products[0];
  const navigate = useNavigate();
  const { branch } = useParams();
  const { state } = useLocation();
  const [states, setStates] = useState([]);
  const [getBuidProduct, { data: buildData }] = useLazyGetBuildProductsQuery();
  const [getRawMaterial, { data: materialData }] =
    useLazyGetRawMaterialsQuery();
  const { data: purchaseData } = useGetPurchaseDetailsQuery(branch);
  const [selectedName, setSelectedName] = useState("");
  const purchaseDetails = purchaseData?.purchases?.filter(
    (item) => item.name == selectedName
  )[0];

  let totalValues = 0;

  console.log(purchaseDetails?.address);
  console.log(selectedName);
  // Initial State
  const editInitialValue = {
    branch,
    name: billDetails?.name,
  
    address: billDetails?.address,
    state: billDetails?.state,
    payment_mode: billDetails?.payment_mode,
    paid_amount: billDetails?.paid_amount,
    total_amount: billDetails?.total_amount,
    products: billDetails?.products,
  };
  const initialValues = {
    branch,
    name: selectedName ? purchaseDetails.name : "",
    address: selectedName ? purchaseDetails.address : "",
    state: selectedName ? purchaseDetails.state : "",
    payment_mode: selectedName ? purchaseDetails.payment_mode : "",
    products: [
      { branch: branch, product_name: "", price: "", qty: "", hsn_code: "" },
    ],
    used_materials: [{ branch, material_name: "", qty: "" }],
    total_amount: totalValues ? totalValues : 0,
    paid_amount:0,
  };

  // Formick is use for handle inputs fields and validation
  const formik = useFormik({
    initialValues: heading?.includes("Edit") ? editInitialValue : initialValues,
    validationSchema: heading.includes("Build")
      ? buildProductSchema
      : purchaseSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        if (heading.includes("Edit")) {
          await addProduct({ id: state.id, body: formik.values });
        } else {
         
          await addProduct(values);

          // await addProduct(values?.products);
        }
      } catch (err) {
        // console.log(error);
      }
    },
  });


  totalValues = formik?.values?.products?.reduce(
    (acc, curr) => (acc += curr.price * curr.qty),
    0
  );

  useEffect(() => {
    formik.setFieldValue("total_amount", totalValues);
  }, [totalValues]);

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message);
      navigate(path);
    } else if (isError) {
      toast.error(error?.data?.message);
    }
  }, [isSuccess, isError, data?.message, error?.data?.message]);

  useEffect(() => {
    if (heading.includes("Sold")) {
      getBuidProduct(branch);
    }
  }, []);

  // Get State selector options

  useEffect(() => {
    GetState(101).then((res) => {
      setStates(res);
    });
  }, []);

  useEffect(() => {
    if (heading.includes("Build")) {
      getRawMaterial(branch);
    }
  }, []);

  const options = buildData?.products.reduce((acc, curr) => {
    acc.push({ value: curr.product_name, label: curr.product_name });
    return acc;
  }, []);

  const materialOptions = materialData?.products.reduce((acc, curr) => {
    acc.push({ value: curr.product_name, label: curr.product_name });
    return acc;
  }, []);

  const stockProductArr = buildData?.products.filter((item) =>
    formik.values.products
      .map((item) => item.product_name)
      .includes(item.product_name)
  );

  const userValue = formik.values.products?.reduce((acc, current) => {
    const existingItem = acc.find(
      (item) => item.product_name === current.product_name
    );
    if (existingItem) {
      existingItem.qty += current.qty == "" ? 0 : current.qty;
    } else {
      acc.push({ ...current });
    }
    return acc;
  }, []);

  const nameOptions = purchaseData?.purchases?.reduce((acc, curr) => {
    acc.push({ value: curr.name, label: curr.name });
    return acc;
  }, []);

  const satetOptions = states?.reduce((acc, curr) => {
    acc.push({ value: curr.name, label: curr.name });
    return acc;
  }, []);

  function sortFunc(a, b) {
    var sortingArr = userValue?.map((item) => item.product_name);
    return (
      sortingArr.indexOf(a.product_name) - sortingArr.indexOf(b.product_name)
    );
  }
  stockProductArr?.sort(sortFunc);

  const productQuantityAlert = stockProductArr?.reduce((acc, curr, index) => {
    if (curr?.qty < userValue[index]?.qty) {
      acc.push(
        `Availabel ${curr.product_name} stock is ${curr.qty}. Enter ${userValue[index]?.product_name} quantity ${userValue[index]?.qty} exceed the limit. `
      );
    }
    return acc;
  }, []);

  const productPriceAlert = stockProductArr?.reduce((acc, curr, index) => {
    if (userValue[index]?.price && curr?.price !== userValue[index]?.price) {
      acc.push(
        `${curr.product_name} price is ${curr.price}Rs Enter price ${userValue[index]?.price}Rs. Are you ok with this price.`
      );
    }
    return acc;
  }, []);

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

  const handleName = (option) => {
    formik.setFieldValue("name", option);
    setSelectedName(option);
  };

  return (
    <div className="main-content-container">
      <div className="main-content">
        <div className="alert-container">
          <div className="alert"></div>
        </div>
        <div className="product-heading">
          <h1 className="fs-4">{heading}</h1>
        </div>

        <FormikProvider value={formik}>
          <form onSubmit={formik.handleSubmit} className="w-100">
            <div>
              <FieldArray
                name="products"
                render={(arrayHelpers) => (
                  <div>
                    {/* Adils Code */}
                    <div className=" row ">
                      <h2 className="fs-5">Buyer Info</h2>

                      <div className=" col-4">
                        <label htmlFor="name" className="form-label">
                          Purchase Name
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
                      {heading?.includes("Invoice") && (
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
                      )}
                    </div>
                    <div className="add-product">
                      {formik.values.products?.map((product, index) => (
                        <div
                          key={index}
                          className="row product-fields-container my-2"
                        >
                          {productQuantityAlert
                            ?.filter((item) =>
                              item.includes(
                                formik.values.products[index].product_name
                              )
                            )
                            .map((item, key) => (
                              <Stack
                                key={key}
                                sx={{ width: "100%" }}
                                style={{ marginBottom: "10px" }}
                                spacing={2}
                              >
                                <Alert severity="error">{item}</Alert>
                              </Stack>
                            ))}
                          {productPriceAlert
                            ?.filter((item) =>
                              item.includes(
                                formik.values.products[index].product_name
                              )
                            )
                            .map((item, key) => (
                              <Stack
                                key={key}
                                sx={{ width: "100%" }}
                                spacing={2}
                              >
                                <Alert severity="info">{item}</Alert>
                              </Stack>
                            ))}
                          <div className="d-flex justify-content-between">
                            <h2 className="fs-5">Product - {index + 1}</h2>
                            <div className="d-flex">
                              {index >= 1 && (
                                <div
                                  className="btn btn-danger  mx-1"
                                  onClick={() => arrayHelpers.remove(index)}
                                >
                                  <DeleteForeverOutlinedIcon />
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="mb-3 col-4">
                            <label htmlFor="name" className="form-label">
                              Product Name
                            </label>
                            {heading?.includes("Sold") ? (
                              <Select
                                styles={{
                                  menuList: (styles) => ({
                                    ...styles,
                                    maxHeight: "120px",
                                    overflowX: "auto",
                                  }),
                                }}
                                options={options}
                                defaultValue={
                                  buildData?.products[0]?.product_name
                                }
                                onChange={(option) =>
                                  formik.setFieldValue(
                                    `products[${index}].product_name`,
                                    option.value
                                  )
                                }
                              />
                            ) : (
                              <input
                                type="text"
                                name={`products[${index}].product_name`}
                                value={
                                  formik.values.products[index].product_name
                                }
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="form-control"
                                id="name"
                                placeholder="Enter product name"
                              />
                            )}
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
                        </div>
                      ))}
                    </div>
                    <div className="add-product-btn-container">
                      <button
                        type="submit"
                        disabled={
                          productQuantityAlert?.length > 0 ? true : false
                        }
                        className="btn btn-bg  "
                      >
                        {isLoading ? <Spinner size="sm" /> : "Submit"}
                      </button>
                      <button
                        type="button"
                        className="btn btn-bg mx-2 "
                        onClick={() =>
                          arrayHelpers.push({
                            branch: branch,
                            product_name: "",
                            price: "",
                            qty: "",
                          })
                        }
                      >
                        Add More
                      </button>
                      <button
                        type="button"
                        className="btn bg-success text-light  "
                      >
                        Total Amount:
                        {formik?.values?.products?.reduce(
                          (acc, curr) => (acc += curr.price * curr.qty),
                          0
                        )}{" "}
                        Rs
                      </button>
                    </div>
                  </div>
                )}
              />
              {heading?.includes("Build") && (
                <div>
                  <h2 className="fs-5">Add used materials</h2>
                  <FieldArray
                    name="used_materials"
                    render={(arrayHelpers) => (
                      <div className="">
                        <div className="add-product">
                          {formik.values.used_materials?.map(
                            (product, index) => (
                              <div
                                key={index}
                                className="row product-fields-container my-2"
                              >
                                <div className="mb-3 col-4">
                                  <label htmlFor="name" className="form-label">
                                    Material Name
                                  </label>

                                  <Select
                                    styles={{
                                      menuList: (styles) => ({
                                        ...styles,
                                        maxHeight: "120px",
                                        overflowX: "auto",
                                      }),
                                    }}
                                    options={materialOptions}
                                    defaultValue={
                                      materialData?.products[0]?.product_name
                                    }
                                    onChange={(option) =>
                                      formik.setFieldValue(
                                        `used_materials[${index}].material_name`,
                                        option.value
                                      )
                                    }
                                  />

                                  <ErrorMessage
                                    name={`used_materials[${index}].material_name`}
                                    component="div"
                                    className="field-error"
                                  />
                                </div>

                                <div className="mb-3 col-4">
                                  <label htmlFor="name" className="form-label">
                                    Material Qty
                                  </label>
                                  <input
                                    type="number"
                                    name={`used_materials[${index}].qty`}
                                    value={
                                      formik.values.used_materials[index].qty
                                    }
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className="form-control"
                                    id="name"
                                    placeholder="Enter product qty"
                                  />
                                  <ErrorMessage
                                    name={`used_materials[${index}].qty`}
                                    component="div"
                                    className="field-error"
                                  />
                                </div>
                                <div className=" col-4">
                                  <div className="form-label ">
                                    <br />
                                  </div>
                                  {index >= 1 && (
                                    <div
                                      className="btn btn-danger  mx-1 fw-bold "
                                      onClick={() => arrayHelpers.remove(index)}
                                    >
                                      -
                                    </div>
                                  )}
                                </div>
                              </div>
                            )
                          )}
                        </div>

                        <button
                          type="button"
                          className="btn btn-success mb-4 fw-bold "
                          onClick={() =>
                            arrayHelpers.push({
                              branch: branch,
                              material_name: "",
                              qty: "",
                            })
                          }
                        >
                          +
                        </button>
                      </div>
                    )}
                  />
                </div>
              )}
            </div>
          </form>
        </FormikProvider>
      </div>
    </div>
  );
}

export default AddRawProducts;
