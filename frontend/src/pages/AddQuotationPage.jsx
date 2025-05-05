import { useAddQuotationMutation } from "../api/productApi";
// import AddInvoice from "../components/billingcomponents/AddInvoice"
import { useParams } from "react-router-dom";
import AddInvoice from "../components/billingcomponents/AddInvoice";
import { withoutGstBillingSchema } from "../utils/validationSchema";
function AddQuotationPage() {
  const { branch } = useParams();

  const [addQuotation, { data, error, isError, isSuccess, isLoading }] =
    useAddQuotationMutation();
  return (
    <div>
      <AddInvoice
        heading={"Add Quotation"}
        addBilling={addQuotation}
        data={data}
        error={error}
        isError={isError}
        isSuccess={isSuccess}
        isLoading={isLoading}
        billingSchema={withoutGstBillingSchema}
        path={`/quotation/${branch}`}
      />
    </div>
  );
}

export default AddQuotationPage;
