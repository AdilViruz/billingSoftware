import {
  useDeleteRawMaterialMutation,
  useGetRawMaterialsQuery,
  useLazyGetSingleRawMaterialQuery,
  useUpdateRawMaterialMutation,
} from "../api/productApi";
import ListProducts from "../components/productcomponents/ListProducts";
import { useParams } from "react-router-dom";
import ProductModals from "../modals/ProductModals";
import { useState } from "react";
import DeleteAlertModal from "../modals/DeleteAlertModal";

function RawMaterialsPage() {
  const { branch } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [productId, setProductId] = useState("");

  const { data, isLoading } = useGetRawMaterialsQuery(branch);
  const [singleBuildProduct, { data: singleData }] =
    useLazyGetSingleRawMaterialQuery();

  const [
    updateMaterial,
    { data: updateData, error, isError, isSuccess, isLoading: isUpdateLoading },
  ] = useUpdateRawMaterialMutation();
  const [
    deleteBuildProduct,
    {
      data: deleteData,
      error: deleteError,
      isError: isDeleteError,
      isSuccess: isDeleteSuccess,
      isLoading: isDeleteLoading,
    },
  ] = useDeleteRawMaterialMutation();

  return (
    <div>
      <ListProducts
        title="Raw Materials"
        data={data}
        isLoading={isLoading}
        setShowModal={setShowModal}
        setEditModal={setEditModal}
        setProductId={setProductId}
        setDeleteModal={setDeleteModal}
        singleBuildProduct={singleBuildProduct}
        path={`/add-raw-materials/${branch}`}
      />

      {/* View product */}
      <ProductModals
        heading="View Raw Material"
        show={showModal}
        onHide={() => setShowModal(false)}
        productId={productId}
        data={singleData}
        disable={true}
      />

      {/* Edit Product */}
      <ProductModals
        heading="Edit Raw Material"
        show={editModal}
        onHide={() => setEditModal(false)}
        productId={productId}
        data={singleData}
        disable={false}
        updateProduct={updateMaterial}
        updateData={updateData}
        error={error}
        isError={isError}
        isSuccess={isSuccess}
        isUpdateLoading={isUpdateLoading}
        setEditModal={setEditModal}
      />

      {/* Delete Product */}
      <DeleteAlertModal
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

export default RawMaterialsPage;
