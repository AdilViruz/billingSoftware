import InvoiceList from "../components/billingcomponents/InvoiceList";
import { useLocation, useParams } from "react-router-dom";
import InvoiceModal from "../modals/InvoiceModal";
import {
  useDeleteBillMutation,
  useGetBillingQuery,
  useSingleBillingQuery,
} from "../api/productApi";
import { useState } from "react";
import DeleteAlertModal from "../modals/DeleteAlertModal";
import InvoiceListGenerate from "../components/billingcomponents/InvoiceListGenerate";

function GenerateInvoicePage() {
  const { branch } = useParams();
  const { state } = useLocation();
  const [show, setShow] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [id, setId] = useState("");

  const { data, isLoading } = useGetBillingQuery(branch);
  const { data: billData } = useSingleBillingQuery(
    { branch, id } || { branch, id: state.id }
  );
  const [
    deleteBill,
    {
      data: deleteData,
      error: deleteError,
      isError: isDeleteError,
      isSuccess: isDeleteSuccess,
      isLoading: isDeleteLoading,
    },
  ] = useDeleteBillMutation();

  return (
    <div>
      <InvoiceListGenerate
        heading="Generate Invoice"
        path={`/add-generate-invoice/${branch}`}
        data={data}
        isLoading={isLoading}
        setShow={setShow}
        singleBilling={billData}
        setId={setId}
        setDeleteModal={setDeleteModal}
        editpath={`/edit-generate-invoice/${branch}`}
      />
      <InvoiceModal
        heading="TAX INVOICE"
        show={show}
        onHide={() => setShow(false)}
        data={billData}
        id={id}
        path={`/edit-generate-invoice/${branch}`}
      />

      {/* Delete Bill */}
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

export default GenerateInvoicePage;
