import BuyerModel from "../models/Buyer.js";

class buyerDetailsController{
     
  // Add Buyer Details
  static addBuyerDetails = async (req, res) => {
    try {
    
        const { branch, name, gst_number, address,state,payment_mode } = req.body;
   

      const isBuyerExist = await BuyerModel.find({
        name:name.toLowerCase(),
        branch,
      });
     
      if (isBuyerExist[0]) {
        return res.status(400).json({
          status: "failed",
          message: `${isBuyerExist[0].name}  buyer is already exist`,
        });
      }
      await new BuyerModel({ branch, name, gst_number, address,state,payment_mode}).save();
      res.status(201).json({
        status: "success",
        message: "Buyer details added successfully",
      });
    } catch (error) {
        console.log(error)
      res.status(500).json({
        status: "failed",
        message: "Unable to add buyer details, please try again later",
      });
    }
  };

  //   Get Buyer details
  static buyerDetails = async (req, res) => {
    const { branch } = req.params;
    try {
      const buyers = await BuyerModel.find({ branch }).sort({ _id: -1 });
      res.status(201).json({
        status: "success",
        message: "buyer details fetched successfully",
        buyers,
      });
    } catch (error) {
      res.status(500).json({
        status: "failed",
        message: "Unable to fetch buyer details",
      });
    }
  };

  //Get single buyer details
  static singleBuyerDetails = async (req, res) => {
    const { branch, id } = req.params;
    try {
      const buyers = await BuyerModel.find({ branch, _id: id });
      res.status(201).json({
        status: "success",
        message: "Buyer details fetched successfully",
        buyers,
      });
    } catch (error) {
      res.status(500).json({
        status: "failed",
        message: "Unable to fetch buyer details",
      });
    }
  };

  //   Update buyer details
  static updateBuyerDetails = async (req, res) => {
    try {
        const { branch, name, gst_number, address,state,payment_mode } = req.body;
        if (!branch || !name  || !address || !state || !payment_mode) {
          return res
            .status(400)
            .json({ status: "failed", message: "All fields are required" });
        }

      const isBuyerExist = await BuyerModel.find({
        name:name.toLowerCase(),
        branch,
      });
      const currentBuyer = await BuyerModel.find({
        _id: req.params.id,
        branch,
      });

      if (isBuyerExist[0] && currentBuyer[0].name != name.toLowerCase()) {
        return res
          .status(400)
          .json({ status: "failed", message: "Buyer Already Exist" });
      }

      await BuyerModel.findByIdAndUpdate(req.params.id, req.body);

      res.status(201).json({
        status: "success",
        message: "Buyer details updated successfully",
      });
    } catch (error) {
      res.status(500).json({
        status: "failed",
        message: "Unable to update buyer details, please try again later",
      });
    }
  };

  // Delete buyer
  static DeleteBuyerDetails = async (req, res) => {
    const { id } = req.params;
    try {
      await BuyerModel.findByIdAndDelete(id);
      res.status(201).json({
        status: "success",
        message: "Buyer details deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        status: "failed",
        message: "Unable to delete buyer details, please try again later",
      });
    }
  };

}
export default buyerDetailsController