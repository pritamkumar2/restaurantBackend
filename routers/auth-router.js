import express from "express";
import {
  allProducts,
  authUser,
  singleProduct,
} from "../controllers/Allproducts/allProducts.js";

const router = express.Router();

router.route("/products").get(allProducts);
router.route("/products/:id").get(singleProduct);

// user auth
router.route("/auth/:id").get(authUser);

export default router;
