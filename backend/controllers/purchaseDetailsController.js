import PurchaseModel from "../models/Purchase.js";

class purchaseDetailsController {
  // Add Purchase Details
  static addPurchaseDetails = async (req, res) => {
    try {
      const { branch, name, address, state, payment_mode } = req.body;

      const isPurchaseExist = await PurchaseModel.find({
        name: name.toLowerCase(),
        branch,
      });

      if (isPurchaseExist[0]) {
        return res.status(400).json({
          status: "failed",
          message: `${isPurchaseExist[0].name}  Purchase already exists`,
        });
      }
      await new PurchaseModel({
        branch,
        name,
        address,
        state,
        payment_mode,
      }).save();
      res.status(201).json({
        status: "success",
        message: "Purchase details added successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: "failed",
        message: "Unable to add purchase details, please try again later",
      });
    }
  };

  //   Get Purchase details
  static purchaseDetails = async (req, res) => {
    const { branch } = req.params;
    try {
      const purchases = await PurchaseModel.find({ branch });
      res.status(201).json({
        status: "success",
        message: "Purchase details fetched successfully",
        purchases,
      });
    } catch (error) {
      res.status(500).json({
        status: "failed",
        message: "Unable to fetch purchase details",
      });
    }
  };

  //Get single purchase details
  static singlepurchaseDetails = async (req, res) => {
    const { branch, id } = req.params;
    try {
      const purchases = await PurchaseModel.find({ branch, _id: id });
      res.status(201).json({
        status: "success",
        message: "Purchase details fetched successfully",
        purchases,
      });
    } catch (error) {
      res.status(500).json({
        status: "failed",
        message: "Unable to fetch purchase details",
      });
    }
  };

  //   Update purchase details
  static updatepurchaseDetails = async (req, res) => {
    try {
      const { branch, name, address, state, payment_mode } = req.body;
      if (!branch || !name || !address || !state || !payment_mode) {
        return res
          .status(400)
          .json({ status: "failed", message: "All fields are required" });
      }

      const isPurchaseExist = await PurchaseModel.find({
        name: name.toLowerCase(),
        branch,
      });
      const currentPurchase = await PurchaseModel.find({
        _id: req.params.id,
        branch,
      });

      if (isPurchaseExist[0] && currentPurchase[0].name != name.toLowerCase()) {
        return res
          .status(400)
          .json({ status: "failed", message: "Purchase Already Exist" });
      }

      await PurchaseModel.findByIdAndUpdate(req.params.id, req.body);

      res.status(201).json({
        status: "success",
        message: "Purchase details updated successfully",
      });
    } catch (error) {
      res.status(500).json({
        status: "failed",
        message: "Unable to update purchase details, please try again later",
      });
    }
  };

  // Delete purchase
  static DeletepurchaseDetails = async (req, res) => {
    const { id } = req.params;
    try {
      await PurchaseModel.findByIdAndDelete(id);
      res.status(201).json({
        status: "success",
        message: "Purchase details deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        status: "failed",
        message: "Unable to delete purchase details, please try again later",
      });
    }
  };
}
export default purchaseDetailsController;
