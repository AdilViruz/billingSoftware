import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import VerifyEmail from "./components/authcomponents/VerifyEmail";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ProtectedRoutes from "./components/authcomponents/ProtectedRoutes";
import DashboardPage from "./pages/DashboardPage";
import BuildProductsPage from "./pages/BuildProductsPage";
import SoldProductsPage from "./pages/SoldProductsPage";
import RawMaterialsPage from "./pages/RawMaterialsPage";
import BillingPage from "./pages/BillingPage";
import ChangePasswordPage from "./pages/ChangePasswordPage";
import BranchNavPage from "./pages/BranchNavPage";
import AddBuildProductsPage from "./pages/AddBuildProductsPage";
import AddSoldProductsPage from "./pages/AddSoldProductsPage";
import AddRawMaterialsPage from "./pages/AddRawMaterialsPage";
import AddInvoicePage from "./pages/AddInvoicePage";
import EditInvoicePage from "./pages/EditInvoicePage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import ErrorPage from "./pages/ErrorPage";
import PlainInvoicePage from "./pages/PlainInvoicePage";
import AddPlainInvoicePage from "./pages/AddPlainInvoicePage";
import EditPlainInvoicePage from "./pages/EditGeneratedInvoicePage";
import BuyerDetailsPage from "./pages/BuyerDetailsPage";
import AddBuyerPage from "./pages/AddBuyerPage";
import QuotationPage from "./pages/QuotationPage";
import AddQuotationPage from "./pages/AddQuotationPage";
import EditQuotationPage from "./pages/EditQuotationPage";
import PaymentHistoryPage from "./pages/PaymentHistoryPage";
import PurchaseDetailsPage from "./pages/PurchaseDetailsPage";
import AddPurchasePage from "./pages/AddPurchasePage";
import PurchesPaymentPage from "./pages/PurchesPaymentPage";
import EditRawMaterialsPage from "./pages/EditRawMaterialsPage";
import AddPaymentHistory from "./components/paymenthistory/AddPaymentHistory";
import AddPaymentHistoryPage from "./pages/AddPaymentHistoryPage";
import PlainPaymentHistory from "./components/paymenthistory/PlainPaymentHistory";
import PlainPaymentHistoryPage from "./pages/PlainPaymentHistoryPage";
import AddPlainPaymentHistory from "./components/paymenthistory/AddPlainPaymentHistory";
import AddPlainPaymentHistoryPage from "./pages/AddPlainPaymentHistoryPage";
import AddPurchaseHistory from "./components/paymenthistory/AddPurchaseHistory";
import AddPurchaseHistoryPage from "./pages/AddPurchaseHistoryPage";
import GenerateInvoicePage from "./pages/GenerateInvoicePage";
import GenerateNewInvoicePage from "./pages/GenerateNewInvoicePage";
import EditGeneratedInvoicePage from "./pages/EditGeneratedInvoicePage";

