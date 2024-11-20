import { useAddPurchaseDetailsMutation } from "../api/productApi";
import { useParams } from "react-router-dom";
import AddPurchaseDetails from "../components/purchasedetails/AddPurchaseDetails";

function AddPurchasePage() {
  const { branch } = useParams();
  const [addPurchaseDetails, { data, error, isError, isSuccess, isLoading }] =
    useAddPurchaseDetailsMutation();
  return (
    <div>
      <AddPurchaseDetails
        heading="Add Purchase"
        addPurchase={addPurchaseDetails}
        data={data}
        error={error}
        isError={isError}
        isSuccess={isSuccess}
        isLoading={isLoading}
        path={`/purchase-details/${branch}`}
      />
    </div>
  );
}

export default AddPurchasePage;
