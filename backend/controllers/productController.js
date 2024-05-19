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
const createProductReview = catchAsyncError(async (req, res, next) => {
  try {
    const { rating, comment, productId } = req.body;
    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment,
    };
    const product = await Product.findById(productId);
    const isReviewed = product.reviews.find(
      (e) => e.user.toString() === req.user._id
    );
    if (isReviewed) {
      product.reviews.forEach((element) => {
        if (element.user.toString() === req.user._id) {
          element.rating = Number(rating);
          element.comment = comment;
        }
      });
    } else {
      product.reviews.push(review);
      product.numOfReviews = product.reviews.length;
    }

    let avg = 0;
    product.reviews.forEach((element) => {
      avg = avg + element.rating;
    });
    avg = avg / product.reviews.length;
    product.rating = avg;
    await product.save({ validateBeforeSave: false });
    res.status(200).json({
      success: true,
      message: "review successfull",
      data: product,
    });
  } catch (err) {
    return next(new ErrorHandler("Internal server error"), 500);
  }
});
//get all revirew of single product
const getProductReviews = catchAsyncError(async (req, res, next) => {
  const prod = await Product.findById(req.query.id);
  if (!prod) {
    return next(new ErrorHandler("prod not found", 404));
  }
  res.status(200).json({
    success: true,
    message: "product reviess fetched",
    reviews: prod.reviews,
  });
});
const DeleteReview = catchAsyncError(async (req, res, next) => {
  const prod = await Product.findById(req.query.id);
  if (!prod) {
    return next(new ErrorHandler("prod not found", 404));
  }
  const reviews = prod.reviews.filter((e) => e._id.toString() !== req.query.id);
  let avg = 0;
  reviews.forEach((element) => {
    avg = avg + element.rating;
  });
  const ratings = avg / reviews.length;
  const numOfReviews = reviews.length;
  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );
  res.status(200).json({
    success: true,
    message: "deleted ther review",
  });
});
export {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  createProductReview,
  getProductReviews,
  DeleteReview,
};
