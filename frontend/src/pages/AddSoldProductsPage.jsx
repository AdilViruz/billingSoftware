import AddProducts from "../components/productcomponents/AddProducts";
import { useAddSoldProductsMutation } from "../api/productApi";

import { useParams } from "react-router-dom";

function AddSoldProductsPage() {
  const { branch } = useParams();

  const [addSoldProduct, { data, error, isError, isSuccess, isLoading }] =
    useAddSoldProductsMutation();

  return (
    <div>
      <AddProducts
        heading="Add Sold Products"
        addProduct={addSoldProduct}
        data={data}
        error={error}
        isError={isError}
        isSuccess={isSuccess}
        isLoading={isLoading}
        path={`/sold-products/${branch}`}
      />
    </div>
  );
}

export default AddSoldProductsPage;
