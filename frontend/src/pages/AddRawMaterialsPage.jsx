import AddProducts from "../components/productcomponents/AddProducts";
import { useAddRawMaterialsMutation } from "../api/productApi";

import { useParams } from "react-router-dom";
import AddRawProducts from "../components/productcomponents/AddRawProducts";

function AddRawMaterialsPage() {
  const { branch } = useParams();

  const [addRawMaterials, { data, error, isError, isSuccess, isLoading }] =
    useAddRawMaterialsMutation();

  return (
    <div>
      <AddRawProducts
        heading="Add Raw Materials"
        addProduct={addRawMaterials}
        data={data}
        error={error}
        isError={isError}
        isSuccess={isSuccess}
        isLoading={isLoading}
        path={`/raw-materials/${branch}`}
      />
    </div>
  );
}

export default AddRawMaterialsPage;
