import express from "express";
import { allProducts } from "../controllers/Allproducts/allProducts.js";
const router = express.Router();

router.route("/products").get(allProducts);

export default router;
