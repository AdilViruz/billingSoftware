import { useAddBuyerDetailsMutation } from "../api/productApi";
import AddBuyerDetails from "../components/buyerdetails/AddBuyerDetails"
import { useParams } from "react-router-dom";

function AddBuyerPage() {
    const { branch } = useParams();
    const [addBuyerDetails, { data, error, isError, isSuccess, isLoading }] =
    useAddBuyerDetailsMutation();
  return (
    <div>
      <AddBuyerDetails
      heading='Add Buyer'
      addBuyer={addBuyerDetails}
      data={data}
      error={error}
      isError={isError}
      isSuccess={isSuccess}
      isLoading={isLoading}
      path={`/buyer-details/${branch}`}
      />
    </div>
  )
}

export default AddBuyerPage
