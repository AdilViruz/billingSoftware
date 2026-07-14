import BillingModel from "../models/Billing.js";

class BillingController {
  // Add biling
  static addBill = async (req, res) => {
    try {
      const { branch, name, state, address, products } = req.body;

      if (!branch || !name || !state || !products) {
        return res
          .status(400)
          .json({ status: "failed", message: "All fields are required" });
      }

      const isSameMultipleProduct = products
        .map((item) => item.product_name.split(" ").join("").toLowerCase())
        .some((item, index, arr) => arr.indexOf(item) !== index);

      if (isSameMultipleProduct) {
        return res.status(400).json({
          status: "failed",
          message: "Can not add same multiple products",
        });
      }

      await new BillingModel(req.body).save();

      res.status(201).json({
        status: "success",
        message: "Invoice added successfully",
      });
    } catch (error) {
      res.status(500).json({
        status: "failed",
        message: "Unable to add Invoice, please try again later",
      });
    }
  };

  // Add buyers Payment
  static addBuyersPayment = async (req, res) => {
    try {
      const { branch, name, state, address, products } = req.body;

      if (!branch || !name || !state || !products) {
        return res
          .status(400)
          .json({ status: "failed", message: "All fields are required" });
      }

      const isSameMultipleProduct = products
        .map((item) => item.product_name.split(" ").join("").toLowerCase())
        .some((item, index, arr) => arr.indexOf(item) !== index);

      if (isSameMultipleProduct) {
        return res.status(400).json({
          status: "failed",
          message: "Can not add same multiple products",
        });
      }

      await new BillingModel(req.body).save();

      res.status(201).json({
        status: "success",
        message: "Invoice added successfully",
      });
    } catch (error) {
      res.status(500).json({
        status: "failed",
        message: "Unable to add Invoice, please try again later",
      });
    }
  };

  // Get billing
  static getBilling = async (req, res) => {
    const { branch } = req.params;
    try {
      const invoiceDetails = await BillingModel.find({ branch }).sort({ _id: -1 });
      res.status(201).json({
        status: "success",
        message: "Billing fetched successfully",
        invoiceDetails,
      });
    } catch (error) {
      res.status(500).json({
        status: "failed",
        message: "Unable to fetch billing",
      });
    }
  };
  //Get single build product
  static singleBilling = async (req, res) => {
    const { branch, id } = req.params;
    try {
      const bill = await BillingModel.find({ branch, _id: id }).sort({ _id: -1 });
      res.status(201).json({
        status: "success",
        message: "Bill fetched successfully",
        bill,
      });
    } catch (error) {
      res.status(500).json({
        status: "failed",
        message: "Unable to fetch bill",
      });
    }
  };

  //   Update billing
  static updateBilling = async (req, res) => {
    try {
      const { branch, name, state, address, products } = req.body;
      if (!branch || !name || !state || !products) {
        return res
          .status(400)
          .json({ status: "failed", message: "All fields are required" });
      }

      await BillingModel.findByIdAndUpdate(req.params.id, req.body);

      res.status(201).json({
        status: "success",
        message: "Invoice updated successfully",
      });
    } catch (error) {
      res.status(500).json({
        status: "failed",
        message: "Unable to update invoice, please try again later",
      });
    }
  };

  // Delete Invoice
  static DeleteBill = async (req, res) => {
    const { id } = req.params;
    try {
      await BillingModel.findByIdAndDelete(id);
      res.status(201).json({
        status: "success",
        message: "Invoice deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        status: "failed",
        message: "Unable to delete Invoice, please try again later",
      });
    }
  };
}

export default BillingController;
