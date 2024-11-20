import { useGetBillingQuery } from "../api/productApi";
import { useParams } from "react-router-dom";

import PaymentHistory from "../components/paymenthistory/PaymentHistory";

function PaymentHistoryPage() {
  const { branch } = useParams();

  const { data, isLoading } = useGetBillingQuery(branch);

  return (
    <div>
      <PaymentHistory
        title="Sales Payment History"
        data={data}
        path={`/add-payment-history/${branch}`}
        isLoading={isLoading}
      />
    </div>
  );
}

export default PaymentHistoryPage;