function App() {
  return (
    <div>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          {/* Public Route */}
          <Route path="/" element={<LoginPage />} />
          <Route path="sign-up" element={<RegistrationPage />} />
          <Route path="verify-email" element={<VerifyEmail />} />
          <Route
            path="reset-password/:id/:token"
            element={<ResetPasswordPage />}
          />
          <Route path="*" element={<ErrorPage />} />
          {/* Protected Route */}
          <Route
            path="branch-nav"
            element={
              <ProtectedRoutes>
                <BranchNavPage />
              </ProtectedRoutes>
            }
          />
          <Route
            path="dashboard/:branch"
            element={
              <ProtectedRoutes>
                <DashboardPage />
              </ProtectedRoutes>
            }
          />
          <Route
            path="build-products/:branch"
            element={
              <ProtectedRoutes>
                <BuildProductsPage />
              </ProtectedRoutes>
            }
          />
          <Route
            path="sold-products/:branch"
            element={
              <ProtectedRoutes>
                <SoldProductsPage />
              </ProtectedRoutes>
            }
          />
          <Route
            path="raw-materials/:branch"
            element={
              <ProtectedRoutes>
                <RawMaterialsPage />
              </ProtectedRoutes>
            }
          />
          <Route
            path="plain-invoice/:branch"
            element={
              <ProtectedRoutes>
                <PlainInvoicePage />
              </ProtectedRoutes>
            }
          />
          <Route
            path="gst-invoice/:branch"
            element={
              <ProtectedRoutes>
                <BillingPage />
              </ProtectedRoutes>
            }
          />
          <Route
            path="add-build-products/:branch"
            element={
              <ProtectedRoutes>
                <AddBuildProductsPage />
              </ProtectedRoutes>
            }
          />
          <Route
            path="add-sold-products/:branch"
            element={
              <ProtectedRoutes>
                <AddSoldProductsPage />
              </ProtectedRoutes>
            }
          />
          <Route
            path="add-payment-history/:branch"
            element={
              <ProtectedRoutes>
                <AddPaymentHistoryPage />
              </ProtectedRoutes>
            }
          />
          <Route
            path="add-raw-materials/:branch"
            element={
              <ProtectedRoutes>
                <AddRawMaterialsPage />
              </ProtectedRoutes>
            }
          />
          <Route
            path="add-plain-invoice/:branch"
            element={
              <ProtectedRoutes>
                <AddPlainInvoicePage />
              </ProtectedRoutes>
            }
          />
          <Route
            path="add-generate-invoice/:branch"
            element={
              <ProtectedRoutes>
                <GenerateNewInvoicePage />
              </ProtectedRoutes>
            }
          />
          <Route
            path="add-gst-invoice/:branch"
            element={
              <ProtectedRoutes>
                <AddInvoicePage />
              </ProtectedRoutes>
            }
          />
          <Route
            path="edit-plain-invoice/:branch"
            element={
              <ProtectedRoutes>
                <EditPlainInvoicePage />
              </ProtectedRoutes>
            }
          />

          <Route
            path="edit-generate-invoice/:branch"
            element={
              <ProtectedRoutes>
                <EditGeneratedInvoicePage />
              </ProtectedRoutes>
            }
          />
          <Route
            path="edit-invoice/:branch"
            element={
              <ProtectedRoutes>
                <EditInvoicePage />
              </ProtectedRoutes>
            }
          />
          <Route
            path="buyer-details/:branch"
            element={
              <ProtectedRoutes>
                <BuyerDetailsPage />
              </ProtectedRoutes>
            }
          />
          <Route
            path="add-buyer/:branch"
            element={
              <ProtectedRoutes>
                <AddBuyerPage />
              </ProtectedRoutes>
            }
          />
          <Route
            path="purchase-details/:branch"
            element={
              <ProtectedRoutes>
                <PurchaseDetailsPage />
              </ProtectedRoutes>
            }
          />
          <Route
            path="purchase-payment/:branch"
            element={
              <ProtectedRoutes>
                <PurchesPaymentPage />
              </ProtectedRoutes>
            }
          />
          <Route
            path="edit-raw-materials/:branch"
            element={
              <ProtectedRoutes>
                <EditRawMaterialsPage />
              </ProtectedRoutes>
            }
          />
          <Route
            path="add-purchase/:branch"
            element={
              <ProtectedRoutes>
                <AddPurchasePage />
              </ProtectedRoutes>
            }
          />
          <Route
            path="quotation/:branch"
            element={
              <ProtectedRoutes>
                <QuotationPage />
              </ProtectedRoutes>
            }
          />
          <Route
            path="add-quotation/:branch"
            element={
              <ProtectedRoutes>
                <AddQuotationPage />
              </ProtectedRoutes>
            }
          />
          <Route
            path="edit-quotation/:branch"
            element={
              <ProtectedRoutes>
                <EditQuotationPage />
              </ProtectedRoutes>
            }
          />
          <Route
            path="payment-history/:branch"
            element={
              <ProtectedRoutes>
                <PaymentHistoryPage />
              </ProtectedRoutes>
            }
          />

          {/* Edit here */}

          <Route
            path="generate-invoice/:branch"
            element={
              <ProtectedRoutes>
                <GenerateInvoicePage />
              </ProtectedRoutes>
            }
          />
          <Route
            path="plain-payment-history/:branch"
            element={
              <ProtectedRoutes>
                <PlainPaymentHistoryPage />
              </ProtectedRoutes>
            }
          />

          <Route
            path="change-password/:branch"
            element={
              <ProtectedRoutes>
                <ChangePasswordPage />
              </ProtectedRoutes>
            }
          />

          <Route
            path="add-plain-payment-history/:branch"
            element={
              <ProtectedRoutes>
                <AddPlainPaymentHistoryPage />
              </ProtectedRoutes>
            }
          />

          <Route
            path="add-purchase-payment/:branch"
            element={
              <ProtectedRoutes>
                <AddPurchaseHistoryPage />
              </ProtectedRoutes>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
