import Product from "../models/productModel.js";
import ErrorHandler from "../utils/errorhandler.js";
import catchAsyncError from "../middleware/catchAsyncError.js";
import ApiFeatures from "../utils/apifeatures.js";
//create a product
const createProduct = catchAsyncError(async (req, res, next) => {
  req.body.user = req.user.id;
  const product = await Product.create(req.body);
  res.status(200).json({
    success: true,
    product,
  });
});
//get all produccts
const getAllProducts = catchAsyncError(async (req, res) => {
  let resultperpage = 5;
  let productCount = await Product.countDocuments();
  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(1);
  const product = await apiFeature.query;
  res.status(200).json({
    success: true,
    product,

    productCount,
  });
});

//update prodict
const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    if (!product) {
      return next(new ErrorHandler("Product not found"), 404);
    }

    return res.status(200).json({
      success: true,
      message: "Product updated successfully.",
      data: product,
    });
  } catch (err) {
    console.error(err);
    return next(new ErrorHandler("Internal server error"), 500);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return next(new ErrorHandler("Product not found"), 404);
    }
    return res.status(200).json({
      success: true,
      message: "Product deleted successfully.",
    });
  } catch (err) {
    console.error(err);
    return next(new ErrorHandler("Internal server error"), 500);
  }
};

const getProductDetails = async (req, res, next) => {
  try {
    let product = await Product.findById(req.params.id);
    if (!product) {
      return next(new ErrorHandler("Product not found"), 404);
    }
    return res.status(200).json({
      success: true,
      message: "Product fetched successfully.",
      data: product,
    });
  } catch (err) {
    console.error(err);
    return next(new ErrorHandler("Internal server error"), 500);
  }
};
export {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
};
