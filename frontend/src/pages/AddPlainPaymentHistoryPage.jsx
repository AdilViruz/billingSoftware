import { useAddBillingMutation } from "../api/productApi";
import { useParams } from "react-router-dom";
import { billingSchema } from "../utils/validationSchema";
import AddPlainPaymentHistory from "../components/paymenthistory/AddPlainPaymentHistory";

function AddPlainPaymentHistoryPage() {
  const { branch } = useParams();

  const [addBilling, { data, error, isError, isSuccess, isLoading }] =
    useAddBillingMutation();
  return (
    <div>
      <AddPlainPaymentHistory
        heading={"Add Plain Buyers Payment"}
        addBilling={addBilling}
        data={data}
        error={error}
        isError={isError}
        isSuccess={isSuccess}
        isLoading={isLoading}
        billingSchema={billingSchema}
        path={`/plain-payment-history/${branch}`}
      />
    </div>
  );
}

export default AddPlainPaymentHistoryPage;
