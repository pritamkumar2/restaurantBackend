import Product from "../../models/allProduct-models.js";
import User from "../../models/userModel.js";

export const allProducts = async (req, res) => {
  try {
    const productData = await Product.find();

    if (!productData || productData.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    res.status(200).json({ data: productData });
  } catch (err) {
    console.error("Error from controllers product ", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const singleProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const productData = await Product.findById(id);

    if (!productData) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ data: productData });
  } catch (err) {
    console.error("Error from controllers product ", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const authUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userData = await User.findById(id);

    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ data: userData });
  } catch (err) {
    console.error("Error from controllers user ", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getProductsByTag = async (req, res) => {
  try {
    const { tag } = req.params;
    const products = await Product.find({ tags: tag });
    res.status(200).json({ data: products });
  } catch (err) {
    console.error("Error fetching products by tag", err);
    res.status(500).send("Internal Server Error");
  }
};
