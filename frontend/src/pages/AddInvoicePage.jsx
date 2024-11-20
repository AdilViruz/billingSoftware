import { useAddBillingMutation } from "../api/productApi";
// import AddInvoice from "../components/billingcomponents/AddInvoice"
import { useParams } from "react-router-dom";
import AddInvoice from "../components/billingcomponents/AddInvoice";
import { billingSchema } from "../utils/validationSchema";
function AddInvoicePage() {
  const { branch } = useParams();

  const [addBilling, { data, error, isError, isSuccess, isLoading }] =
    useAddBillingMutation();
  return (
    <div>
      <AddInvoice 
      heading={'Add GST Invoice'}
      addBilling={addBilling}
      data={data}
      error={error}
      isError={isError}
      isSuccess={isSuccess}
      isLoading={isLoading}
      billingSchema={billingSchema}
      path={`/gst-invoice/${branch}`}
      />
    </div>
  )
}

export default AddInvoicePage
