import express from "express";
import {
  allProducts,
  authUser,
  getProductsByTag,
  singleProduct,
} from "../controllers/Allproducts/allProducts.js";
import { createOrder, verifyPayment } from "../controllers/OrderController.js";

const router = express.Router();

router.route("/products").get(allProducts);
router.route("/products/:id").get(singleProduct);

// user auth
router.route("/auth/:id").get(authUser);

// find prduct by tag
router.get("/products/tag/:tag", getProductsByTag);

// Create order
router.post("/orders/create", createOrder);

// Verify Razorpay payment
router.post("/payment/verify", verifyPayment);

export default router;
