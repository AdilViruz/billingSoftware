import {
  useDeleteSoldProductsMutation,
  useGetSoldProductsQuery,
  useLazyGetSingleSoldProductsQuery,
  useUpdateSoldProductsMutation,
} from "../api/productApi";
import ListProducts from "../components/productcomponents/ListProducts";
import { useParams } from "react-router-dom";
import ProductModals from "../modals/ProductModals";
import { useState } from "react";
import DeleteAlertModal from "../modals/DeleteAlertModal";

function SoldProductsPage() {
  const { branch } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [productId, setProductId] = useState("");

  const { data, isLoading } = useGetSoldProductsQuery(branch);

  const [singleBuildProduct, { data: singleData, isLoading: lll }] =
    useLazyGetSingleSoldProductsQuery();

  const [
    updateSoldProduct,
    { data: updateData, error, isError, isSuccess, isLoading: isUpdateLoading },
  ] = useUpdateSoldProductsMutation();
  const [
    deleteBuildProduct,
    {
      data: deleteData,
      error: deleteError,
      isError: isDeleteError,
      isSuccess: isDeleteSuccess,
      isLoading: isDeleteLoading,
    },
  ] = useDeleteSoldProductsMutation();

  return (
    <div>
      <ListProducts
        title="Sold Products"
        data={data}
        isLoading={isLoading}
        setShowModal={setShowModal}
        setEditModal={setEditModal}
        setProductId={setProductId}
        setDeleteModal={setDeleteModal}
        singleBuildProduct={singleBuildProduct}
        path={`/add-sold-products/${branch}`}
      />

      {/* View product */}
      <ProductModals
        heading="View Sold product"
        show={showModal}
        onHide={() => setShowModal(false)}
        productId={productId}
        data={singleData}
        disable={true}
      />

      {/* Edit Product */}
      <ProductModals
        heading="Edit Sold product"
        show={editModal}
        onHide={() => setEditModal(false)}
        productId={productId}
        data={singleData}
        disable={false}
        updateProduct={updateSoldProduct}
        updateData={updateData}
        error={error}
        isError={isError}
        isSuccess={isSuccess}
        isUpdateLoading={isUpdateLoading}
        setEditModal={setEditModal}
        isL={lll}
      />

      {/* Delete Product */}
      <DeleteAlertModal
        heading="Delete Sold Product"
        show={deleteModal}
        setShow={setDeleteModal}
        onHide={() => setDeleteModal(false)}
        deleteBuildProduct={deleteBuildProduct}
        data={deleteData}
        error={deleteError}
        isError={isDeleteError}
        isSuccess={isDeleteSuccess}
        isLoading={isDeleteLoading}
        productId={productId}
      />
    </div>
  );
}

export default SoldProductsPage;
