import {
    useDeleteBuyerDetailsMutation,
    useGetBuyerDetailsQuery,
    useLazyGetSingleBuyerDetailsQuery,
    useUpdateBuyerDetailsMutation,
  } from "../api/productApi";
  import { useParams } from "react-router-dom";
  import { useState } from "react";
  import DeleteAlertModal from "../modals/DeleteAlertModal";
import ListBuyerDetails from "../components/buyerdetails/ListBuyerDetails";
import BuyerEditModal from "../modals/BuyerEditModal";
  
  function BuyerDetailsPage() {
    const { branch } = useParams();
    const [showModal, setShowModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [productId, setProductId] = useState("");
  
    const { data, isLoading } = useGetBuyerDetailsQuery(branch);
    const [singleBuyerDetails,{ data: singleData }] = useLazyGetSingleBuyerDetailsQuery();
  
    const [
      updateBuyerDetails,
      { data: updateData, error, isError, isSuccess, isLoading: isUpdateLoading },
    ] = useUpdateBuyerDetailsMutation();
    const [
      deleteBuyerDetails,
      {
        data: deleteData,
        error: deleteError,
        isError: isDeleteError,
        isSuccess: isDeleteSuccess,
        isLoading: isDeleteLoading,
      },
    ] = useDeleteBuyerDetailsMutation();
  
    return (
      <div>
        <ListBuyerDetails
          title="Buyer Details"
          data={data}
          isLoading={isLoading}
          setShowModal={setShowModal}
          setEditModal={setEditModal}
          setProductId={setProductId}
          setDeleteModal={setDeleteModal}
          singleBuildProduct={singleBuyerDetails}
          path={`/add-buyer/${branch}`}
        />
  
        {/* View product */}
        <BuyerEditModal
          heading="View buyer details"
          show={showModal}
          onHide={() => setShowModal(false)}
          productId={productId}
          data={singleData}
          disable={true}
        />
  
        {/* Edit Product */}
        <BuyerEditModal
          heading="Edit buyer details"
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
         deleteBuildProduct={deleteBuyerDetails}
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
  
  export default BuyerDetailsPage;
  