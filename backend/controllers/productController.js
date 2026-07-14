import BillingModel from "../models/Billing.js";
import BuildProductModel from "../models/BuildProduct.js";
import RawMaterialModel from "../models/RawMaterial.js";
import SoldProductModel from "../models/SoldProduct.js";

class ProductController {
  // Build Product
  // Add Build Product
  static addBuildProduct = async (req, res) => {
    try {
      const { branch } = req.body.products[0];
      const body = req.body;

      const isSameMultipleProduct = req.body.products
        .map((item) => item.product_name.split(" ").join("").toLowerCase())
        .some((item, index, arr) => arr.indexOf(item) !== index);

      if (isSameMultipleProduct) {
        return res.status(400).json({
          status: "failed",
          message: "Can not create same multiple product",
        });
      }

      const isProductExist = await BuildProductModel.find({
        product_name: {
          $in: req.body.products.map((item) => item.product_name.toLowerCase()),
        },
        branch,
      });

      if (isProductExist[0]) {
        return res.status(400).json({
          status: "failed",
          message: `${isProductExist[0].product_name} product is already exist`,
        });
      }

      // Get Raw material according to request used material
    // let filterBuildProduct = await RawMaterialModel.find({
    //    "products.product_name": {
    //       "$in": body?.used_materials.map((item) =>
    //         item.material_name.toLowerCase()
    //       ),
    //     },
    //     branch,
    //   },{"products._id":0});
        
   
     

      // Use reduce to aggregate quantities based on product name
      const reqProducts = body?.used_materials?.reduce((acc, current) => {
        const existingItem = acc.find(
          (item) => item.material_name === current.material_name
        );
        if (existingItem) {
          existingItem.qty += current.qty;
        } else {
          acc.push({ ...current });
        }
        return acc;
      }, []);

      function sortFunc1(a, b) {
        return (
          reqProducts
            ?.map((item) => item.material_name)
            ?.indexOf(a.material_name) -
          reqProducts
            ?.map((item) => item.material_name)
            ?.indexOf(b.material_name)
        );
      }

      // filterRawMaterials?.sort(sortFunc1);

      // const checkMaterialQtyLimit = reqProducts.filter(
      //   (item, index) => item.qty > filterRawMaterials[index].qty
      // );
      // if (checkMaterialQtyLimit[0]) {
      //   return res.status(400).json({
      //     status: "failed",
      //     message: `${checkMaterialQtyLimit
      //       ?.map((item) => item.material_name)
      //       .join(",")} quantity exceed.`,
      //   });
      // }
      // Update build product quantity as per according sold product quantity
      reqProducts?.map(
        async (item, index) =>
          await RawMaterialModel.updateOne(
            {"products.product_name":item.material_name },
            // { $set: { qty: filterBuildProduct[index].qty - item.qty } },
            {  $inc: { "products.$[elem].qty" : -item.qty }},
            { arrayFilters: [{ "elem.product_name": item.material_name }] }
            
          )
        )


      //  Add build products
      await BuildProductModel.insertMany(req.body.products);
      // await RawMaterialModel.deleteOne({ qty: 0 });
      await RawMaterialModel.updateMany(
        { },
        { $pull: { products:{ qty: { $lte: 0 }  } } }
      )

    

      res.status(201).json({
        status: "success",
        message: "Build products added successfully",
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        status: "failed",
        message: "Unable to add build product, please try again later",
      });
    }
  };

  //   Get Build Products
  static buildProducts = async (req, res) => {
    const { branch } = req.params;
    try {
      const products = await BuildProductModel.find({ branch }).sort({ _id: -1 });
      res.status(201).json({
        status: "success",
        message: "Build products fetched successfully",
        products,
      });
    } catch (error) {
      res.status(500).json({
        status: "failed",
        message: "Unable to fetch build product",
      });
    }
  };

