import Product from "../models/productModel.js";

//create a product
const createProduct = async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(200).json({
    success: true,
    product,
  });
};
const getAllProducts = (req, res) => {
  res.status(200).json({ message: "working" });
};

export { getAllProducts, createProduct };
