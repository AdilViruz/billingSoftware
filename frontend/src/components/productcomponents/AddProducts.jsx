/* eslint-disable react/prop-types */
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { useFormik, FieldArray, FormikProvider, ErrorMessage } from "formik";
import { useParams } from "react-router-dom";
import {
  buildProductSchema,
  productSchema,
} from "../../utils/validationSchema";
import Spinner from "react-bootstrap/esm/Spinner";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import {
  useLazyGetBuildProductsQuery,
  useLazyGetRawMaterialsQuery,
} from "../../api/productApi";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

function AddProducts({
  heading,
  addProduct,
  data,
  error,
  isError,
  isSuccess,
  isLoading,
  path,
}) {
  const navigate = useNavigate();
  const { branch } = useParams();

  // Initial State
  const initialValues = {
    products: [{ branch: branch, product_name: "", price: "", qty: "" }],
    used_materials: [{ branch, material_name: "", qty: "" }],
  };

  // Formick is use for handle inputs fields and validation
  const formik = useFormik({
    initialValues,
    validationSchema: heading.includes("Build")
      ? buildProductSchema
      : productSchema,
    onSubmit: async (values) => {
      try {
        if (heading.includes("Build")) {
          await addProduct(values);
        } else {
          await addProduct(values?.products);
        }
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

  const [getBuidProduct, { data: buildData }] = useLazyGetBuildProductsQuery();
  const [getRawMaterial, { data: materialData }] =
    useLazyGetRawMaterialsQuery();

  useEffect(() => {
    if (heading.includes("Sold")) {
      getBuidProduct(branch);
    }
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

  const materialOptions = materialData?.products
    .map((item) => item.products)
    .flat(1)
    .reduce((acc, curr) => {
      acc.push({ value: curr.product_name, label: curr.product_name });
      return acc;
    }, []);

  // const isMultiProdcutSame = formik.values.products
  //   .map((item) => item.product_name.split(" ").join("").toLowerCase())
  //   .some((item, index, arr) => arr.indexOf(item) !== index);

  // useEffect(() => {
  //   if (
  //     isMultiProdcutSame &&
  //     formik.values.products.map((item) => item.product_name).join("")
  //   ) {
  //     toast.error("Can not create same multiple products", {
  //       position: "top-center",
  //       autoClose: !isMultiProdcutSame,
  //       closeButton: false,
  //     });
  //   } else {
  //     toast.dismiss();
  //   }
  // }, [isMultiProdcutSame]);

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
                    <div className="add-product">
                      {formik.values.products.map((product, index) => (
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

export default AddProducts;