  //Get single build product
  static SinglebuildProducts = async (req, res) => {
    const { branch, id } = req.params;
    try {
      const products = await BuildProductModel.find({ branch, _id: id });
      res.status(201).json({
        status: "success",
        message: "Build products fetched successfully",
        products,
      });
    } catch (error) {
      res.status(500).json({
        status: "failed",
        message: "Unable to fetch build product",
      });
    }
  };

  //   Update build Product
  static updateBuildProduct = async (req, res) => {
    try {
      const { branch, product_name, price, qty, description } = req.body;
      if (!branch || !product_name || !price || !qty || !description) {
        return res
          .status(400)
          .json({ status: "failed", message: "All fields are required" });
      }

      const isProductExist = await BuildProductModel.find({
        product_name: product_name.toLowerCase(),
        branch,
      });
      const currentProduct = await BuildProductModel.find({
        _id: req.params.id,
        branch,
      });

      if (
        isProductExist[0] &&
        currentProduct[0].product_name != product_name.toLowerCase()
      ) {
        return res
          .status(400)
          .json({ status: "failed", message: "Product Already Exist" });
      }

      await BuildProductModel.findByIdAndUpdate(req.params.id, req.body);

      res.status(201).json({
        status: "success",
        message: "Build product updated successfully",
      });
    } catch (error) {
      res.status(500).json({
        status: "failed",
        message: "Unable to update build product, please try again later",
      });
    }
  };

  // Delete build Product
  static DeleteBuildProduct = async (req, res) => {
    const { id } = req.params;
    try {
      await BuildProductModel.findByIdAndDelete(id);
      res.status(201).json({
        status: "success",
        message: "Build product deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        status: "failed",
        message: "Unable to delete build product, please try again later",
      });
    }
  };

  // Sold Product
  // Add Build Product
  static addSoldProduct = async (req, res) => {
    try {
      const { branch, product_name, price, qty, description } = req.body[0];
      const body = req.body;

      // Get Build products according to request sold products
      const filterBuildProduct = await BuildProductModel.find({
        product_name: {
          $in: body.map((item) => item.product_name.toLowerCase()),
        },
        branch,
      });

      // Use reduce to aggregate quantities based on product name
      const reqProducts = body?.reduce((acc, current) => {
        const existingItem = acc.find(
          (item) => item.product_name === current.product_name
        );
        if (existingItem) {
          existingItem.qty += current.qty;
        } else {
          acc.push({ ...current });
        }
        return acc;
      }, []);

      function sortFunc1(a, b) {
        return (
          reqProducts
            ?.map((item) => item.product_name)
            ?.indexOf(a.product_name) -
          reqProducts?.map((item) => item.product_name)?.indexOf(b.product_name)
        );
      }

      filterBuildProduct?.sort(sortFunc1);

      // Update build product quantity as per according sold product quantity
      reqProducts?.map(
        async (item, index) =>
          await BuildProductModel.updateMany(
            { product_name: item.product_name, branch },
            { $set: { qty: filterBuildProduct[index].qty - item.qty } },
            { upsert: true }
          )
      );

      // Add sold products
      await SoldProductModel.insertMany(req.body);
      await BuildProductModel.deleteOne({ qty: 0 });

      res.status(201).json({
        status: "success",
        message: "Sold products added successfully",
      });
    } catch (error) {
      res.status(500).json({
        status: "failed",
        message: "Unable to add Sold product, please try again later",
      });
    }
  };

  //   Get Build Products
  static SoldProducts = async (req, res) => {
    const { branch } = req.params;
    try {
      const products = await SoldProductModel.find({ branch }).sort({ _id: -1 });
      res.status(201).json({
        status: "success",
        message: "Sold products fetched successfully",
        products,
      });
    } catch (error) {
      res.status(500).json({
        status: "failed",
        message: "Unable to fetch sold product",
      });
    }
  };

