


import { useEffect } from "react";
import {  useLazySingleQuotationQuery,  useUpdateQuotationMutation } from "../api/productApi";
import AddInvoice from "../components/billingcomponents/AddInvoice"
import { useParams,useLocation } from "react-router-dom";
import { withoutGstBillingSchema } from "../utils/validationSchema";
function EditQuotationPage() {
  const { branch } = useParams();
  const {state} = useLocation()
  const [singleQuotation,{data:quotationData}] = useLazySingleQuotationQuery()
  const [editQuotation, { data, error, isError, isSuccess, isLoading }] =
    useUpdateQuotationMutation();

useEffect(()=>{
    singleQuotation({branch,id:state.id})
},[])


  return (
    <div>
      <AddInvoice 
      heading={'Edit Plain Invoice'}
      editBilling={editQuotation}
      data={data}
      error={error}
      isError={isError}
      isSuccess={isSuccess}
      isLoading={isLoading}
      billData={quotationData}
      billingSchema={withoutGstBillingSchema}
      path={`/quotation/${branch}`}
      />
    </div>
  )
}

export default EditQuotationPage


