import {
  useDeletePurchaseDetailsMutation,
  useGetPurchaseDetailsQuery,
  useLazyGetSinglePurchaseDetailsQuery,
  useUpdatePurchaseDetailsMutation,
} from "../api/productApi";
import { useParams } from "react-router-dom";
import { useState } from "react";
import DeleteAlertModal from "../modals/DeleteAlertModal";
import PurchaseEditModal from "../modals/PurchaseEditModal";
import ListPurchaseDetails from "../components/purchasedetails/ListPurchaseDetails";

function PurchaseDetailsPage() {
  const { branch } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [productId, setProductId] = useState("");

  const { data, isLoading } = useGetPurchaseDetailsQuery(branch);
  const [singleBuyerDetails, { data: singleData }] =
    useLazyGetSinglePurchaseDetailsQuery();

  const [
    updateBuyerDetails,
    { data: updateData, error, isError, isSuccess, isLoading: isUpdateLoading },
  ] = useUpdatePurchaseDetailsMutation();
  const [
    deletePurchaseDetails,
    {
      data: deleteData,
      error: deleteError,
      isError: isDeleteError,
      isSuccess: isDeleteSuccess,
      isLoading: isDeleteLoading,
    },
  ] = useDeletePurchaseDetailsMutation();

  return (
    <div>
      <ListPurchaseDetails
        title="Purchase Details"
        data={data}
        isLoading={isLoading}
        setShowModal={setShowModal}
        setEditModal={setEditModal}
        setProductId={setProductId}
        setDeleteModal={setDeleteModal}
        singleBuildProduct={singleBuyerDetails}
        path={`/add-purchase/${branch}`}
      />

      {/* View product */}
      <PurchaseEditModal
        heading="View purchase details"
        show={showModal}
        onHide={() => setShowModal(false)}
        productId={productId}
        data={singleData}
        disable={true}
      />

      {/* Edit Product */}
      <PurchaseEditModal
        heading="Edit purchase details"
        show={editModal}
        onHide={() => setEditModal(false)}
        productId={productId}
        data={singleData}
        disable={false}
        updateProduct={updateBuyerDetails}
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
        deleteBuildProduct={deletePurchaseDetails}
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

export default PurchaseDetailsPage;