  //Get single build product
  static SingleSoldProducts = async (req, res) => {
    const { branch, id } = req.params;
    try {
      const products = await SoldProductModel.find({ branch, _id: id });
      res.status(201).json({
        status: "success",
        message: "Sold product fetched successfully",
        products,
      });
    } catch (error) {
      res.status(500).json({
        status: "failed",
        message: "Unable to fetch sold product",
      });
    }
  };

  //   Update build Product
  static updateSoldProduct = async (req, res) => {
    try {
      const { branch, product_name, price, qty, description } = req.body;
      if (!branch || !product_name || !price || !qty || !description) {
        return res
          .status(400)
          .json({ status: "failed", message: "All fields are required" });
      }

      const isProductExist = await SoldProductModel.find({
        product_name: product_name.toLowerCase(),
        branch,
      });

      const currentProduct = await SoldProductModel.find({
        _id: req.params.id,
        branch,
      });

      if (
        isProductExist[0] &&
        currentProduct[0].product_name != product_name.toLowerCase()
      ) {
        return res
          .status(400)
          .json({ status: "failed", message: "Product Already Exist" });
      }

      // Get Build products according to request sold products
      let filterBuildProduct = await BuildProductModel.find({
        product_name,
        branch,
      });

      if (!filterBuildProduct[0]) {
        if (currentProduct[0]?.qty >= qty) {
          await new BuildProductModel({
            ...req.body,
            qty: currentProduct[0]?.qty - qty,
          }).save();
        } else {
          return res.status(400).json({
            status: "failed",
            message: `${product_name} stock finished`,
          });
        }
      }

      if (filterBuildProduct[0]?.qty + currentProduct[0]?.qty < qty) {
        return res.status(400).json({
          status: "failed",
          message: `Exceed the stock limit. You can add upto ${
            filterBuildProduct[0]?.qty + currentProduct[0].qty
          } products  `,
        });
      }

      // Update build product quantity as per according sold product quantity
      if (filterBuildProduct[0]) {
        await BuildProductModel.updateOne(
          { product_name, branch },
          {
            $set: {
              qty: filterBuildProduct[0]?.qty - qty + currentProduct[0].qty,
            },
          }
        );
      }

      await SoldProductModel.findByIdAndUpdate(req.params.id, req.body);

      await BuildProductModel.deleteOne({ qty: 0 });

      res.status(201).json({
        status: "success",
        message: "Sold product updated successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: "failed",
        message: "Unable to update sold product, please try again later",
      });
    }
  };

