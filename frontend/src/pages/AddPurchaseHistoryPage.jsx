import { useAddBillingMutation, useAddRawMaterialsMutation } from "../api/productApi";
import { useParams } from "react-router-dom";
import { billingSchema } from "../utils/validationSchema";
import AddPurchaseHistory from "../components/paymenthistory/AddPurchaseHistory";

function AddPurchaseHistoryPage() {
  const { branch } = useParams();

  const [addBilling, { data, error, isError, isSuccess, isLoading }] =
    useAddRawMaterialsMutation();
  return (
    <div>
      <AddPurchaseHistory
        heading={"Add Buyers Payment"}
        addBilling={addBilling}
        data={data}
        error={error}
        isError={isError}
        isSuccess={isSuccess}
        isLoading={isLoading}
        billingSchema={billingSchema}
        path={`/purchase-payment/${branch}`}
      />
    </div>
  );
}

export default AddPurchaseHistoryPage;
