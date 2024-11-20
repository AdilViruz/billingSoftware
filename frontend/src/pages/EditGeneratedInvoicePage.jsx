import { useEffect } from "react";
import {
  useLazySingleBillingQuery,
  useUpdateBillingMutation,
} from "../api/productApi";
import AddInvoice from "../components/billingcomponents/AddInvoice";
import { useParams, useLocation } from "react-router-dom";
import { withoutGstBillingSchema } from "../utils/validationSchema";
function EditGeneratedInvoicePage() {
  const { branch } = useParams();
  const { state } = useLocation();
  const [singleBill, { data: billData }] = useLazySingleBillingQuery();
  const [editBilling, { data, error, isError, isSuccess, isLoading }] =
    useUpdateBillingMutation();

  useEffect(() => {
    singleBill({ branch, id: state.id });
  }, []);

  return (
    <div>
      <AddInvoice
        heading={"Edit Generated Invoice"}
        editBilling={editBilling}
        data={data}
        error={error}
        isError={isError}
        isSuccess={isSuccess}
        isLoading={isLoading}
        billData={billData}
        billingSchema={withoutGstBillingSchema}
        path={`/generate-invoice/${branch}`}
      />
    </div>
  );
}

export default EditGeneratedInvoicePage;
