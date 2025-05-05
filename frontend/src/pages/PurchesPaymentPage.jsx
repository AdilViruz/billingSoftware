import {
   
  
    useDeleteRawMaterialMutation,
    useGetRawMaterialsQuery,
  
   
  } from "../api/productApi";
  import { useParams } from "react-router-dom";
 

import PurchasePaymentHistory from "../components/paymenthistory/PurchasePaymentHistory";
import { useState } from "react";
import DeleteAlertModal from "../modals/DeleteAlertModal";
  
  function PurchesPaymentPage() {
    const { branch } = useParams();
   
    const [id,setId] = useState('')
    const [deleteModal,setDeleteModal] = useState(false)
    const { data, isLoading } = useGetRawMaterialsQuery(branch);
    const [
        deleteBill,
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
        <PurchasePaymentHistory
          title="Purchase Payment History"
          data={data}
          isLoading={isLoading}
          path={`/add-purchase-payment/${branch}`}
          editpath={`/edit-raw-materials/${branch}`}
          setId={setId}
          setDeleteModal={setDeleteModal}
        />
   <DeleteAlertModal
       show={deleteModal}
       setShow={setDeleteModal}
       onHide={() => setDeleteModal(false)}
       deleteBuildProduct={deleteBill}
       data={deleteData}
       error={deleteError}
       isError={isDeleteError}
       isSuccess={isDeleteSuccess}
       isLoading={isDeleteLoading}
       productId={id}
      />
     
      </div>
    );
  }
  
  export default PurchesPaymentPage;
  