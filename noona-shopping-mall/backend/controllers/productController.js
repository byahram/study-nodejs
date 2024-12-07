const Product = require("../models/Product");

const productController = {};

// createProduct
productController.createProduct = async (req, res) => {
  try {
    const {
      sku,
      name,
      size,
      image,
      category,
      description,
      price,
      stock,
      status,
    } = req.body;
    const product = new Product({
      sku,
      name,
      size,
      image,
      category,
      description,
      price,
      stock,
      status,
    });
    await product.save();
    res.status(200).json({ status: "success", product });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
};

// getProducts
productController.getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ status: "success", data: products });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
};

module.exports = productController;
