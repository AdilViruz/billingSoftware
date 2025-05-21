import InvoiceList from "../components/billingcomponents/InvoiceList";
import { useLocation, useParams } from "react-router-dom";
import InvoiceModal from "../modals/InvoiceModal";
import {
  useDeleteQuotationMutation,
  useGetQuotationQuery,
  useSingleQuotationQuery,
} from "../api/productApi";
import { useState } from "react";
import DeleteAlertModal from "../modals/DeleteAlertModal";

function QuotationPage() {
  const { branch } = useParams();
  const { state } = useLocation();

  const [show, setShow] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [id, setId] = useState("");

  const { data, isLoading } = useGetQuotationQuery(branch);
  const { data: quotationData } = useSingleQuotationQuery(
    { branch, id } || { branch, id: state.id }
  );

  const [
    deleteQuotation,
    {
      data: deleteData,
      error: deleteError,
      isError: isDeleteError,
      isSuccess: isDeleteSuccess,
      isLoading: isDeleteLoading,
    },
  ] = useDeleteQuotationMutation();

  return (
    <div>
      <InvoiceList
        heading="Quotation"
        path={`/add-quotation/${branch}`}
        data={data}
        isLoading={isLoading}
        setShow={setShow}
        singleBilling={quotationData}
        setId={setId}
        setDeleteModal={setDeleteModal}
        editpath={`/edit-quotation/${branch}`}
      />
      <InvoiceModal
        heading="QUOTATION"
        show={show}
        onHide={() => setShow(false)}
        data={quotationData}
        id={id}
        path={`/edit-quotation/${branch}`}
      />

      {/* Delete Bill */}
      <DeleteAlertModal
        show={deleteModal}
        setShow={setDeleteModal}
        onHide={() => setDeleteModal(false)}
        deleteBuildProduct={deleteQuotation}
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

export default QuotationPage;
