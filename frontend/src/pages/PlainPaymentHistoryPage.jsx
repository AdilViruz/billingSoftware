import { useGetBillingQuery } from "../api/productApi";
import { useParams } from "react-router-dom";

import PaymentHistory from "../components/paymenthistory/PaymentHistory";
import PlainPaymentHistory from "../components/paymenthistory/PlainPaymentHistory";

function PlainPaymentHistoryPage() {
  const { branch } = useParams();

  const { data, isLoading } = useGetBillingQuery(branch);

  return (
    <div>
      <PlainPaymentHistory
        title="Plain Sales Payment History"
        data={data}
        path={`/add-plain-payment-history/${branch}`}
        isLoading={isLoading}
      />
    </div>
  );
}

export default PlainPaymentHistoryPage;
