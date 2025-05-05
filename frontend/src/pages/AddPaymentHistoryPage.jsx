import { useAddBillingMutation } from "../api/productApi";
import { useParams } from "react-router-dom";
import { billingSchema } from "../utils/validationSchema";
import AddPaymentHistory from "../components/paymenthistory/AddPaymentHistory";

function AddPaymentHistoryPage() {
  const { branch } = useParams();

  const [addBilling, { data, error, isError, isSuccess, isLoading }] =
    useAddBillingMutation();
  return (
    <div>
      <AddPaymentHistory
        heading={"Add Buyers Payment"}
        addBilling={addBilling}
        data={data}
        error={error}
        isError={isError}
        isSuccess={isSuccess}
        isLoading={isLoading}
        billingSchema={billingSchema}
        path={`/payment-history/${branch}`}
      />
    </div>
  );
}

export default AddPaymentHistoryPage;
