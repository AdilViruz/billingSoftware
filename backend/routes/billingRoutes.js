import express from "express";

import passport from "passport";
import ProductController from "../controllers/productController.js";
import BillingController from "../controllers/billingController.js";
import buyerDetailsController from "../controllers/buyerDetailsController.js";
import quotationController from "../controllers/quotationController.js";
import purchaseDetailsController from "../controllers/purchaseDetailsController.js";
import verifyToken from "../middlewares/setAuthHeader.js";
const router = express.Router();

// Billing protected routes
router.post(
  "/add-billing",
 verifyToken,
  BillingController.addBill
);

router.post(
  "/add-buyers-payment",
  verifyToken,
  BillingController.addBuyersPayment
);

router.get(
  "/billing/:branch",
  verifyToken,
  BillingController.getBilling
);
router.get(
  "/single-billing/:branch/:id",
  verifyToken,
  BillingController.singleBilling
);
router.put(
  "/billing/:id",
  verifyToken,
  BillingController.updateBilling
);
router.delete(
  "/delete-billing/:id",
  verifyToken,
  BillingController.DeleteBill
);

// Buyer Details protected routes
router.post(
  "/add-buyer",
  verifyToken,
  buyerDetailsController.addBuyerDetails
);
router.get(
  "/buyer/:branch",
  verifyToken,
  buyerDetailsController.buyerDetails
);
router.get(
  "/single-buyer/:branch/:id",
  verifyToken,
  buyerDetailsController.singleBuyerDetails
);
router.put(
  "/buyer/:id",
  verifyToken,
  buyerDetailsController.updateBuyerDetails
);
router.delete(
  "/delete-buyer/:id",
  verifyToken,
  buyerDetailsController.DeleteBuyerDetails
);

// Purchase Details protected routes
router.post(
  "/add-purchase",
  verifyToken,
  purchaseDetailsController.addPurchaseDetails
);
router.get(
  "/purchase/:branch",
  verifyToken,
  purchaseDetailsController.purchaseDetails
);
router.get(
  "/single-purchase/:branch/:id",
  verifyToken,
 
  purchaseDetailsController.singlepurchaseDetails
);
router.put(
  "/purchase/:id",
  verifyToken,
 
  purchaseDetailsController.updatepurchaseDetails
);
router.delete(
  "/delete-purchase/:id",
  verifyToken,
 
  purchaseDetailsController.DeletepurchaseDetails
);

// Quotation protected routes
router.post(
  "/add-quotation",
  verifyToken,
 
  quotationController.addQuotation
);
router.get(
  "/quotation/:branch",
  verifyToken,
 
  quotationController.getQuotation
);
router.get(
  "/single-quotation/:branch/:id",
  verifyToken,
 
  quotationController.singleQuotation
);
router.put(
  "/quotation/:id",
  verifyToken,
 
  quotationController.updateQuotation
);
router.delete(
  "/delete-quotation/:id",
  verifyToken,
 
  quotationController.DeleteQuotation
);

export default router;
