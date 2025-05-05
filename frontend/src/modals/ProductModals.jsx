/* eslint-disable react/prop-types */
import { useFormik } from "formik";
import { useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import Select from 'react-select';

import { useParams } from "react-router-dom";
import { useLazyGetBuildProductsQuery } from "../api/productApi";

function ProductModals(props) {

const {branch} = useParams()
const data = props.data?.products[0]

// Initial State 
const initialValues = {
    id:data?._id,
    branch:data?.branch,
    product_name:data?.product_name,
    price:data?.price,
    qty:data?.qty,
    description:data?.description,

  }

   // Formick is use for handle inputs fields and validation 
   const {values,setFieldValue,handleChange,handleBlur,handleSubmit} = useFormik({
    initialValues,
    // validationSchema:registrationSchema,
    enableReinitialize:true,
    onSubmit:async (values) => {
      try{
        await props.updateProduct(values)
       }catch(err){
         // console.log(error);
       }
    },
  });
   
  useEffect(()=>{
    if(props.isSuccess){
      toast.success(props.updateData?.message)
      props.setEditModal(false)
     }else if(props.isError){
      toast.error(props.error?.data.message)
      }
  },[props.isSuccess, props.isError, props.updateData?.message, ])

  const [getBuidProduct,{data:buildData}] = useLazyGetBuildProductsQuery()


  useEffect(()=>{
  if(props.heading.includes('Sold')){
  getBuidProduct(branch)
  }
  },[])
  
  const options = buildData?.products.reduce((acc,curr)=>{
    acc.push( { value: curr.product_name, label: curr.product_name })
  return acc
  },[])




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
       
      <div  className="add-product">
        <form onSubmit={handleSubmit} className="row product-fields-container my-2">
          <div className="d-flex justify-content-between">
           
            <div className="d-flex"></div>
          </div>
          <div className="mb-3 col-4">
            <label htmlFor="name" className="form-label">
              Product Name
            </label>
            {props.heading?.includes('Sold')?
                          <Select
                  styles={ {menuList: (styles) => ({ ...styles, height:"130px",overflowX:'auto' })}}
                          options={options}
                          value={{value:values.product_name,label:values.product_name}}
                          onChange={(option)=>setFieldValue(`product_name`,option.value)}
                         isDisabled={props.disable}
                          />:
            <input
              type="text"
              name="product_name"
              value={values.product_name}
              onChange={handleChange}
              onBlur={handleBlur}
              className="form-control"
              id="name"
              placeholder="Enter product name"
              disabled={props.disable}
            />}
          </div>
          <div className="mb-3 col-4">
            <label htmlFor="name" className="form-label">
              Product Price
            </label>
            <input
              type="number"
              name="price"
              value={values.price}
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
              Product Qty
            </label>
            <input
              type="number"
              name="qty"
              value={values.qty}
              onChange={handleChange}
              onBlur={handleBlur}
              className="form-control"
              id="name"
              placeholder="Enter product qty"
              disabled={props.disable}
            />
          </div>
          <div className="mb-3 col-12">
            <label htmlFor="name" className="form-label">
              Product Description
            </label>
            <textarea
              type="text"
              name="description"
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
              className="form-control"
              id="name"
              placeholder="Enter product description"
              disabled={props.disable}
            />
          <button className=" mt-2 btn btn-bg" disabled={props.disable}>Submit</button>
          </div>
        </form>
        </div>
        
      </Modal.Body>
    </Modal>
  );
}

export default ProductModals;
