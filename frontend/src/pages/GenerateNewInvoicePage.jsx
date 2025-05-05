import { useAddBillingMutation } from "../api/productApi";
// import AddInvoice from "../components/billingcomponents/AddInvoice"
import { useParams } from "react-router-dom";
import AddInvoice from "../components/billingcomponents/AddInvoice";
import { withoutGstBillingSchema } from "../utils/validationSchema";

function GenerateNewInvoicePage() {
  const { branch } = useParams();

  const [addBilling, { data, error, isError, isSuccess, isLoading }] =
    useAddBillingMutation();
  return (
    <div>
      <AddInvoice
        heading={"Generate New Invoice"}
        addBilling={addBilling}
        data={data}
        error={error}
        isError={isError}
        isSuccess={isSuccess}
        isLoading={isLoading}
        billingSchema={withoutGstBillingSchema}
        path={`/generate-invoice/${branch}`}
      />
    </div>
  );
}

export default GenerateNewInvoicePage;
