import AddProducts from "../components/productcomponents/AddProducts";
import { useAddBuildProductsMutation } from "../api/productApi";

import { useParams } from "react-router-dom";

function AddBuildProductsPage() {
  const { branch } = useParams();

  const [addBuildProduct, { data, error, isError, isSuccess, isLoading }] =
    useAddBuildProductsMutation();

  return (
    <div>
      <AddProducts
        heading="Add Build Products"
        addProduct={addBuildProduct}
        data={data}
        error={error}
        isError={isError}
        isSuccess={isSuccess}
        isLoading={isLoading}
        path={`/build-products/${branch}`}
      />
    </div>
  );
}

export default AddBuildProductsPage;
