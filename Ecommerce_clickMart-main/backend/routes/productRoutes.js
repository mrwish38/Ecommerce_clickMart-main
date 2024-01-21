const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  reviewProduct,
  getProductReviews,
  deleteReview,
} = require("../controllers/productController");
const { isUserAuthenticated, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/products").get(getAllProducts);

router.route("/product/:id").get(getProductDetails);

router.route("/product/new").post(isUserAuthenticated,authorizeRoles("admin"), createProduct);

router
  .route("/product/:id")
  .put(isUserAuthenticated,authorizeRoles("admin"), updateProduct)
  .delete(isUserAuthenticated,authorizeRoles("admin"), deleteProduct);

router.route("/review").put(isUserAuthenticated,reviewProduct);

router.route("/reviews").get(getProductReviews);

router.route("/reviews").delete(isUserAuthenticated,deleteReview);

module.exports = router;
