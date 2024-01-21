const express = require("express");
const {newOrder, getSingleOrder, getMyOrders, getAllOrders, deleteOrder} = require("../controllers/orderController");
const { isUserAuthenticated, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/order/new").post(isUserAuthenticated,newOrder);

router.route("/order/myOrders").get(isUserAuthenticated,getMyOrders);

router.route("/admin/allOrders").get(isUserAuthenticated,authorizeRoles("admin"),getAllOrders);

router.route("/admin/order/:id").delete(isUserAuthenticated,authorizeRoles("admin"),deleteOrder);

router.route("/order/:id").get(isUserAuthenticated,getSingleOrder);

module.exports = router;