  // Delete build Product
  static DeleteSoldProduct = async (req, res) => {
    const { id } = req.params;
    const { buildChanges } = req.body;
    try {
      const soldProduct = await SoldProductModel.find({ _id: id });
      const { branch, product_name, price, qty, description } = soldProduct[0];
      const buildProduct = await BuildProductModel.find({ product_name });

      if (buildChanges) {
        if (buildProduct[0]) {
          await BuildProductModel.updateOne(
            { product_name, branch },
            {
              $set: {
                qty: buildProduct[0]?.qty + qty,
              },
            }
          );
          await SoldProductModel.findByIdAndDelete(id);
          return res.status(201).json({
            status: "success",
            message: "Sold product deleted successfully",
          });
        } else {
          await new BuildProductModel({
            branch,
            product_name,
            price,
            qty,
            description,
          }).save();
          await SoldProductModel.findByIdAndDelete(id);
          return res.status(201).json({
            status: "success",
            message: "Sold product deleted successfully",
          });
        }
      } else {
        await SoldProductModel.findByIdAndDelete(id);
        res.status(201).json({
          status: "success",
          message: "Sold product deleted successfully",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: "failed",
        message: "Unable to delete sold product, please try again later",
      });
    }
  };

  // Materials
  // Add Materials
  static addRawMaterials = async (req, res) => {
    try {
      const { branch } = req.body;
      const body = req.body;

      // const isSameMultipleProduct = req.body.products
      //   .map((item) => item.product_name.split(" ").join("").toLowerCase())
      //   .some((item, index, arr) => arr.indexOf(item) !== index);

      // if (isSameMultipleProduct) {
      //   return res.status(400).json({
      //     status: "failed",
      //     message: "Can not create same multiple raw material",
      //   });
      // }

      // const isProductExist = await RawMaterialModel.find({
      //   product_name: {
      //     $in: body.map((item) => item.product_name.toLowerCase()),
      //   },
      //   branch,
      // });

      // if (isProductExist[0]) {
      //   return res.status(400).json({
      //     status: "failed",
      //     message: `${isProductExist[0].product_name} raw material is already exist`,
      //   });
      // }
      await RawMaterialModel.insertMany(req.body);
      res.status(201).json({
        status: "success",
        message: "Raw materials added successfully",
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        status: "failed",
        message: "Unable to add raw material, please try again later",
      });
    }
  };

  //   Get Build Products
  static rawMaterials = async (req, res) => {
    const { branch } = req.params;
    try {
      const products = await RawMaterialModel.find({ branch }).sort({ _id: -1 });
      res.status(201).json({
        status: "success",
        message: "Raw materials fetched successfully",
        products,
      });
    } catch (error) {
      res.status(500).json({
        status: "failed",
        message: "Unable to fetch raw materials",
      });
    }
  };

  //Get single build product
  static singleRawMaterial = async (req, res) => {
    const { branch, id } = req.params;
    try {
      const products = await RawMaterialModel.find({ branch, _id: id });
      res.status(201).json({
        status: "success",
        message: "Raw material fetched successfully",
        products,
      });
    } catch (error) {
      res.status(500).json({
        status: "failed",
        message: "Unable to fetch raw material",
      });
    }
  };

  //   Update Raw materials
  static updateRawMaterial = async (req, res) => {
   
    try {
      const { branch, name } = req.body.body;
 
      
      // if (!branch || !product_name || !price || !qty || !description) {
      //   return res
      //     .status(400)
      //     .json({ status: "failed", message: "All fields are required" });
      // }

      const isProductExist = await RawMaterialModel.find({
        name: name.toLowerCase(),
        branch,
      });
      const currentProduct = await RawMaterialModel.find({
        _id: req.params.id,
        branch,
      });

      if (
        isProductExist[0] &&
        currentProduct[0].name != name.toLowerCase()
      ) {
        return res
          .status(400)
          .json({ status: "failed", message: "Product Already Exist" });
      }

      await RawMaterialModel.findByIdAndUpdate(req.params.id, req.body.body);

      res.status(201).json({
        status: "success",
        message: "Raw material updated successfully",
      });
    } catch (error) {
      console.log(error);
      
      res.status(500).json({
        status: "failed",
        message: "Unable to update raw material, please try again later",
      });
    }
  };

  // Delete build Product
  static DeleteRawMaterial = async (req, res) => {
    const { id } = req.params;
    
    
    try {
      await RawMaterialModel.findByIdAndDelete(id)
      res.status(201).json({
        status: "success",
        message: "Raw material deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        status: "failed",
        message: "Unable to delete raw material, please try again later",
      });
    }
  };

  //   Dashboard
  static Dashboard = async (req, res) => {
    const { branch } = req.params;
    try {
      const buildProducts = await BuildProductModel.find({ branch }).sort({ _id: -1 });
      const soldProducts = await SoldProductModel.find({ branch }).sort({ _id: -1 });
      const rowMaterials = await RawMaterialModel.find({ branch }).sort({ _id: -1 });
      const billing = await BillingModel.find({ branch }).sort({ _id: -1 });
      res.status(201).json({
        status: "success",
        message: "Build products fetched successfully",
        build_product_counts: buildProducts.length,
        sold_product_counts: soldProducts.length,
        raw_materials_counts: rowMaterials.length,
        invoice_counts: billing.length,
        billing,
        rowMaterials,
      });
    } catch (error) {
      res.status(500).json({
        status: "failed",
        message: "Unable to fetch build product",
      });
    }
  };
}

export default ProductController;
