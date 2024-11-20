
import quotationModel from "../models/Quotation.js";
class quotationController {
  // Add biling
  static addQuotation = async (req, res) => {
    try {
      const { branch, name, state, address, products } = req.body;

      if (!branch || !name || !state  || !products) {
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

      await new quotationModel(req.body).save();

      


      res.status(201).json({
        status: "success",
        message: "Quotation added successfully",
      });
    } catch (error) {
      res.status(500).json({
        status: "failed",
        message: "Unable to add Quotation, please try again later",
      });
    }
  };

// Get Quotation
static getQuotation = async (req, res) => {
    const { branch } = req.params;
    try {
      const QuotationDetails = await quotationModel.find({ branch });
      res.status(201).json({
        status: "success",
        message: "Quotation fetched successfully",
        QuotationDetails,
      });
    } catch (error) {
      res.status(500).json({
        status: "failed",
        message: "Unable to fetch Quotation",
      });
    }
  };
 //Get single build product
 static singleQuotation = async (req, res) => {
    const { branch, id } = req.params;
    try {
      const bill = await quotationModel.find({ branch, _id: id });
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

  //   Update Quotation
  static updateQuotation= async (req, res) => {
    try {
        const { branch, name, state, address, products } = req.body;
      if (!branch || !name || !state || !products ) {
        return res
          .status(400)
          .json({ status: "failed", message: "All fields are required" });
      }

   
      await quotationModel.findByIdAndUpdate(req.params.id, req.body);

      res.status(201).json({
        status: "success",
        message: "Quotation updated successfully",
      });
    } catch (error) {
      res.status(500).json({
        status: "failed",
        message: "Unable to update Quotation, please try again later",
      });
    }
  };

   // Delete Quotation
   static DeleteQuotation = async (req, res) => {
    const { id } = req.params;
    try {
      await quotationModel.findByIdAndDelete(id);
      res.status(201).json({
        status: "success",
        message: "Quotation deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        status: "failed",
        message: "Unable to delete Quotation, please try again later",
      });
    }
  };

}

export default quotationController